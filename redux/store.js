// src/reducers/index.js

import { combineReducers } from 'redux';
import myReducer from './reducer/LoginReducer';
import RefreshReducer from "./reducer/RefreshReducer"
import SearchReducer from "./reducer/SearchReducer"
import NearuserReducer from './reducer/NearuserReducer';
import UserLocation from "./reducer/UserLocation"
const rootReducer = combineReducers({
  myReducer,
  RefreshReducer,
  SearchReducer,
  NearuserReducer,
  UserLocation
  // add more reducers here if needed
});

export default rootReducer;
