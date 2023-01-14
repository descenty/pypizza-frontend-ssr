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

interface ICartGood {
  title: string;
  image: string | StaticImageData;
  configurationTitle: string;
  price: number;
  quantity: number;
}

interface ICartProps {
  cartGoods: ICartGood[];
  total: number;
  totalWithDiscount: number;
  promoCode?: string;
  promoCodeDescription?: string;
  onSubmit: () => void;
  onClose: () => void;
  notLoaded?: boolean;
}

const Cart = (cart: ICartProps) => {
  return (
    <div
      className={clsx(
        "bg-white",
        "border-2",
        "border-gray-200",
        "rounded-xl",
        "overflow-hidden",
        "flex",
        "flex-col",
        "items-center",
        "w-[400px]",
        "relative"
      )}
    >
      <div>{/*Loader*/}</div>
      <div className="flex items-center justify-between w-full py-[9px] px-[20px]">
        <h3 className="text-[1.17em] font-bold">Корзина</h3>
        <GrFormClose className="w-[28px] h-[28px] rounded-lg transition-transform duration-300 mr-[-4px] cursor-pointer hover:scale-125" />
      </div>
      <div
        className={clsx(
          "flex",
          "flex-col",
          "w-full",
          "h-[350px]",
          cart.cartGoods && "overflow-y-scroll",
          "p-[0.8em]",
          "mt-[5px]",
          "mb-[20px]",
          "gap-[1.5em]"
        )}
      >
        {cart.notLoaded && <h4>Не удалось загрузить корзину</h4>}
        {!cart.cartGoods ? (
          <div
            className={clsx(
              "relative",
              "w-[96%]",
              "h-full",
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
          cart?.cartGoods.map((cartGood, index) => (
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
                <p className="font-bold text-[14px]">{cartGood.price} ₽</p>
                <span className="text-[14px]">
                  {cartGood.configurationTitle}
                </span>
              </div>
              <div className="flex items-center gap-[0.5em]">
                <AiOutlineMinus className="cursor-pointer text-gray-500 transition-colors duration-300 w-[28px] h-[28px] p-[6px] rounded-lg flex justify-center items-center bg-gray-100 hover:text-black" />
                <span className="w-[24px] h-[24px] flex justify-center items-center">
                  {cartGood.quantity}
                </span>
                <AiOutlinePlus className="cursor-pointer text-gray-500 transition-colors duration-300 w-[28px] h-[28px] p-[6px] rounded-lg flex justify-center items-center bg-gray-100 hover:text-black" />
              </div>
            </div>
          ))
        )}
      </div>
      {cart.cartGoods && (
        <div>
          {cart.promoCode ? (
            <div>
              <span>
                <b>{cart.promoCode}</b> - {cart.promoCodeDescription} (
                {(cart.total - cart.totalWithDiscount).toFixed(2)} ₽)
              </span>
              <AiOutlineClose />
            </div>
          ) : (
            <div>
              <input
                type="text"
                placeholder="Промокод"
                // value={promoCodeInput}
              />
              <button
              // disabled={!promoCodeInput}
              >
                OK
              </button>
            </div>
          )}
          <span>error</span>
          <span>
            Итого: <b>{cart.total} ₽</b>
          </span>
          <button>К оформлению заказа</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
