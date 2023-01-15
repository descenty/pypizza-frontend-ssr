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
  configuration: IConfiguration;
  quantity: number;
}

export interface ICartProps {
  cartGoods: ICartGood[];
  total: number;
  totalWithDiscount: number;
  promoCode?: string;
  promoCodeDescription?: string;
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
  const [promoCodeInput, setPromoCodeInput] = useState(cart.promoCode);
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
              "gap-[1.5em]"
            )}
          >
            {cart.notLoaded && <h4>Не удалось загрузить корзину</h4>}
            {cart?.cartGoods.map((cartGood, index) => (
              <div
                className="flex px-[10px] items-center h-auto relative gap-[1em]"
                key={index}
              >
                <Image
                  className="self-center justify-self-center mr-[5px]"
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
            {cart.promoCode ? (
              <div className="mt-[-10px] mb-[5px] flex justify-between gap-[1em] items-center">
                <span className="ml-[10px] tracking-[1px]">
                  <b className="text-[#fd6d22]">{cart.promoCode}</b> -{" "}
                  {cart.promoCodeDescription} (
                  {(cart.total - cart.totalWithDiscount).toFixed(2)} ₽)
                </span>
                <AiOutlineClose
                  onClick={() => cart.setPromoCode()}
                  className="w-[28px] h-[28px] p-[6px] mr-[10px] flex justify-center items-center bg-[#f1f1f5] rounded-xl text-gray-500 cursor-pointer transition-colors duration-300 hover:text-black"
                />
              </div>
            ) : (
              <div className="w-full flex flex-col justify-center relative">
                <input
                  type="text"
                  placeholder="Промокод"
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  className={clsx(
                    "rounded-xl",
                    "p-[0.8em]",
                    "border-none",
                    "indent-[5px]",
                    "bg-[rgb(249,249,249)]",
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
                  onClick={() => cart.setPromoCode(promoCodeInput)}
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
            {cart.promoCodeError && (
              <span className="ml-[10px] mt-[-10px] tracking-[1px] text-red-500">
                {cart.promoCodeError}
              </span>
            )}
            <span className="ml-[10px] tracking-[1px]">
              Итого:{" "}
              <b className="text-[#fd6d22]">
                {cart.totalWithDiscount.toFixed(2)} ₽
              </b>
            </span>
            <button
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
