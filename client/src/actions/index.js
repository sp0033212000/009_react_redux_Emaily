import Axios from "axios";
import actionTypes from "../types/action.types";
import history from "../history";

export const getUser = () => async (dispatch) => {
	const res = await Axios.get("/api/current_user");

	dispatch({
		type: actionTypes.GET_USER,
		payload: res.data
	});
};

export const getSurveys = () => async (dispatch) => {
	const res = await Axios.get("/api/surveys");

	dispatch({
		type: actionTypes.GET_SURVEYS,
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

export const postSurveys = (values) => async (dispatch) => {
	const res = await Axios.post("/api/surveys", values);

	history.push("/surveys");
	dispatch({ type: actionTypes.POST_SURVEYS, payload: res.data });
};
