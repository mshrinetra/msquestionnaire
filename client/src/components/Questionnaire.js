import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";

class Questionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qId: (this.props.location.query ? (this.props.location.query.qsnrId ? this.props.location.query.qsnrId : "") : ""),
            response: {}
        }
        this.processSubmission = this.processSubmission.bind(this);
    }

    componentDidMount() {
        if (this.props.location.query) {
            const { qsnrId } = this.props.location.query;
            this.props.fetchQsnr(qsnrId);
        }
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
        e.target.parentNode.childNodes.forEach(node => { node.className = "ansCard card card-body m-3 bg-info text-white" });
        e.target.className = "ansCard card card-body m-3 bg-success text-white";
    }

    processSubmission() {
        this.props.submitQsnr({
            qId: this.state.qId,
            response: this.state.response
        });
    }

    renderSummary() {
        return (
            <ul>
                <li><b>Title:</b> {this.props.qsnr.about.qsnrTitle}</li>
                <li><b>Description:</b> {this.props.qsnr.about.qsnrDescription}</li>
                <li><b>Author:</b> {this.props.qsnr.about.creatorName}</li>
                <li><b>No of Question:</b> {this.props.qsnr.about.noOfQuestions}</li>
            </ul>
        );
    }

    renderOptionCard(name, value, qId) {

        return (
            <div className="ansCard card card-body m-3 bg-info text-white" key={name} onMouseEnter={e => this.handleMouseEnter(e)} onMouseLeave={e => this.handleMouseLeave(e)} onClick={e => this.handleAnsClick(e, qId, name)}>
                {value}
            </div>
        );
    }

    renderQuestionCard(qsnr) {
        return (
            <div className="qCard card col-12 bg-light m-3" key={qsnr.qId}>
                <div className="card-body">
                    <div className="qArea">
                        {qsnr.qText}
                    </div>
                    <hr />
                    <div className="optionsArea row">
                        {Object.keys(qsnr.options).map((name, index) => this.renderOptionCard(name, qsnr.options[name], qsnr.qId))}
                    </div>
                </div>
            </div>
        );
    }

    renderQuestions() {
        return (
            <div>
                {this.props.qsnr.qsnr.map(qsnr => this.renderQuestionCard(qsnr))}
            </div>
        );
    }

    renderSubmission() {
        return (
            <div>
                <Link to="/dashboard" className="btn btn-danger m-4 btn-lg active" role="button" aria-pressed="true">Cancel</Link>
                <button type="button" className="btn btn-lg btn-success m-4" onClick={this.processSubmission}>Submit</button>
            </div>
        );
    }

    renderQuestionnaire() {
        return (
            <div>
                <div className="card border-brimary text-primary">
                    <div className="card-header text-white bg-primary">
                        <h4>Summary of Questionnaire</h4>
                    </div>
                    <div className="card-body">
                        {this.renderSummary()}
                    </div>
                </div>
                <div className="card border-info">
                    <div className="card-header text-white bg-info">
                        <h4>Questionnaire</h4>
                    </div>
                    <div className="card-body">
                        {this.renderQuestions()}
                    </div>
                    <div className="card-footer">
                        {this.renderSubmission()}
                    </div>
                </div>
            </div>
        );
    }

    renderSuccessResult() {
        return (
            <div className="card bg-success text-white border-success">
                <div className="card-header">
                    <h4>Submitted successfully!</h4>
                </div>
                <div className="card-body text-center">
                    <h3>Thank You !!!</h3>
                </div>
                <Link to="/dashboard" className="btn btn-info m-4 btn-lg active" role="button" aria-pressed="true">Go Back to Dashboard</Link>
            </div>
        );
    }

    renderFailResult() {
        return (
            <div className="card bg-danger text-white border-danger">
                <div className="card-header">
                    <h4>Some error occured :-(</h4>
                </div>
                <div className="card-body text-center">
                    <h3>Sorry !!!</h3>
                </div>
                <Link to="/dashboard" className="btn btn-info m-4 btn-lg active" role="button" aria-pressed="true">Go Back to Dashboard</Link>
            </div>
        );
    }

    renderResult() {
        return (
            <div>
                {this.props.result.success ? this.renderSuccessResult() : this.renderFailResult()}
            </div>
        );
    }

    renderNoQsnr() {

        return (
            <div className="card bg-warning text-white border-warning">
                <div className="card-body">
                    <h4>No Questionnaire Selected !!!</h4>
                </div>
                <Link to="/dashboard" className="btn btn-info m-4 btn-lg active" role="button" aria-pressed="true">Go Back to Dashboard</Link>
            </div>
        );

    }

    renderWaitToLoad() {
        return (
            <div className="text-center">
                <h3>Please Wait...</h3>
            </div>
        );
    }

    renderAsPerState() {
        if (this.props.result) {
            return this.renderResult();
        } else if (this.props.qsnr) {
            return this.renderQuestionnaire();
        } else if (this.props.location.query) {
            return this.renderWaitToLoad();
        } else {
            return this.renderNoQsnr();
        }
    }

    render() {
        return (
            <div>
                <Header location={this.props.location.pathname} />
                <h2>Questionnaire</h2>
                {this.renderAsPerState()}
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