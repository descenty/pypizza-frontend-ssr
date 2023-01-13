import clsx from "clsx";
import Image, { StaticImageData } from "next/image";

interface IGoodCardProps {
  image: string | StaticImageData;
  title: string;
  description: string;
  configurationTitle?: string;
  price: number;
}

const GoodCard = (good: IGoodCardProps) => {
  return (
    <div
      className={clsx(
        "relative",
        "flex",
        "flex-col",
        "transition-shadow",
        "duration-300",
        "border",
        "border-gray-200",
        "rounded-lg",
        "shadow-md",
        "cursor-pointer",
        "h-400",
        "hover:shadow-lg"
      )}
    >
      <Image
        className={clsx(
          "object-cover",
          "w-auto",
          "m-10",
          "transition-transform",
          "duration-700",
          "h-230"
        )}
        src={good.image}
        width={230}
        height={230}
        alt="товар"
        unoptimized
      />
      <div className="flex flex-col p-3">
        <h3 className="text-lg">{good.title}</h3>
        <p className="text-sm text-gray-600">{good.description}</p>
        <div className="flex mt-4">
          <span className="text-sm font-medium">{good.configurationTitle}</span>
          <span className="text-lg font-medium">{good.price}&nbsp;₽</span>
        </div>
      </div>
    </div>
  );
};

export default GoodCard;
