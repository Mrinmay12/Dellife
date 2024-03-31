// src/reducers/index.js

import { combineReducers } from 'redux';
import myReducer from './reducer/LoginReducer';
import RefreshReducer from "./reducer/RefreshReducer"
import SearchReducer from "./reducer/SearchReducer"

const rootReducer = combineReducers({
  myReducer,
  RefreshReducer,
  SearchReducer
  // add more reducers here if needed
});

export default rootReducer;
