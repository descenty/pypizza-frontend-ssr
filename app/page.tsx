import { Nunito } from "@next/font/google";
import GoodCard from "../components/GoodCard";

const nunito = Nunito({subsets: ['latin']});

const Home = () => {
  return (
    <main style={nunito.style} className="grid grid-cols-3 gap-4">
      <GoodCard
        image="/pizza.png"
        title="Пепперони"
        description="test"
        configurationTitle="dsd"
        price={10}
      />
    </main>
  );
};
export default Home;
