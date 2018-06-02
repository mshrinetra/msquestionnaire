import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class AtendedQsnr extends Component {

    componentDidMount() {
        this.props.fetchAtendedQsnr(1);
    }

    gotoPage(page) {
        this.props.fetchAtendedQsnr(page);
    }

    renderTableDataRow(qsnr) {
        return (
            <tr>
                <td>{qsnr.qsnrTitle}</td>
                <td>{qsnr.creatorName}</td>
                <td>{qsnr.qsnrType}</td>
                <td>{qsnr.totalMarks && qsnr.scoredMarks ? (qsnr.scoredMarks.toString() + "/" + qsnr.totalMarks.toString()) : "N/A"}</td>
                <td><button type="button" className="btn btn-outline-info" data-toggle="collapse" data-target={"#atendedCollapse" + qsnr.qsnrId} aria-expanded="false" aria-controls={"atendedCollapse" + qsnr.qsnrId}>Know More</button></td>
            </tr>
        );
    }
    renderTableCollapse(qsnr) {
        return (
            <tr className="collapse" id={"atendedCollapse" + qsnr.qsnrId}>
                <td colSpan="5">
                    <ul>
                        <li><b>Questionnaire ID: </b>{qsnr.qsnrId}</li>
                        <li><b>Title: </b>{qsnr.qsnrTitle}</li>
                        <li><b>Description: </b>{qsnr.qsnrDescription}</li>
                        <li><b>Author: </b>{qsnr.creatorName}</li>
                        <li><b>Type: </b>{qsnr.qsnrType}</li>
                        <li><b>Status: </b>{qsnr.qsnrStatus}</li>
                        <li><b>Scored Marks: </b>{qsnr.totalMarks && qsnr.scoredMarks ? (qsnr.scoredMarks.toString() + "/" + qsnr.totalMarks.toString()) : "N/A"}</li>
                    </ul>
                </td>
            </tr>
        );
    }

    renderTableBody(qsnr) {
        return (
            <tbody key={qsnr.qsnrId + Math.random().toString()}>
                {this.renderTableDataRow(qsnr)}
                {this.renderTableCollapse(qsnr)}
            </tbody>
        );
    }

    renderTable() {
        return (
            <div className="card-body">
                <table className="table table-striped table-hover table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Type</th>
                            <th scope="col">Score</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    {this.props.atendedQsnr.docs.map(qsnr => this.renderTableBody(qsnr))}
                </table>
                {this.renderPrevBtn()}
                <span className="ml-3 mr-3">{"Page  " + this.props.atendedQsnr.currentPage}</span>
                {this.renderNextBtn()}
            </div>
        );
    }

    renderAtendSomeQuestionnaire() {
        return (
            <div className="card-body">
                <h4>You have not atended any Questionnaire !</h4>
                <h6>Give answers to some of above questionnaires. We hope it will be fun</h6>
            </div>
        );
    }

    renderPrevBtn() {
        if (this.props.atendedQsnr.currentPage <= 1) {
            return (
                <button className="btn btn-info btn-md btn-disabled" disabled>Prev</button>
            )
        } else {
            return (
                <button className="btn btn-info btn-md" onClick={e => this.gotoPage(parseInt(this.props.atendedQsnr.currentPage) - 1)}>Prev</button>
            )
        }
    }

    renderNextBtn() {
        if (this.props.atendedQsnr.isMore) {
            return (
                <button className="btn btn-info btn-md" onClick={e => this.gotoPage(parseInt(this.props.atendedQsnr.currentPage) + 1)}>Next</button>
            )
        } else {
            return (
                <button className="btn btn-info btn-md btn-disabled" disabled>Next</button>
            )
        }
    }

    renderWaitToLoad() {
        return (
            <div className="text-center">
                <h4>Please Wait...</h4>
            </div>
        );
    }

    renderAsPerState() {
        if (!this.props.atendedQsnr) {
            return this.renderWaitToLoad();
        } else if (this.props.atendedQsnr.docs.length > 0) {
            return this.renderTable();
        } else {
            return this.renderAtendSomeQuestionnaire();
        }
    }

    render() {
        return (
            <div className="card border-success text-success mb-3">
                <div className="card-header text-white bg-success text-center">
                    <h3>Atended Questionnaires</h3>
                </div>
                {this.renderAsPerState()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        atendedQsnr: state.atendedQsnr
    });
}

export default connect(mapStateToProps, actions)(AtendedQsnr);
