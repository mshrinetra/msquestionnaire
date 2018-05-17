import React, { Component } from "react";
import logo from "../assets/msquestionnaire_icon.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {

    renderHeaderNavs() {
        if (this.props.auth) {
            return (
                <ul className="navbar-nav ml-auto">
                    <li className={this.props.location.startsWith("/home") ? "nav-item active" : "nav-item"}>
                        <Link className="nav-link" to="/">Home<span className="sr-only"></span></Link>
                    </li>
                    <li className={this.props.location.startsWith("/dashboard") ? "nav-item active" : "nav-item"}>
                        <Link className="nav-link" to="/Dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <a className="btn btn-outline-success" data-toggle="modal" data-target="#loginModel" href="">{
                            (this.props.auth.userName.split(" "))[0].length <= 15
                                ? ("Logged in as " + (this.props.auth.userName.split(" "))[0])
                                : ("Logged in as " + (this.props.auth.userName.split(" "))[0].substring(0, 12) + "...")
                        }</a>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="btn btn-outline-primary" data-toggle="modal" data-target="#loginModel" href="">Login</a>
                    </li>
                </ul>
            );
        }

    }

    renderModel() {
        let modelTitle = "";
        let modelBody = "";
        let modelButton = "";
        if (this.props.auth) {
            modelTitle = this.props.auth.userName
            modelBody = "Your ID is " + this.props.auth._id + " !"
            modelButton = (<a href="/api/logout" className="btn btn-danger">Logout</a>);
        } else {
            modelTitle = "You need to login to continue!";
            modelBody = (<a className="loginBtn loginBtn--facebook" href="/auth/facebook">
                Continue With Facebook
                        </a>);
        }
        return (
            <div className="modal fade" id="loginModel" tabIndex="-1" role="dialog" aria-labelledby="loginModelLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="loginModelLabel">{modelTitle}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {modelBody}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            {modelButton}
                        </div>
                    </div>
                </div>
            </div>
        );

    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} width="30" height="30" className="d-inline-block align-top mr-3" alt="" />
                        MS Questionnaire
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse ml-auto" id="navbarSupportedContent">
                        {
                            this.renderHeaderNavs()
                        }
                    </div>
                </nav>
                {
                    this.renderModel()
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);