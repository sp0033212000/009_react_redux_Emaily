import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

const SurveyList = ({ surveys, getSurveys }) => {
	useEffect(() => {
		getSurveys();
	}, []);

	const renderSurveys = () => {
		return surveys.reverse().map(({ _id, title, body, dateSent, yes, no }) => {
			return (
				<div key={_id} className="card blue-grey darken-1">
					<div className="card-content white-text">
						<span className="card-title">{title}</span>
						<p>{body}</p>
						<p className="right">
							Sent on: {new Date(dateSent).toLocaleDateString()}
						</p>
					</div>
					<div className="card-action">
						<a>Yes: {yes}</a>
						<a>No : {no}</a>
					</div>
				</div>
			);
		});
	};

	return <div>{renderSurveys()}</div>;
};

const mapStateToProps = (state) => ({
	surveys: state.surveys.list
});

export default connect(mapStateToProps, actions)(SurveyList);
