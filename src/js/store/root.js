import { combineReducers } from "redux";
import auth from "./auth";
import settings from "./settings";
import spots from "./spots"
import map from "./map"
import modal from "./modal"
import gears from "./gears"

const createRootReducer = combineReducers({
  auth,
  settings,
  spots,
  gears,
  map,
  modal,
});

export default createRootReducer;