import type { Meta, StoryObj } from "@storybook/react";
import LoginWindow from "components/LoginWindow";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta: Meta<typeof LoginWindow> = {
  title: "Example/Окно авторизации",
  component: LoginWindow,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof LoginWindow>;

export const Default: Story = {
  name: "Пустое окно",
  args: {
  },
};
