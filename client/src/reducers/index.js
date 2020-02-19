import { combineReducers } from "redux";
import authReducer from "./authReducer";
import surveysReducer from "./surveysReducer";
import actionTypes from "../types/action.types";

const allReducers = combineReducers({
	auth: authReducer,
	surveys: surveysReducer
});

const rootReducer = (state, action) => {
	if (action.type === actionTypes.LOG_OUT) {
		state = undefined;
	}

	return allReducers(state, action);
};

export default rootReducer;
