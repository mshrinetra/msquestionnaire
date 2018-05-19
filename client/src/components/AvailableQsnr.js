import React, { Component } from "react";
import { Link } from "react-router-dom";

class AvailableQsnr extends Component {

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
            <tbody key={qsnr.about.qsnrId}>
                {this.renderTableDataRow(qsnr)}
                {this.renderTableCollapse(qsnr)}
            </tbody>
        );
    }


    render() {
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
                    {this.props.availableQsnr.map(qsnr => this.renderTableBody(qsnr))}
                </table>
                <a href="#" className="btn btn-info btn-md" role="button">Prev</a>
                <span className="ml-4 mr-4">Page {1} of {10}</span>
                <a href="#" className="btn btn-info btn-md" role="button">Next</a>
            </div >
        );
    }
}

export default AvailableQsnr;
