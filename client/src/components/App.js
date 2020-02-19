import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import history from "../history";

import Header from "./Header";
import Landing from "./Landing";

const Surveys = () => <div>Survey</div>;

const App = ({ getUser }) => {
	useEffect(() => {
		getUser();
	}, [getUser]);
	return (
		<div className="container">
			<Router history={history}>
				<Header />
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route path="/surveys" component={Surveys} />
				</Switch>
			</Router>
		</div>
	);
};

export default connect(null, actions)(App);
