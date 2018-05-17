import React, { Component } from "react";
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

    renderCreatedQsnr(createdQsnr) {
        return (
            <CreatedQsnr createdQsnr={createdQsnr} />
        )
    }

    render() {
        return (
            <div>
                <Header location={this.props.location.pathname} />
                {this.props.availableQsnr ? this.renderAvailableQsnr(this.props.availableQsnr) : ""}
                {this.props.userProfile ? this.renderAtendedQsnr(this.props.userProfile.participationList) : ""}
                {this.props.userProfile ? this.renderCreatedQsnr(this.props.userProfile.questionnaireList) : ""}
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