"use client";
import clsx from "clsx";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { GrFormClose } from "react-icons/gr";
import CloseButton from "./common/CloseButton";
import Input from "./Input";

interface ILoginWindowProps {
  toggleLoginWindow: () => void;
  generateAuthCode: () => Promise<void>;
}

interface IFormInputs {
  phone: string;
  code: string;
}

const LoginWindow = ({ toggleLoginWindow, generateAuthCode }: ILoginWindowProps) => {
  const [showLoginWindow, setShowLoginWindow] = useState(false);
  const [showSMSForm, setShowSMSForm] = useState(false);
  const [canGenerateCode, setCanGenerateCode] = useState(false);
  const [phone, setPhone] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isLoading },
  } = useForm<IFormInputs>();
  const onSubmit: SubmitHandler<IFormInputs> = useCallback((data) => console.log(data), []);
  return (
    <div
      className={clsx(
        "bg-white",
        "rounded-2xl",
        "w-[500px]",
        "max-w-full",
        "h-[325px]",
        "flex",
        "flex-col",
        "items-center",
        "p-[1em]"
      )}
    >
      <div className={clsx("flex", "w-full", "justify-between", "px-[1em]", "gap-[1em]")}>
        <h1 className="text-2xl">Вход</h1>
        <CloseButton onClick={toggleLoginWindow} />
      </div>
      <div
        className={clsx(
          "w-full",
          "h-full",
          "p-[1em]",
          "pt-[1.5em]",
          "relative",
          "flex",
          "flex-col",
          "justify-start",
          "items-start",
          "overflow-x-hidden",
          "overflow-y-hidden",
          "self-start"
        )}
      >
        <form
          className={clsx(
            "flex",
            "flex-col",
            "items-start",
            "gap-[1em]",
            "w-full",
            "max-w-full",
            "h-full",
            "opacity-100",
            "transition-opacity",
            "duration-500"
          )}
        >
          <label htmlFor="phone">Укажите свой телефон:</label>
          <div>
            <span>+</span>
            <Input
              {...register("phone", { required: true })}
              id="phone"
              type="number"
              placeholder="7 . . . . . . ."
              maxLength={15}
            />
          </div>
          {/* {enableRecaptchal && (
            <ReCAPTCHA
              sitekey="6LdkqsciAAAAAI1B1ueIKMD7ha_gowtlL8sl-J3m"
              onChange={(value) => setRecaptchaToken(value)}
            />
          )} */}
          <button onClick={async () => await generateAuthCode()}>Получить код в SMS</button>
        </form>
        <form>
          <label htmlFor="code">Код отправлен на +{phone}</label>
          <input
            {...register("code", { required: true })}
            type="text"
            id="code"
            placeholder=". . . ."
            maxLength={4}
            inputMode="numeric"
          />
          {errors.phone && <span>{errors.phone?.message}</span>}
          {canGenerateCode && <button onClick={async () => await generateAuthCode()}>Получить новый код</button>}
          <button onClick={() => setShowSMSForm(false)}>Изменить номер телефона</button>
        </form>
      </div>
    </div>
  );
};

export default LoginWindow;
