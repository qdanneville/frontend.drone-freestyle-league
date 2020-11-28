import { combineReducers } from "redux";
import auth from "./auth";
import settings from "./settings";
import spots from "./spots"
import map from "./map"
import modal from "./modal"

const createRootReducer = combineReducers({
  auth,
  settings,
  spots,
  map,
  modal
});

export default createRootReducer;