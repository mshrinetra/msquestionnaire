import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Header from "./Header";
import { WSAENETDOWN } from "constants";

class CreateNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            type: "Survey",
            noOfQuestion: 10,
            questions: {}
        }

        this.processSubmission = this.processSubmission.bind(this);
    }

    handleTitleChange(e) {
        let newState = {
            ...this.state,
            title: e.target.value
        };
        this.setState(newState);
    }

    handleDescriptionChange(e) {
        let newState = {
            ...this.state,
            description: e.target.innerText
        };
        this.setState(newState);
    }

    handleNoOfQuestionChange(e) {
        let newState = {
            ...this.state,
            noOfQuestion: parseInt(e.target.value)
        };
        this.setState(newState);
    }

    handleTypeChange(e) {
        let newState = {
            ...this.state,
            type: e.target.value
        };
        this.setState(newState);
    }

    handleQuestionChange(e, qId) {
        let newState = {
            ...this.state,
        };
        if (!newState.questions[qId]) {
            newState.questions[qId] = {};
        }
        newState.questions[qId].qText = e.target.value;
        this.setState(newState);
    }

    handleOptionChange(e, qId, opId) {
        let newState = {
            ...this.state
        };
        if (!newState.questions[qId]) {
            newState.questions[qId] = {};
        }
        newState.questions[qId][opId] = e.target.value;
        this.setState(newState);
    }

    handleOptionRadioCheck(e, qId, opId) {
        let newState = {
            ...this.state
        };
        if (!newState.questions[qId]) {
            newState.questions[qId] = {};
        }
        newState.questions[qId]["correct"] = opId;
        this.setState(newState);
    }

    processSubmission() {
        // this.props.submitQsnr(this.state.response);
        console.log(this.state.questions);
    }

    renderSummaryForm() {
        return (
            <div className="card col-12 bg-light mb-3">
                <div className="card-header">
                    <h3>Please provide the following details</h3>
                </div>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Title</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Title of the Questionnaire" onChange={e => this.handleTitleChange(e)} />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Description</span>
                        </div>
                        <textarea className="form-control" aria-label="Description" onChange={e => this.handleDescriptionChange(e)}></textarea>
                    </div>
                    <div className="input-group mb-3">
                        <select className="custom-select" id="qCountSelect" defaultValue={"10"} onChange={e => this.handleNoOfQuestionChange(e)}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                        <select className="custom-select" id="qTypeSelect" defaultValue={"Survey"} onChange={e => this.handleTypeChange(e)}>
                            <option value="Survey">Survey</option>
                            <option value="Test">Test</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }


    renderQuestionCard(qId) {
        return (
            <div className="qCard card col-12 bg-light mb-3" key={qId}>
                <div className="card-body">
                    <div className="qArea">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">{"Q" + qId.toString()}</span>
                            </div>
                            <input type="text" className="form-control" placeholder={"Question" + qId.toString()} onChange={e => this.handleQuestionChange(e, qId)} />
                        </div>
                    </div>
                    <hr />
                    <div className="optionsArea row">
                        {
                            Array.from({ length: 4 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i)).map(opId => this.renderOption(qId, opId))
                        }
                    </div>
                </div>
            </div>
        );
    }

    renderOption(qId, opId) {

        return (
            <div className="card card-body m-3 bg-light" key={opId}>
                <span>{"Option " + opId}</span>
                {
                    this.state.type == "Test" ? this.renderTestOption(qId, opId) : this.renderSurveyOption(qId, opId)
                }
            </div>
        );
    }

    renderTestOption(qId, opId) {

        return (
            <div className="input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <input type="radio" name={"q" + qId.toString() + "radio"} onClick={e => this.handleOptionRadioCheck(e, qId, opId)} />
                    </div>
                </div>
                <input type="text" className="form-control" onChange={e => this.handleOptionChange(e, qId, opId)} />
            </div>
        );
    }

    renderSurveyOption(qId, opId) {

        return (
            <input type="text" className="form-control" onChange={e => this.handleOptionChange(e, qId, opId)} />
        );
    }

    renderQuestionsForm() {
        return (
            <div>
                {
                    Array(this.state.noOfQuestion).fill().map((e, i) => i + 1).map(id => this.renderQuestionCard(id))
                }
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

    renderCreateNew() {
        return (
            <div>
                {this.renderSummaryForm()}
                {this.renderQuestionsForm()}
                {this.renderSubmission()}
            </div>
        );
    }

    renderResult() {
        return (
            <div className="card col-12 bg-light">
                <div className="card-body">
                    <h3>{this.props.result ? "Thank You !!!" : "Some error occured :-("}</h3>
                </div>
                <Link to="/dashboard" className="btn btn-success m-4 btn-lg active" role="button" aria-pressed="true">Go Back to Dashboard</Link>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Header location={this.props.location.pathname} />
                <h2>Create New Questionnaire</h2>
                {this.props.result ? this.renderResult() : this.renderCreateNew()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, actions)(CreateNew);