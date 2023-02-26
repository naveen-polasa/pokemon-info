import { usePokeContext } from "../context";
import Loading from "./Loading";
import Error from "./Error";
import NavigationBtns from "./NavigationBtns";

const PokeList = () => {
  const { pokemonList, toggleModal, isLoading, isError, notFound } =
    usePokeContext();
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }
  return (
    <section>
      {notFound && (
        <h3 className="px-6 py-3 text-lg text-red-600">Sorry Not Found...</h3>
      )}
      <div className="flex flex-wrap gap-8 py-8 md:py-12 justify-center">
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
      {pokemonList.length > 1 && <NavigationBtns />}
    </section>
  );
};
export default PokeList;
