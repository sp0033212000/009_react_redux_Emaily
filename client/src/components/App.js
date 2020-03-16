import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import history from "../history";

import Header from "./Header";
import Landing from "./Landing";
import Dsahboard from "./Dsahboard";
import SurveyNew from "./surveys/SurveyNew";

const App = ({ getUser }) => {
	useEffect(() => {
		getUser();
	}, [getUser]);
	return (
		<Router history={history}>
			<div className="container">
				<Header />
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/surveys" component={Dsahboard} />
					<Route path="/surveys/new" component={SurveyNew} />
				</Switch>
			</div>
		</Router>
	);
};

export default connect(null, actions)(App);
