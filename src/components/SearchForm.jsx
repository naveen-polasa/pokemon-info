import { usePokeContext } from "../context";
import NavigationBtns from "./NavigationBtns";

const SearchForm = () => {
  const { searchVal, setSearchVal, handleSearch, pokemonList, backHome } =
    usePokeContext();
    
  return (
    <div>
      <div className="flex justify-center items-center lg:justify-between flex-wrap gap-y-4">
        <form
          className="flex justify-center md:justify-start gap-y-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            className="h-12 border-2 bg-fuchsia-100 border-red-400 rounded-lg sm:ml-5 mr-5 px-3 w-[77%] md:w-[32rem]"
            placeholder="Search..."
            value={searchVal}
            onChange={setSearchVal}
          />
          <button
            type="submit"
            className="px-5 py-3 border-2 rounded-xl bg-red-400 text-white hover:bg-orange-400 hover:scale-110 duration-300 mr-7"
            onClick={handleSearch}
          >
            Search
          </button>
          {pokemonList.length === 1 && (
            <button
              className="px-4 py-2.5 bg-red-400 text-white rounded-xl hover:bg-orange-400 hover:scale-110 duration-300"
              onClick={backHome}
            >
              Home
            </button>
          )}
        </form>
        {pokemonList.length > 1 && (
          <div className="mx-10">
            <NavigationBtns />
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchForm;
