import React from "react";
import { Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import formTypes from "../../types/form.types";

const SurveyForm = (props) => {
	return (
		<div>
			<form onSubmit={props.handleSubmit(props.onSurveySubmit)}>
				{formTypes.FIELDS.map(({ name, label }) => {
					return (
						<Field
							key={name}
							type="text"
							name={name}
							label={label}
							component={SurveyField}
						/>
					);
				})}
				<Link to="/surveys" className="red btn-flat white-text">
					Cancel
					<i className="material-icons left">close</i>
				</Link>
				<button className="teal btn-flat right white-text" type="submit">
					Next
					<i className="material-icons right">done</i>
				</button>
			</form>
		</div>
	);
};

export default SurveyForm;
// export default reduxForm({
// 	form: "surveyForm",
// 	validate,
// 	destroyOnUnmount: false
// })(SurveyForm);
