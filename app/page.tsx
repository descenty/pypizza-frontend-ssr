// import { Nunito, Nunito_Sans } from "@next/font/google";
import GoodCard from "../components/ProductCard";

// const nunito = Nunito({ subsets: ["cyrillic-ext"] });

const Home = () => {
  return (
    <main className="self-center grid sm-grid-cols-1 min-[600px]:grid-cols-2 min-[880px]:grid-cols-3 xl:grid-cols-4 gap-4 w-[95%] h-full pt-6">
      <GoodCard
        image="/pizza.png"
        title="Пепперони"
        description="Пикантная пепперони, увеличенная порция моцареллы, фирменный томатный соус"
        configurationTitle="Маленькая 25 см"
        price={439}
      />
      <GoodCard
        image="/pizza.png"
        title="Пепперони"
        description="Пикантная пепперони, увеличенная порция моцареллы, фирменный томатный соус"
        configurationTitle="Маленькая 25 см"
        price={439}
      />
      <GoodCard
        image="/pizza.png"
        title="Пепперони"
        description="Пикантная пепперони, увеличенная порция моцареллы, фирменный томатный соус"
        configurationTitle="Маленькая 25 см"
        price={439}
      />
      <GoodCard
        image="/pizza.png"
        title="Пепперони"
        description="Пикантная пепперони, увеличенная порция моцареллы, фирменный томатный соус"
        configurationTitle="Маленькая 25 см"
        price={439}
      />
    </main>
  );
};
export default Home;
