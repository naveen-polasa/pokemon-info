import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "./utils/reducer";

const Poke = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";

const PokeContext = createContext();

const defaultState = {
  searchVal: "",
  isLoading: false,
  isError: false,
  prev: null,
  pokemonList: [],
  next: null,
  modal: false,
  modal_poke: null,
};
const PokeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const fetchPoke = async (param) => {
    try {
      const response = await fetch(param);
      const data = await response.json();

      dispatch({ type: "SET_PREV", payload: data.previous });
      dispatch({ type: "SET_NEXT", payload: data.next });

      let pokes = [];
      data.results.map(async (poke) => {
        const { url } = poke;
        const resp = await fetch(url);
        const pokeData = await resp.json();
        pokes = [...pokes, pokeData];
        if (pokes.length === 20) {
          dispatch({ type: "SET_POKES", payload: pokes });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPoke(Poke);
  }, []);

  const setSearchVal = (e) => {
    dispatch({ type: "SET_SEARCH_VAL", payload: e.target.value });
  };

  const handlePrevBtn = () => {
    if (!state.prev) {
      return;
    }
    fetchPoke(state.prev);
  };

  const handleNextBtn = () => {
    fetchPoke(state.next);
  };
  const toggleModal = (data) => {
    dispatch({ type: "TOGGLE_MODAL", payload: data });
  };

  const topHeight = `${Math.round(window.scrollY)}px`
  return (
    <PokeContext.Provider
      value={{
        ...state,
        setSearchVal,
        handlePrevBtn,
        handleNextBtn,
        toggleModal,topHeight
      }}
    >
      {children}
    </PokeContext.Provider>
  );
};

export const usePokeContext = () => useContext(PokeContext);

export default PokeContextProvider;
