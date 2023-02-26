export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_POKES": {
      return { ...state, pokemonList: action.payload };
    }
    case "SET_PREV": {
      return { ...state, prev: action.payload };
    }
    case "SET_NEXT": {
      return { ...state, next: action.payload };
    }
    case "SET_SEARCH_VAL": {
      return { ...state, searchVal: action.payload };
    }
    case "TOGGLE_MODAL": {
      return { ...state, modal: !state.modal, modal_poke: action.payload };
    }
  }
};
