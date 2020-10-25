import { combineReducers } from "redux";
import auth from "./auth";
import settings from "./settings";

const createRootReducer = combineReducers({
  auth,
  settings
});

export default createRootReducer;