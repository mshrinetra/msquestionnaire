import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "./Header";

class Questionnaire extends Component {
    constructor(props) {
        super(props);
    }

    handleMouseEnter(e) {
        if (e.target.className != "ansCand card card-body col-12 col-md-6 bg-success text-white") {
            e.target.className = "ansCand card card-body col-12 col-md-6 bg-primary text-white";
        }
    }

    handleMouseLeave(e) {
        if (e.target.className != "ansCand card card-body col-12 col-md-6 bg-success text-white") {
            e.target.className = "ansCand card card-body col-12 col-md-6 bg-info text-white";
        }
    }

    handleClick(e, qId, optionId) {
        // let newState = { ...this.state };
        // newState.filter(obj => obj.key === 'value').map(filteredObj => filteredObj.key);
        let newQList = this.state.qlist.map(obj => this.updateState(obj, qId, optionId))
        let newState = {
            ...this.state,
            qlist: newQList
        };
        this.setState(newState);
    }

    updateState(obj, qId, optionId) {
        if (obj.qid == qId) {
            let newObj = { ...obj };
            newObj.selected.optionId = optionId;
            return newObj;
        } else {
            return obj;
        }
    }

    renderOption(option, selected, qId) {
        if (selected.optionId == option.optionId) {
            return (
                <div className="ansCand card card-body col-12 col-md-6 bg-success text-white" key={option.optionId}
                    onMouseEnter={e => this.handleMouseEnter(e)} onMouseLeave={e => this.handleMouseLeave(e)} onClick={e => this.handleClick(e, qId, option.optionId)}>
                    {option.option}
                </div>
            );
        } else {
            return (
                <div className="ansCand card card-body col-12 col-md-6 bg-info text-white" key={option.optionId}
                    onMouseEnter={e => this.handleMouseEnter(e)} onMouseLeave={e => this.handleMouseLeave(e)} onClick={e => this.handleClick(e, qId, option.optionId)}>
                    {option.option}
                </div>
            );
        }
    }

    renderQuestion(quest) {
        return (
            <div className="qCard card col-12 bg-light" key={quest.qid}>
                <div className="card-body">
                    <div className="qArea">
                        {quest.qestion}
                    </div>
                    <hr />
                    <div className="optionsArea row">
                        {quest.options.map(option => this.renderOption(option, quest.selected, quest.qid))}
                    </div>
                </div>
            </div>
        );
    }

    handleSubmit() {
        let ansList = this.state.qlist.map(q => q.selected);
        console.log(ansList)
        alert("Answers submitted !!!");
    }

    renderQContainer() {
        return (
            <div className="card">
                <div className="card-header">
                    QUESTIONS
                </div>
                <div className="card-body">
                    <div className="Question-Container row">
                        {this.state.qlist.map(quest => this.renderQuestion(quest))}
                    </div>
                </div>
                <div className="card-footer">
                    <button className="btn btn-primary" onClick={e => this.handleSubmit(e)}>SUBMIT</button>
                </div>
            </div>
        );
    }


    render() {
        return this.renderQContainer();
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Questionnaire);