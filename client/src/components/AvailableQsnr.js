import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

class AvailableQsnr extends Component {

    componentDidMount() {
        this.props.fetchAvailableQsnr(1);
    }

    gotoPage(page) {
        this.props.fetchAvailableQsnr(page);
    }

    renderTableDataRow(qsnr) {
        return (
            <tr>
                <td>{qsnr.about.qsnrTitle}</td>
                <td>{qsnr.about.creatorName}</td>
                <td>{qsnr.about.qsnrType}</td>
                <td><button type="button" className="btn btn-outline-info" data-toggle="collapse" data-target={"#availableCollapse" + qsnr.about.qsnrId} aria-expanded="false" aria-controls={"availableCollapse" + qsnr.about.qsnrId}>Know More</button>
                    <Link to={{ pathname: "/questionnaire", query: { qsnrId: qsnr.about.qsnrId } }} className="btn btn-outline-success active ml-3" role="button" aria-pressed="true">Take It</Link></td>
            </tr >
        );
    }

    renderTableCollapse(qsnr) {
        return (
            <tr className="collapse" id={"availableCollapse" + qsnr.about.qsnrId}>
                <td colSpan="5">
                    <ul>
                        <li><b>Questionnaire ID: </b>{qsnr.about.qsnrId}</li>
                        <li><b>Title: </b>{qsnr.about.qsnrTitle}</li>
                        <li><b>Description: </b>{qsnr.about.qsnrDescription}</li>
                        <li><b>Author: </b>{qsnr.about.creatorName}</li>
                        <li><b>Type: </b>{qsnr.about.qsnrType}</li>
                        <li><b>Status: </b>{qsnr.about.qsnrStatus}</li>
                        <li><b>No of Questions: </b>{qsnr.about.noOfQuestions}</li>
                    </ul>
                </td>
            </tr>
        );
    }

    renderTableBody(qsnr) {
        return (
            <tbody key={qsnr.about.qsnrId + Math.random().toString()}>
                {this.renderTableDataRow(qsnr)}
                {this.renderTableCollapse(qsnr)}
            </tbody>
        );
    }

    renderWaitToLoad() {
        return (
            <div className="text-center">
                <h4>Please Wait...</h4>
            </div>
        );
    }


    renderPrevBtn() {
        if (this.props.availableQsnr.currentPage <= 1) {
            return (
                <button className="btn btn-info btn-md btn-disabled" disabled>Prev</button>
            )
        } else {
            return (
                <button className="btn btn-info btn-md" onClick={e => this.gotoPage(parseInt(this.props.availableQsnr.currentPage) - 1)}>Prev</button>
            )
        }
    }

    renderNextBtn() {
        if (this.props.availableQsnr.isMore) {
            return (
                <button className="btn btn-info btn-md" onClick={e => this.gotoPage(parseInt(this.props.availableQsnr.currentPage) + 1)}>Next</button>
            )
        } else {
            return (
                <button className="btn btn-info btn-md btn-disabled" disabled>Next</button>
            )
        }
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
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    {this.props.availableQsnr.docs.map(qsnr => this.renderTableBody(qsnr))}
                </table>
                {this.renderPrevBtn()}
                <span className="ml-3 mr-3">{"Page  " + this.props.availableQsnr.currentPage}</span>
                {this.renderNextBtn()}
            </div >
        );
    }

    renderNoAvailableQsnr() {
        return (
            <div className="text-center">
                <h3 >Sorry !!!</h3>
                <h4>No Questionnaire to display at the moment.</h4>
            </div>
        );
    }

    renderAsPerState() {
        if (!this.props.availableQsnr) {
            return this.renderWaitToLoad();
        } else if (!this.props.availableQsnr.docs.length > 0) {
            return this.renderTable();
        } else {
            return this.renderNoAvailableQsnr();
        }
    }

    render() {
        return (
            <div className="card border-primary text-primary mb-3">
                <div className="card-header text-white bg-primary text-center">
                    <h3>Available Questionnaires</h3>
                </div>
                {/* {this.props.availableQsnr.docs ? this.renderAvailableQsnr(this.props.availableQsnr.docs) : ""} */}
                {this.props.availableQsnr ? this.renderTable() : this.renderWaitToLoad()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        availableQsnr: state.availableQsnr
    };
}

export default connect(mapStateToProps, actions)(AvailableQsnr);
