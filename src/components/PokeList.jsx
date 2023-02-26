import { usePokeContext } from "../context";
import NavigationBtns from "./NavigationBtns";

const PokeList = () => {
  const { pokemonList, toggleModal, isLoading, isError, notFound } =
    usePokeContext();
  if (isLoading) {
    return (
      <div className="text-center text-3xl flex items-center gap-x-6 justify-center h-44">
        <span className="animate-spin inline-block  h-12 w-12  rounded-full text-white border-4 border-red-300  border-t-red-500"></span>
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-3xl h-36 flex items-center justify-center font-semibold">
        There was an error...
      </div>
    );
  }
  return (
    <section>
      {notFound  && (<h3 className="px-6 py-3 text-lg text-red-600">Sorry Not Found...</h3>)}
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
      {pokemonList.length > 1 && <NavigationBtns />}
    </section>
  );
};
export default PokeList;
