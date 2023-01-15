"use client";
import "./styles.css";
import {
  AiOutlineClose,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import Image, { StaticImageData } from "next/image";
import clsx from "clsx";
import { useState } from "react";

interface IConfiguration {
  title: string;
  price: number;
}

interface ICartGood {
  id: number;
  title: string;
  image: string | StaticImageData;
  imagePadding?: number;
  configuration: IConfiguration;
  quantity: number;
}

interface IPromoCode {
  code: string;
  description: string;
  discount: number;
}

export interface ICartProps {
  cartGoods: ICartGood[];
  total: number;
  totalWithDiscount: number;
  promoCode?: IPromoCode;
  promoCodeError?: string;
  maxQuantity?: number;
  notLoaded?: boolean;
  onSubmit?: () => void;
  onClose?: () => void;
  addToCart: (goodId: number, configurationTitle: string) => void;
  removeFromCart: (goodId: number, configurationTitle: string) => void;
  setPromoCode: (promoCode?: string) => void;
}

const Cart = (cart: ICartProps) => {
  const [promoCodeInput, setPromoCodeInput] = useState(cart.promoCode?.code);
  return (
    <div
      className={clsx(
        "bg-white",
        "border",
        "border-gray-200",
        "rounded-3xl",
        "shadow-md",
        "overflow-hidden",
        "flex",
        "flex-col",
        "items-center",
        "w-[400px]",
        "relative",
        "transition-shadow",
        "duration-300",
        "hover:shadow-lg"
      )}
    >
      {/* <div>Loader</div> */}
      <div className="flex items-center justify-between w-full py-[9px] px-[20px]">
        <h3 className="text-[1.17em] font-bold">Корзина</h3>
        <GrFormClose className="w-[28px] h-[28px] rounded-lg transition-transform duration-300 mr-[-4px] cursor-pointer hover:scale-125" />
      </div>
      {!cart.cartGoods || cart.cartGoods.length == 0 ? (
        <div
          data-testid="cart-empty"
          className={clsx(
            "relative",
            "w-full",
            "h-[350px]",
            "pb-6",
            "flex",
            "flex-col",
            "justify-center",
            "items-center",
            "self-center",
            "gap-[1em]"
          )}
        >
          <AiOutlineShopping className="w-[70px] h-[70px] text-gray-500" />
          <span>Корзина пуста</span>
        </div>
      ) : (
        <>
          <div
            className={clsx(
              "flex",
              "flex-col",
              "w-full",
              "h-[350px]",
              "overflow-y-auto",
              "p-[0.8em]",
              "pt-[1em]",
              "mb-[20px]",
              "gap-2"
            )}
          >
            {cart.notLoaded && <h4>Не удалось загрузить корзину</h4>}
            {cart?.cartGoods.map((cartGood, index) => (
              <div
                data-testid={`cart-good-${index}`}
                className={clsx(
                  "flex",
                  "px-[10px]",
                  "items-center",
                  "h-[75px]",
                  "relative",
                  "gap-[1em]",
                  "rounded-2xl",
                  "transition-shadow",
                  "duration-300",
                  "hover:shadow-lg"
                )}
                key={index}
              >
                <Image
                  className="self-center justify-self-center mr-[5px]"
                  style={{ padding: cartGood.imagePadding }}
                  src={cartGood.image}
                  width={50}
                  height={50}
                  alt="товар"
                />
                <div className="flex flex-col w-[250px] leading-[1.4]">
                  <h4
                    className={clsx(
                      "font-semibold",
                      `text-[${cartGood.title.length >= 20 ? 14 : 16}px]`
                    )}
                  >
                    {cartGood.title}
                  </h4>
                  <p className="font-bold text-[14px]">
                    {cartGood.configuration.price} ₽
                  </p>
                  <span className="text-[14px]">
                    {cartGood.configuration.title}
                  </span>
                </div>
                <div className="flex items-center gap-[0.5em]">
                  <AiOutlineMinus
                    data-testid={`cart-good-${index}-remove`}
                    onClick={() =>
                      cart.removeFromCart(
                        cartGood.id,
                        cartGood.configuration.title
                      )
                    }
                    className={clsx(
                      "cursor-pointer",
                      "text-gray-500",
                      "transition-colors",
                      "duration-300",
                      "w-[28px]",
                      "h-[28px]",
                      "p-[6px]",
                      "rounded-lg",
                      "flex",
                      "justify-center",
                      "items-center",
                      "bg-gray-100",
                      "hover:text-black"
                    )}
                  />
                  <span className="w-[24px] h-[24px] flex justify-center items-center">
                    {cartGood.quantity}
                  </span>
                  <AiOutlinePlus
                    data-testid={`cart-good-${index}-add`}
                    onClick={() =>
                      cart.addToCart(cartGood.id, cartGood.configuration.title)
                    }
                    className={clsx(
                      "text-gray-500",
                      "transition-colors",
                      "duration-300",
                      "w-[28px]",
                      "h-[28px]",
                      "p-[6px]",
                      "rounded-lg",
                      "flex",
                      "justify-center",
                      "items-center",
                      "bg-gray-100",
                      "hover:text-black",
                      cartGood.quantity === cart.maxQuantity
                        ? "opacity-50 pointer-events-none"
                        : "cursor-pointer"
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col w-full gap-[1em] px-[1em] pb-[1em]">
            <span className="ml-[18px] mb-[-14px] h-6 tracking-[1px] text-sm text-red-600 lowercase">
              {cart.promoCodeError}
            </span>
            {cart.promoCode ? (
              <div
                data-testid="active-promo-code"
                className="h-[48px] flex justify-between gap-[1em] items-center"
              >
                <span className="ml-[10px] tracking-[1px]">
                  <b className="text-[#fd6d22]">{cart.promoCode.code}</b> -{" "}
                  {cart.promoCode.description} (
                  {(cart.total - cart.totalWithDiscount).toFixed(2)} ₽)
                </span>
                <AiOutlineClose
                  onClick={() => cart.setPromoCode()}
                  className="w-[28px] h-[28px] p-[6px] mr-[10px] flex justify-center items-center bg-[#f1f1f5] rounded-xl text-gray-500 cursor-pointer transition-colors duration-300 hover:text-black"
                />
              </div>
            ) : (
              <div className="w-full h-[48px] flex flex-col justify-center relative">
                <input
                  type="text"
                  placeholder="Промокод"
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    cart.setPromoCode(promoCodeInput?.toUpperCase())
                  }
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  className={clsx(
                    "rounded-xl",
                    "p-[0.8em]",
                    "border-none",
                    "indent-[5px]",
                    "bg-gray-100",
                    "text-[15px]",
                    "tracking-[1px]",
                    "uppercase",
                    "placeholder:normal-case",
                    "focus:outline-none",
                    "promocode-input"
                  )}
                  value={promoCodeInput}
                />
                <button
                  onClick={() =>
                    cart.setPromoCode(promoCodeInput?.toUpperCase())
                  }
                  className={clsx(
                    "absolute",
                    "right-[5px]",
                    "px-[1.5em]",
                    "bg-none",
                    "text-[16px]",
                    "transition-all",
                    "duration-300",
                    "rounded-lg",
                    "hover:text-[#fd6d22]",
                    "disabled:text-[#ababab]",
                    "disabled:cursor-default",
                    "disabled:font-normal"
                  )}
                  disabled={!promoCodeInput}
                >
                  OK
                </button>
              </div>
            )}
            <span className="ml-[10px] tracking-[1px]">
              Итого: <b className="">{cart.totalWithDiscount.toFixed(2)} ₽</b>
            </span>
            <button
              onClick={cart.onSubmit}
              className={clsx(
                "bg-none",
                "font-bold",
                "text-[16px]",
                "transition-colors",
                "duration-300",
                "mt-[5px]",
                "mb-[5px]",
                "rounded-xl",
                "p-[0.5em]",
                "border-none",
                "flex",
                "justify-center",
                "items-center",
                "hover:text-[#fd6d22]"
              )}
            >
              К оформлению заказа
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
