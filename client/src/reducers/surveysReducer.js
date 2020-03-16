import actionTypes from "../types/action.types";

const initialState = {
	list: []
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case actionTypes.GET_SURVEYS:
			return { ...state, list: payload };
		default:
			return state;
	}
};
