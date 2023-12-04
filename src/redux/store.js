// src/reducers/index.js

import { combineReducers } from 'redux';
import myReducer from './reducer/LoginReducer';

const rootReducer = combineReducers({
  myReducer
  // add more reducers here if needed
});

export default rootReducer;
