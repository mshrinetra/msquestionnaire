import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";

class Questionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: {}
        }

        this.processSubmission = this.processSubmission.bind(this);
    }

    componentDidMount() {
        if (this.props.location.query) {
            const { qsnrId } = this.props.location.query;
            const getQuery = `/api/qsnr/?qsnrId=${qsnrId}`;
            this.props.fetchQsnr(getQuery);
        }
    }

    renderSummary() {
        return (<div>
            <ul>
                <li><b>Title:</b> {this.props.qsnr.about.qsnrTitle}</li>
                <li><b>Description:</b> {this.props.qsnr.about.qsnrDescription}</li>
                <li><b>Author:</b> {this.props.qsnr.about.creatorName}</li>
                <li><b>No of Question:</b> {this.props.qsnr.about.noOfQuestions}</li>
            </ul>
        </div>);
    }

    handleMouseEnter(e) {
        if (e.target.className !== "ansCard card card-body m-3 bg-success text-white") {
            e.target.className = "ansCard card card-body m-3 bg-primary text-white";
        }
    }

    handleMouseLeave(e) {
        if (e.target.className !== "ansCard card card-body m-3 bg-success text-white") {
            e.target.className = "ansCard card card-body m-3 bg-info text-white";
        }
    }

    handleAnsClick(e, qId, optionId) {
        let newState = {
            ...this.state,
        };
        newState.response[qId] = optionId;
        this.setState(newState);
        console.log(this.state);
        e.target.parentNode.childNodes.forEach(node => { node.className = "ansCard card card-body m-3 bg-info text-white" });
        e.target.className = "ansCard card card-body m-3 bg-success text-white";
    }

    renderOption(name, value, qId) {

        return (
            <div className="ansCard card card-body m-3 bg-info text-white" key={name} onMouseEnter={e => this.handleMouseEnter(e)} onMouseLeave={e => this.handleMouseLeave(e)} onClick={e => this.handleAnsClick(e, qId, name)}>
                {value}
            </div>
        );
    }

    renderQcard(qsnr) {
        return (
            <div className="qCard card col-12 bg-light m-3" key={qsnr.qId}>
                <div className="card-body">
                    <div className="qArea">
                        {qsnr.qText}
                    </div>
                    <hr />
                    <div className="optionsArea row">
                        {Object.keys(qsnr.options).map((name, index) => this.renderOption(name, qsnr.options[name], qsnr.qId))}
                    </div>
                </div>
            </div>
        );
    }

    renderQuestions() {
        return (
            <div>
                {this.props.qsnr.qsnr.map(qsnr => this.renderQcard(qsnr))}
            </div>
        );
    }

    processSubmission() {
        this.props.submitQsnr(this.state.response);
    }

    renderSubmission() {
        return (
            <div>
                <Link to="/dashboard" class="btn btn-danger m-4 btn-lg active" role="button" aria-pressed="true">Cancel</Link>
                <button type="button" className="btn btn-lg btn-success m-4" onClick={this.processSubmission}>Submit</button>
            </div>
        );
    }

    renderQuestionnaire() {
        return (
            <div>
                {this.renderSummary()}
                {this.renderQuestions()}
                {this.renderSubmission()}
            </div>
        );
    }

    renderNoQsnr() {

        return (
            <div className="card col-12 bg-light">
                <div className="card-body">
                    <h3>No Questionnaire Selected !!!</h3>
                </div>
                <Link to="/dashboard" class="btn btn-primary m-4 btn-lg active" role="button" aria-pressed="true">Go Back to Dashboard</Link>
            </div>
        );

    }

    renderResult() {
        return (
            <div className="card col-12 bg-light">
                <div className="card-body">
                    <h3>{this.props.result ? "Thank You !!!" : "Some error occured :-("}</h3>
                </div>
                <Link to="/dashboard" class="btn btn-success m-4 btn-lg active" role="button" aria-pressed="true">Go Back to Dashboard</Link>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Header location={this.props.location.pathname} />
                <h2>Questionnaire</h2>
                {this.props.result ? this.renderResult() : (this.props.qsnr ? this.renderQuestionnaire() : this.renderNoQsnr())}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        qsnr: state.qsnr,
        result: state.result
    };
}

export default connect(mapStateToProps, actions)(Questionnaire);