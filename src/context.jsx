import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "./utils/reducer";

const Poke = "https://pokeapi.co/api/v2/pokemon/";

const PokeContext = createContext();

const defaultState = {
  searchVal: "",
  isLoading: false,
  isError: false,
  notFound: false,
  prev: null,
  pokemonList: [],
  next: null,
  modal: false,
  modal_poke: null,
};
const PokeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const fetchPoke = async (param) => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      const response = await fetch(param);
      if (!response.ok) {
        dispatch({ type: "NOT_FOUND", payload: true });
        return;
      }
      const data = await response.json();
      if (data.previous === undefined) {
        dispatch({ type: "NOT_FOUND", payload: false });
        dispatch({ type: "SET_POKES", payload: [data] });
        dispatch({ type: "IS_LOADING", payload: false });
        return;
      }
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
        dispatch({ type: "IS_LOADING", payload: false });
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "IS_LOADING", payload: false });
      dispatch({ type: "IS_ERROR", payload: true });
    }
  };

  useEffect(() => {
    fetchPoke(Poke);
  }, []);

  const setSearchVal = (e) => {
    dispatch({ type: "SET_SEARCH_VAL", payload: e.target.value });
  };

  const handleSearch = () => {
    if (!state.searchVal) return;
    fetchPoke(`${Poke}${state.searchVal}`);
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
  const backHome = () => {
    fetchPoke(Poke);
  };

  const topHeight = `${Math.round(window.scrollY)}px`;
  
  return (
    <PokeContext.Provider
      value={{
        ...state,
        setSearchVal,
        handleSearch,
        handlePrevBtn,
        handleNextBtn,
        toggleModal,
        topHeight,
        backHome,
      }}
    >
      {children}
    </PokeContext.Provider>
  );
};

export const usePokeContext = () => useContext(PokeContext);

export default PokeContextProvider;
