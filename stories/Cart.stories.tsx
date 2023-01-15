import type { Meta, StoryObj } from "@storybook/react";
import pizzaImage from "./assets/pizza.png";
import phoneImage from "./assets/phone.webp";
import Cart, { ICartProps } from "components/Cart";
import { useCallback, useMemo, useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta: Meta<typeof Cart> = {
  title: "Example/Корзина",
  component: Cart,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Cart>;

const promocodes = {
  МИРЭА: {
    description: "Скидка 10%",
    discount: 0.1,
  },
  СТУДЕНТ: {
    description: "Скидка 5%",
    discount: 0.05,
  },
  ПРОФИ: {
    description: "Скидка 15%",
    discount: 0.15,
  },
};

const CartWithHooks = (args: ICartProps) => {
  const [cartGoods, setCartGoods] = useState(args.cartGoods);
  const [promoCode, setPromoCode] = useState(args.promoCode);
  const [appliedPromoCode, setAppliedPromoCode] = useState(
    args.promoCode && Object.keys(promocodes).includes(args.promoCode)
      ? args.promoCode
      : undefined
  );
  const [promoCodeDescription, setPromoCodeDescription] = useState(
    appliedPromoCode
      ? promocodes[appliedPromoCode as keyof typeof promocodes].description
      : undefined
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
    () =>
      appliedPromoCode
        ? total *
          (1 - promocodes[appliedPromoCode as keyof typeof promocodes].discount)
        : total,
    [appliedPromoCode, total]
  );

  return (
    <Cart
      {...args}
      cartGoods={cartGoods}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      setPromoCode={setPromoCode}
      promoCode={promoCode}
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
  ...cartStory,
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
        configuration: {
          title: "64 ГБ серый",
          price: 14990,
        },
        quantity: 1,
      },
    ],
    promoCode: "МИРЭА",
    promoCodeDescription: "Скидка 10%",
    total: 15419,
    totalWithDiscount: 13877,
    maxQuantity: 10,
  },
  ...cartStory,
};
