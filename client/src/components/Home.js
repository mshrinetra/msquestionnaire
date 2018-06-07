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
                <Link className="btn btn-primary btn-lg" to="/dashboard" role="button">Continue  as {this.props.auth.userName}</Link>
            );
        } else {
            return (
                <a className="btn btn-primary btn-lg" href="/auth/facebook" role="button">Continue Login with Facebook</a>
            );
        }
    }
    render() {
        return (
            <div>
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

                <div className="card mb-3 bg-secondary text-white border-secondary">
                    <div className="card-body">
                        <h5 className="card-title">Take Questionnaire from the list</h5>
                        <p className="card-text">Take as meny questionnaire from the list of the questionnaire as you want, after all these questiones have been created for you.</p>
                    </div>
                    <img className="card-img-bottom" src={require("../assets/home1.PNG")} alt="Card image cap" />
                </div>
                <div className="card mb-3 bg-secondary text-white border-secondary">
                    <div className="card-body">
                        <h5 className="card-title">See your attended questionnaires</h5>
                        <p className="card-text">Check your progress anytime. Your all details will be displayed on your dashboard. Just don't forget to log in.</p>
                    </div>
                    <img className="card-img-bottom" src={require("../assets/home2.PNG")} alt="Card image cap" />
                </div>
                <div className="card mb-3 bg-secondary text-white border-secondary">
                    <div className="card-body">
                        <h5 className="card-title">Create your own Questionnaire</h5>
                        <p className="card-text">Create your own questionnaire and invite your frends to take these questionnaire and see how they perform.</p>
                    </div>
                    <img className="card-img-bottom" src={require("../assets/home3.PNG")} alt="Card image cap" />
                </div>
            </div >
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Home);