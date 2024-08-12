// src/reducers/index.js

import { combineReducers } from 'redux';
import myReducer from './reducer/LoginReducer';
import RefreshReducer from "./reducer/RefreshReducer"
import SearchReducer from "./reducer/SearchReducer"
import NearuserReducer from './reducer/NearuserReducer';
import UserLocation from "./reducer/UserLocation";
import UpdateReducer from "./reducer/UpdateReducer";
import EditReducer from './reducer/EditReducer';
import MessageReducer from './reducer/MessageReducer';
const rootReducer = combineReducers({
  myReducer,
  RefreshReducer,
  SearchReducer,
  NearuserReducer,
  UserLocation,
  UpdateReducer,
  EditReducer,
  MessageReducer
  // add more reducers here if needed
});

export default rootReducer;
