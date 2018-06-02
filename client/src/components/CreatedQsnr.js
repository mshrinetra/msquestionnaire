import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

class CreatedQsnr extends Component {

    componentDidMount() {
        this.props.fetchCreatedQsnr(1);
    }

    gotoPage(page) {
        this.props.fetchCreatedQsnr(page);
    }

    renderTableDataRow(qsnr) {
        return (
            <tr>
                <td>{qsnr.qsnrTitle}</td>
                <td>{qsnr.qsnrType}</td>
                <td>{qsnr.noOfParticipations}</td>
                <td>{qsnr.qsnrStatus}</td>
                <td><button type="button" className="btn btn-outline-info" data-toggle="collapse" data-target={"#createdCollapse" + qsnr.qsnrId} aria-expanded="false" aria-controls={"createdCollapse" + qsnr.qsnrId}>Know More</button></td>
            </tr>
        );
    }
    renderTableCollapse(qsnr) {
        return (
            <tr className="collapse" id={"createdCollapse" + qsnr.qsnrId}>
                <td colSpan="5">
                    <ul>
                        <li><b>Questionnaire ID: </b>{qsnr.qsnrId}</li>
                        <li><b>Title: </b>{qsnr.qsnrTitle}</li>
                        <li><b>Description: </b>{qsnr.qsnrDescription}</li>
                        <li><b>Type: </b>{qsnr.qsnrType}</li>
                        <li><b>Status: </b>{qsnr.qsnrStatus}</li>
                        <li><b>Total Marks: </b>{qsnr.totalMarks ? qsnr.totalMarks.toString() : "N/A"}</li>
                        <li><b>No of Participation: </b> {qsnr.noOfParticipations}</li>
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

    renderCreatedQuestionnaire() {
        return (
            <div className="card-body">
                <table className="table table-striped table-hover table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Type</th>
                            <th scope="col">Participation</th>
                            <th scope="col">Status</th>
                            <th scoe="col"></th>
                        </tr>
                    </thead>
                    {this.props.createdQsnr.docs.map(qsnr => this.renderTableBody(qsnr))}
                </table>
                {this.renderPrevBtn()}
                <span className="ml-3 mr-3">{"Page  " + this.props.createdQsnr.currentPage}</span>
                {this.renderNextBtn()}
                <br />
                <Link to="/createnew" className="btn btn-primary btn-lg mt-3" role="button">Create New Questionnaire</Link>
            </div>
        );
    }

    renderPrevBtn() {
        if (this.props.createdQsnr.currentPage <= 1) {
            return (
                <button className="btn btn-info btn-md btn-disabled" disabled>Prev</button>
            )
        } else {
            return (
                <button className="btn btn-info btn-md" onClick={e => this.gotoPage(parseInt(this.props.createdQsnr.currentPage) - 1)}>Prev</button>
            )
        }
    }

    renderNextBtn() {
        if (this.props.createdQsnr.isMore) {
            return (
                <button className="btn btn-info btn-md" onClick={e => this.gotoPage(parseInt(this.props.createdQsnr.currentPage) + 1)}>Next</button>
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

    renderCreateNewQuestionnaire() {
        return (
            <div className="card-body">
                <h4>You have not created any Questionnaire !</h4>
                <Link to="/Createnew" className="btn btn-primary btn-lg mt-3" role="button">Create your first Questionnaire here</Link>
            </div>
        );
    }

    renderAsPerState() {
        if (!this.props.createdQsnr) {
            return this.renderWaitToLoad();
        } else if (this.props.createdQsnr.docs.length > 0) {
            return this.renderCreatedQuestionnaire();
        } else {
            return this.renderCreateNewQuestionnaire();
        }
    }

    render() {
        return (
            <div className="card border-info text-info mb-3">
                <div className="card-header text-white bg-info text-center">
                    <h3>Created Questionnaires</h3>
                </div>
                {this.renderAsPerState()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        createdQsnr: state.createdQsnr
    });
}

export default connect(mapStateToProps, actions)(CreatedQsnr);
