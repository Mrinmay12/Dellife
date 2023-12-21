// src/reducers/index.js

import { combineReducers } from 'redux';
import myReducer from './reducer/LoginReducer';
import RefreshReducer from "./reducer/RefreshReducer"

const rootReducer = combineReducers({
  myReducer,
  RefreshReducer
  // add more reducers here if needed
});

export default rootReducer;
