import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "./Header";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Header location={this.props.location.pathname} />
                <h2>This is Dashboard</h2>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Dashboard);