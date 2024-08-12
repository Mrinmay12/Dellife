// src/reducers/myReducer.js

const initialState = {
    data: {}
  };
  
  const MessageReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_MESSAGE_DATA':
        return { ...state, data: action.payload };
      default:
        return state;
    }
  };
  
  export default MessageReducer;
  