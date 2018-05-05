import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Home from "./Home";
import Dashboard from "./Dashboard";
import Quiz from "./Questionnaire";
import New from "./CreateNew";
import Footer from "./footer";


class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div className="container">
                        <Route exact={true} path="/" component={Home} />
                        <Route exact={true} path="/dashboard" component={Dashboard} />
                        <Route exact={true} path="/questionnaire" component={Quiz} />
                        <Route exact={true} path="/createnew" component={New} />
                    </div>
                </BrowserRouter>
                <Footer />
            </div>
        );
    }
}

export default connect(null, actions)(App);
