import React, { useState } from "react";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import { reduxForm } from "redux-form";
import formTypes from "../../types/form.types";
import validateEmails from "../../utils/validateEmails";

const SurveyNew = (props) => {
	const [showFormReview, setShowFormReview] = useState(false);

	const renderContent = () => {
		if (showFormReview) {
			return (
				<SurveyFormReview
					{...props}
					onCancel={() => setShowFormReview(false)}
				/>
			);
		}

		return (
			<SurveyForm {...props} onSurveySubmit={() => setShowFormReview(true)} />
		);
	};

	return <div>{renderContent()}</div>;
};

function validate(values) {
	const errors = {};

	errors.recipients = validateEmails(values.recipients || "");

	formTypes.FIELDS.forEach(({ name }) => {
		if (!values[name]) {
			errors[name] = `You must provide a ${name}!`;
		}
	});

	return errors;
}

export default reduxForm({
	form: "surveyForm",
	validate
})(SurveyNew);
