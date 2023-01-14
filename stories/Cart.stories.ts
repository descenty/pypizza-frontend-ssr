import type { Meta, StoryObj } from '@storybook/react';
import pizzaImage from './assets/pizza.png';
import phoneImage from './assets/phone.webp';
import Cart from 'components/Cart';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta: Meta<typeof Cart> = {
  title: 'Example/Корзина',
  component: Cart,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Cart>;

export const EmptyCart: Story = {
  name: "Пустая корзина",
  args: {},
};

export const TwoGoodsAndPromo: Story = {
  name: "Два товара и промокод",
  args: {
    cartGoods: [
      {
        title: 'Пепперони',
        image: pizzaImage,
        configurationTitle: 'Маленькая 25 см',
        price: 429,
        quantity: 2,
      },
      {
        title: 'Xiaomi Redmi Note 10',
        image: phoneImage,
        configurationTitle: '64 ГБ серый',
        price: 14990,
        quantity: 1,
      }
    ],
    promoCode: 'МИРЭА',
    promoCodeDescription: 'Скидка 10%',
    total: 15419,
    totalWithDiscount: 13877,
  },
};