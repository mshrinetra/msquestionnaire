import React, { Component } from "react";

class AtendedQsnr extends Component {

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
            <tbody key={qsnr.qsnrId}>
                {this.renderTableDataRow(qsnr)}
                {this.renderTableCollapse(qsnr)}
            </tbody>
        );
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <h2>Atended Questionnaire</h2>
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
                    {this.props.atendedQsnr.map(qsnr => this.renderTableBody(qsnr))}
                </table>
                <a href="#" className="btn btn-info btn-md" role="button">Prev</a>
                <span className="ml-4 mr-4">Page {1} of {10}</span>
                <a href="#" className="btn btn-info btn-md" role="button">Next</a>
            </div>
        );
    }
}

export default AtendedQsnr;
