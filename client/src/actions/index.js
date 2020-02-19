import Axios from "axios";
import actionTypes from "../types/action.types";

export const getUser = () => async (dispatch) => {
	const res = await Axios.get("/api/current_user");

	dispatch({
		type: actionTypes.GET_USER,
		payload: res.data
	});
};

export const postToken = (token) => async (dispatch) => {
	const res = await Axios.post("/api/stripe", token);

	dispatch({
		type: actionTypes.POST_TOKEN,
		payload: res.data
	});
};
