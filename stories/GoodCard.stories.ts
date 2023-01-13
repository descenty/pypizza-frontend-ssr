import type { Meta, StoryObj } from '@storybook/react';
import GoodCard from '../components/GoodCard';
import pizzaImage from './assets/pizza.png';
// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta: Meta<typeof GoodCard> = {
  title: 'Example/GoodCard',
  component: GoodCard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof GoodCard>;

export const Pizza: Story = {
  args: {
    image: pizzaImage,
    title: 'Пепперони',
    description: 'соус томатный, сыр моцарелла, пепперони, базилик, маслины',
    configurationTitle: 'Маленькая 25 см.', 
    price: 10,
  },
};
