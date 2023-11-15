import type { Meta, StoryObj } from "@storybook/react";
import ProductCard from "../components/ProductCard";
import pizzaImage from "./assets/pizza.png";
import phoneImage from "./assets/phone.webp";

const meta: Meta<typeof ProductCard> = {
  title: "Example/Карточка продукта",
  component: ProductCard,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Pizza: Story = {
  name: "Пицца",
  args: {
    image: pizzaImage,
    title: "Пепперони",
    description: "Пикантная пепперони, увеличенная порция моцареллы, фирменный томатный соус",
    configurationTitle: "Маленькая 25 см",
    price: 429,
    width: 300,
  },
};

export const Phone: Story = {
  name: "Смартфон",
  args: {
    image: phoneImage,
    title: "Xiaomi Redmi Note 10",
    description: 'Смартфон с диагональю 6.43", выполнен в черном корпусе из прочного пластика',
    configurationTitle: "64 ГБ серый",
    price: 14990,
    width: 300,
    imagePadding: 25,
  },
};
