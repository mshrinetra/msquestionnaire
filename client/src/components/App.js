import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
const Home = () => <div>Home</div>;
const Topics = () => <div>Topics</div>;
const Quiz = () => <div>Quiz</div>;
const Result = () => <div>Result</div>;
const Dashboard = () => <div>Dashboard</div>;
const NewQuiz = () => <div>NewQuiz</div>;


class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact={true} path="/" component={Home} />
                        <Route exact={true} path="/topics" component={Topics} />
                        <Route exact={true} path="/quiz" component={Quiz} />
                        <Route exact={true} path="/result" component={Result} />
                        <Route exact={true} path="/dashboard" component={Dashboard} />
                        <Route exact={true} path="/newquiz" component={NewQuiz} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);
