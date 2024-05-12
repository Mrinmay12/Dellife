// src/reducers/myReducer.js

const initialState = {
    data: {}
  };
  
  const UserLocation = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_LOCATION_DATA':
        return { ...state, data: action.payload };
      default:
        return state;
    }
  };
  
  export default UserLocation;
  