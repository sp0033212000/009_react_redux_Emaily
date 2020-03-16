import React from "react";
import { connect } from "react-redux";
import formTypes from "../../types/form.types";
import * as actions from "../../actions";

const SurveyFormReview = ({ onCancel, formValues, postSurveys }) => {
	const renderForm = () => {
		return formTypes.FIELDS.map(({ label, name }) => {
			return (
				<div key={name}>
					<label>{label}</label>
					<div>{formValues[name]}</div>
				</div>
			);
		});
	};

	return (
		<div>
			<h5>Please confirm your entries</h5>
			{renderForm()}
			<button
				onClick={onCancel}
				className="orange darken-4 btn-flat white-text"
			>
				Back
				<i className="material-icons left">close</i>
			</button>
			<button
				onClick={() => {
					postSurveys(formValues);
				}}
				className="green btn-flat right white-text"
				type="submit"
			>
				Send
				<i className="material-icons right">email</i>
			</button>
		</div>
	);
};

const mapStateToProps = (state) => ({
	formValues: state.form.surveyForm.values
});

export default connect(mapStateToProps, actions)(SurveyFormReview);
