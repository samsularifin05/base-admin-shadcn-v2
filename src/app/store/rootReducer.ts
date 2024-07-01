import { formReducer, reducerTheme, reducerUtility } from "./reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  utility: reducerUtility,
  theme: reducerTheme,
  form: formReducer
});

export { rootReducer };