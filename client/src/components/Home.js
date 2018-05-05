import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Home extends Component {
    renderJumbotronParagraph() {
        if (this.props.auth) {
            return "Lets Explore";
        } else {
            return "To create or to answer any Questionnaire you need to login.";
        }
    }

    renderJumbotronButton() {
        if (this.props.auth) {
            return (
                <Link className="btn btn-primary btn-lg" to="/dashboard" role="button">Continue  as {this.props.auth.Name}</Link>
            );
        } else {
            return (
                <a className="btn btn-primary btn-lg" href="/auth/facebook" role="button">Continue Login with Facebook</a>
            );
        }
    }
    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-4">Welcome to MS Questionnaire!</h1>
                <p className="lead">This is plateform to create survays and test and bring your buddies to answer.</p>
                <hr className="my-4" />
                <p>
                    {this.renderJumbotronParagraph()}
                </p>
                <p className="lead">
                    {this.renderJumbotronButton()}
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Home);