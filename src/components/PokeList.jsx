import { usePokeContext } from "../context";
import NavigationBtns from "./NavigationBtns";

const PokeList = () => {
  const { pokemonList, toggleModal } = usePokeContext();
  return (
    <section>
      <div className="flex flex-wrap gap-8 py-12 justify-center">
        {pokemonList.map((p) => {
          const { name, id } = p;
          const img = p.sprites.other.dream_world.front_default;
          return (
            <div
              key={id}
              className="border border-red-600 rounded-xl p-4 bg-red-100 my-auto hover:scale-105 duration-300 hover:bg-orange-200"
              onClick={() => toggleModal({ name, img, p })}
            >
              <img src={img} alt={name} className="w-44" />
              <h3 className="capitalize font-semibold text-center pt-4 text-xl">
                {name}
              </h3>
            </div>
          );
        })}
      </div>
      <NavigationBtns />
    </section>
  );
};
export default PokeList;
