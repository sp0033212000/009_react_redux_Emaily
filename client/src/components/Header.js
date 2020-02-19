import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payment from "./Payment";

const Header = (props) => {
	const renderContent = () => {
		switch (props.auth) {
			case null:
				return null;
			case false:
				return (
					<li>
						<a href="/auth/google">Login With Google</a>
					</li>
				);
			default:
				return (
					<React.Fragment>
						<li>
							<Payment />
						</li>
						<li style={{ margin: "0 10px" }}>Credits: {props.auth.credits}</li>
						<li>
							<a href="/api/logout">Logout</a>
						</li>
					</React.Fragment>
				);
		}
	};

	return (
		<nav>
			<div className="nav-wrapper">
				<Link
					style={{ margin: "0 10px" }}
					to={props.auth ? "/surveys" : "/"}
					className="left brand-logo"
				>
					Emaily
				</Link>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					{renderContent()}
				</ul>
			</div>
		</nav>
	);
};

const mapStateToprops = (state) => {
	return { auth: state.auth };
};

export default connect(mapStateToprops, null)(Header);
