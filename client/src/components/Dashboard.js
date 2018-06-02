import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import AvailableQsnr from "./AvailableQsnr";
import AtendedQsnr from "./AtendedQsnr";
import CreatedQsnr from "./CreatedQsnr";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Header location={this.props.location.pathname} />
                <AvailableQsnr />
                <AtendedQsnr />
                <CreatedQsnr />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, actions)(Dashboard);