const initialState = {
    data: ""
  };
  
  const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SEARCH':
        return { ...state, data: action.payload };
      default:
        return state;
    }
  };
  
  export default SearchReducer;