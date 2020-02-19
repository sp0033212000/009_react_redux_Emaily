import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

const Payment = (props) => {
	return (
		<StripeCheckout
			name="Emaily"
			description="$5 for 5 Emails credits"
			amount={500}
			token={(token) => props.postToken(token)}
			stripeKey={process.env.REACT_APP_STRIPE_KEY}
		>
			<button className="btn">Add Credits</button>
		</StripeCheckout>
	);
};

export default connect(null, actions)(Payment);
