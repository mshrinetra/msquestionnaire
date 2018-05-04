import React, { Component } from "react";
import logo from "../assets/msquestionnaire_icon.svg";
import loginBtn from "../assets/login-with-facebook-btn.png";

class Header extends Component {
    // constructor() {
    //     super(props);
    // }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">
                    <img src={logo} width="30" height="30" className="d-inline-block align-top mr-3" alt="" />
                    MS Questionnaire
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Dashboard</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Quiz</a>
                        </li>
                        <li className="nav-item">
                            <a className="btn btn-outline-success" href="#">Login</a>
                        </li>
                    </ul>

                </div>
            </nav>
        );
    }
}

export default Header;