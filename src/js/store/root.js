import { combineReducers } from "redux";
import auth from "./auth";
import settings from "./settings";
import spots from "./spots"

const createRootReducer = combineReducers({
  auth,
  settings,
  spots
});

export default createRootReducer;