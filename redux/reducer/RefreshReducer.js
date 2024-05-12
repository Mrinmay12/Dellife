const initialState = {
    data: new Date().getMilliseconds()
  };
  
  const RefreshReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_REFRESH':
        return { ...state, data: action.payload };
      default:
        return state;
    }
  };
  
  export default RefreshReducer;