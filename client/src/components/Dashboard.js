import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import AvailableQsnr from "./AvailableQsnr";
import AtendedQsnr from "./AtendedQsnr";
import CreatedQsnr from "./CreatedQsnr";

class Dashboard extends Component {
    componentDidMount() {
        this.props.fetchAvailableQsnr();
        this.props.fetchProfile();
    }

    renderAvailableQsnr(availableQsnr) {
        return (
            <AvailableQsnr availableQsnr={availableQsnr ? availableQsnr : ""} />
        );
    }

    renderAtendedQsnr(atendedQsnr) {
        return (
            <AtendedQsnr atendedQsnr={atendedQsnr} />
        )
    }

    renderAtendSomeQsnr() {
        return (
            <div className="card-body">
                <h4>You have not atended any Questionnaire !</h4>
                <h6>Give answers to some of above questionnaires. We hope it will be fun</h6>
            </div>
        );
    }

    renderCreatedQsnr(createdQsnr) {
        return (
            <CreatedQsnr createdQsnr={createdQsnr} />
        )
    }

    renderCreateNewQsnr() {
        return (
            <div className="card-body">
                <h4>You have not created any Questionnaire !</h4>
                <Link to="/Createnew" className="btn btn-primary btn-lg mt-3" role="button">Create your first Questionnaire here</Link>
            </div>
        )
    }

    render() {
        return (
            <div>
                <Header location={this.props.location.pathname} />
                <div className="card border-primary text-primary mb-3">
                    <div className="card-header text-white bg-primary text-center">
                        <h3>Available Questionnaires</h3>
                    </div>
                    {this.props.availableQsnr ? this.renderAvailableQsnr(this.props.availableQsnr) : ""}
                </div>
                <div className="card border-success text-success mb-3">
                    <div className="card-header text-white bg-success text-center">
                        <h3>Atended Questionnaires</h3>
                    </div>
                    {this.props.userProfile ? this.renderAtendedQsnr(this.props.userProfile.participationList) : this.renderAtendSomeQsnr()}
                </div>
                <div className="card border-info text-info mb-3">
                    <div className="card-header text-white bg-info text-center">
                        <h3>Created Questionnaires</h3>
                    </div>
                    {this.props.userProfile ? this.renderCreatedQsnr(this.props.userProfile.questionnaireList) : this.renderCreateNewQsnr()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        availableQsnr: state.availableQsnr,
        userProfile: state.userProfile
    };
}

export default connect(mapStateToProps, actions)(Dashboard);