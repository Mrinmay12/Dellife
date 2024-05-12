// src/reducers/myReducer.js

const initialState = {
    data: {}
  };
  
  const NearuserReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_NEAR_USER_DATA':
        return { ...state, data: action.payload };
      default:
        return state;
    }
  };
  
  export default NearuserReducer;
  