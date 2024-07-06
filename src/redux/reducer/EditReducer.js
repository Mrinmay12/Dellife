const initialState = {
    data: {}
  };
  
  const EditReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_EDIT_DATA':
        return { ...state, data: action.payload };
      default:
        return state;
    }
  };
  
  export default EditReducer;