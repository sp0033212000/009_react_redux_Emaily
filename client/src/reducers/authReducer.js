import actionTypes from "../types/action.types";

// const initialState = {};

export default (state = null, { type, payload }) => {
	switch (type) {
		case actionTypes.GET_USER:
		case actionTypes.POST_SURVEYS:
		case actionTypes.POST_TOKEN:
			return payload || false;
		default:
			return state;
	}
};
