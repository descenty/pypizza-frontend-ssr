import type { Meta, StoryObj } from "@storybook/react";
import Input from "components/Input";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta: Meta<typeof Input> = {
  title: "Example/Поле для ввода",
  component: Input,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  name: "Пустое поле",
  args: {
    type: "text",
    placeholder: "Введите промокод",
  },
};
