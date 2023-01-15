import "./styles.css";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";

interface IGoodCardProps {
  image: string | StaticImageData;
  title: string;
  description: string | string[];
  configurationTitle?: string;
  price: number;
  width?: number;
  imagePadding?: number;
}

const GoodCard = (good: IGoodCardProps) => {
  return (
    <div
      style={{ width: good.width }}
      className={clsx(
        "relative",
        "bg-white",
        "flex",
        "flex-col",
        "self-center",
        "transition-shadow",
        "duration-300",
        "border",
        "border-gray-200",
        "rounded-xl",
        "shadow-md",
        "cursor-pointer",
        "h-[400px]",
        "min-w-[200px]",
        "max-w-[450px]",
        "hover:shadow-lg"
      )}
    >
      <Image
        className={clsx("object-cover", "p-[10px]", "self-center")}
        style={{ padding: good.imagePadding }}
        src={good.image}
        width={230}
        height={230}
        alt="товар"
      />
      <div className="flex flex-col gap-[0.3em] px-[1.5em]">
        <h3 className="text-[18px] font-bold">{good.title}</h3>
        <div className="text-[13px] text-gray-500">
          {typeof good.description === "string" ? (
            good.description
          ) : (
            <ul className="list-inside list-disc">
              {good.description.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="absolute left-[24px] bottom-[8px] mt-[4px] mb-[10px] flex w-[200px] flex-col">
          <span className="w-full text-[13px] font-semibold">
            {good.configurationTitle}
          </span>
          <span className="mt-[-2px] text-[18px] font-bold tracking-[-1px]">
            от {good.price}&nbsp;₽
          </span>
        </div>
      </div>
    </div>
  );
};

export default GoodCard;
