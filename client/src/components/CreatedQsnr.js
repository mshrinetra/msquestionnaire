import React, { Component } from "react";
import { Link } from "react-router-dom";

class CreatedQsnr extends Component {

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
            <tbody key={qsnr.qsnrId}>
                {this.renderTableDataRow(qsnr)}
                {this.renderTableCollapse(qsnr)}
            </tbody>
        );
    }

    renderCreatedQuestionnaire() {
        return (
            <div>
                <h2>Created Questionnaire</h2>
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
                    {this.props.createdQsnr.map(qsnr => this.renderTableBody(qsnr))}
                </table>
                <a href="#" className="btn btn-info btn-md" role="button">Prev</a>
                <span className="ml-4 mr-4">Page {1} of {10}</span>
                <a href="#" className="btn btn-info btn-md" role="button">Next</a>
                <br />
                <Link to="/createnew" className="btn btn-primary btn-lg" role="button">Create New Questionnaire</Link>
            </div>
        );
    }

    renderCreateNewQuestionnaire() {
        <div>
            <h3>You have not created any Questionnaire !</h3>
            <Link to="/Createnew" className="btn btn-primary btn-lg" role="button">Create your first Questionnaire here</Link>
        </div>
    }

    render() {
        if (this.props.createdQsnr.length > 0) {
            return this.renderCreatedQuestionnaire();
        } else {
            return this.renderCreateNewQuestionnaire();
        }
    }
}

export default CreatedQsnr;
