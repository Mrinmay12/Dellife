// src/reducers/myReducer.js

const initialState = {
    data: {}
  };
  
  const myReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_DATA':
        return { ...state, data: action.payload };
      default:
        return state;
    }
  };
  
  export default myReducer;
  