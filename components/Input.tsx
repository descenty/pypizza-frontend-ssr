import clsx from "clsx";

interface IInputProps {
  type?: "text" | "number" | "password" | "email";
  placeholder?: string;
  maxLength?: number;
  id?: string;
  uppercase?: boolean;
  className?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  args?: Object;
}

const Input = ({
  type,
  placeholder,
  id,
  maxLength,
  className,
  uppercase,
  onKeyDown,
  onChange,
  value,
  args,
}: IInputProps) => {
  return (
    <input
      {...args}
      id={id}
      type={type}
      maxLength={maxLength}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      onChange={onChange}
      value={value}
      className={clsx(
        "rounded-xl",
        "p-[0.8em]",
        "border-none",
        "indent-[5px]",
        "bg-gray-100",
        "text-[15px]",
        "tracking-[1px]",
        uppercase && "uppercase",
        "placeholder:normal-case",
        "focus:outline-none",
        className
      )}
    />
  );
};

export default Input;
