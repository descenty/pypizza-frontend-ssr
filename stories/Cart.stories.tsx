import type { Meta, StoryObj } from "@storybook/react";
import pizzaImage from "./assets/pizza.png";
import phoneImage from "./assets/phone.webp";
import Cart, { ICartProps } from "components/Cart";
import { useCallback, useEffect, useMemo, useState } from "react";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta: Meta<typeof Cart> = {
  title: "Example/Корзина",
  component: Cart,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Cart>;

interface IPromoCode {
  code: string;
  description: string;
  discount: number;
}
const promoCodes: IPromoCode[] = [
  {
    code: "МИРЭА",
    description: "Скидка 10%",
    discount: 0.1,
  },
  {
    code: "СТУДЕНТ",
    description: "Скидка 5%",
    discount: 0.05,
  },
  {
    code: "ПРОФИ",
    description: "Скидка 15%",
    discount: 0.15,
  },
];

const CartWithHooks = (args: ICartProps) => {
  const [cartGoods, setCartGoods] = useState(args.cartGoods);
  const [promoCode, setPromoCode] = useState<IPromoCode | undefined>(
    args.promoCode
  );
  const [promoCodeError, setPromoCodeError] = useState<string | undefined>(
    args.promoCodeError
  );
  const setPromoCodeWithValidation = useCallback(
    (promoCodeValue?: string) => {
      if (!promoCodeValue) {
        setPromoCode(undefined);
        setPromoCodeError(undefined);
      } else {
        const promoCode = promoCodes.find(
          (promoCode) => promoCode.code === promoCodeValue
        );
        if (promoCode) {
          setPromoCode(promoCode);
          setPromoCodeError(undefined);
        } else {
          setPromoCodeError("Промокод не найден");
        }
      }
    },
    [setPromoCode]
  );
  const addToCart = (goodId: number, configurationTitle: string) =>
    setCartGoods(
      cartGoods.map((cartGood) => ({
        ...cartGood,
        quantity:
          cartGood.id === goodId &&
          cartGood.configuration.title === configurationTitle
            ? cartGood.quantity + 1
            : cartGood.quantity,
      }))
    );
  const removeFromCart = (goodId: number, configurationTitle: string) =>
    setCartGoods(
      cartGoods
        .map((cartGood) => ({
          ...cartGood,
          quantity:
            cartGood.id === goodId &&
            cartGood.configuration.title === configurationTitle
              ? cartGood.quantity - 1
              : cartGood.quantity,
        }))
        .filter((cartGood) => cartGood.quantity > 0)
    );
  const total = useMemo(
    () =>
      cartGoods
        ? cartGoods.reduce(
            (acc, cartGood) =>
              acc + cartGood.configuration.price * cartGood.quantity,
            0
          )
        : 0,
    [cartGoods]
  );
  const totalWithDiscount = useMemo(
    () => (promoCode ? total * (1 - promoCode.discount) : total),
    [promoCode, total]
  );

  return (
    <Cart
      {...args}
      cartGoods={cartGoods}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      setPromoCode={setPromoCodeWithValidation}
      promoCode={promoCode}
      promoCodeError={promoCodeError}
      total={total}
      totalWithDiscount={totalWithDiscount}
    />
  );
};

const cartStory: Story = {
  render: (args) => <CartWithHooks {...args} />,
};

export const EmptyCart: Story = {
  name: "Пустая корзина",
  args: {
    cartGoods: [
      {
        id: 1,
        title: "Пепперони",
        image: pizzaImage,
        configuration: {
          title: "Маленькая 25 см",
          price: 429,
        },
        quantity: 1,
      },
    ],
  },
  ...cartStory,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const removeButton = canvas.getByTestId("cart-good-0-remove");
    await userEvent.click(removeButton);
    expect(canvas.getByTestId("cart-empty"));
  },
};

export const TwoGoodsAndPromo: Story = {
  name: "Два товара и промокод",
  args: {
    cartGoods: [
      {
        id: 1,
        title: "Пепперони",
        image: pizzaImage,
        configuration: {
          title: "Маленькая 25 см",
          price: 429,
        },
        quantity: 2,
      },
      {
        id: 2,
        title: "Xiaomi Redmi Note 10",
        image: phoneImage,
        imagePadding: 4,
        configuration: {
          title: "64 ГБ серый",
          price: 14990,
        },
        quantity: 1,
      },
    ],
    total: 15419,
    totalWithDiscount: 15419,
    maxQuantity: 10,
  },
  ...cartStory,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const promoCodeInput = canvas.getByRole("textbox");
    await userEvent.type(promoCodeInput, "МИРЭА", { delay: 300 });
    const promoCodeApplyButton = canvas.getByRole("button", {
      name: "OK",
    });
    await userEvent.click(promoCodeApplyButton);
    expect(canvas.getByTestId("active-promo-code"));
  },
};

export const TwoGoodsAndPromoError: Story = {
  name: "Два товара и промокод с ошибкой",
  args: {
    cartGoods: [
      {
        id: 1,
        title: "Пепперони",
        image: pizzaImage,
        configuration: {
          title: "Маленькая 25 см",
          price: 429,
        },
        quantity: 2,
      },
      {
        id: 2,
        title: "Xiaomi Redmi Note 10",
        image: phoneImage,
        imagePadding: 4,
        configuration: {
          title: "64 ГБ серый",
          price: 14990,
        },
        quantity: 1,
      },
    ],
    total: 15419,
    totalWithDiscount: 13877,
    maxQuantity: 10,
  },
  ...cartStory,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const promoCodeInput = canvas.getByRole("textbox");
    await userEvent.type(promoCodeInput, "ПРОМО", { delay: 300 });
    userEvent.type(promoCodeInput, "{enter}");
  },
};

export const MaxQuantity: Story = {
  name: "Максимальное количество товара",
  args: {
    cartGoods: [
      {
        id: 1,
        title: "Пепперони",
        image: pizzaImage,
        configuration: {
          title: "Маленькая 25 см",
          price: 429,
        },
        quantity: 9,
      },
    ],
    maxQuantity: 10,
    total: 4290,
    totalWithDiscount: 4290,
  },
  ...cartStory,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addButton = canvas.getByTestId("cart-good-0-add");
    await userEvent.click(addButton);
    expect(getComputedStyle(addButton).pointerEvents).toBe("none");
  },
};
