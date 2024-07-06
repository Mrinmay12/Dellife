const initialState = {
    data: ''
  };
  
  const UpdateReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_UPDATE':
        return { ...state, data: action.payload };
      default:
        return state;
    }
  };
  
  export default UpdateReducer;