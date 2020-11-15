import { combineReducers } from "redux";
import auth from "./auth";
import settings from "./settings";
import spots from "./spots"
import map from "./map"

const createRootReducer = combineReducers({
  auth,
  settings,
  spots,
  map
});

export default createRootReducer;