import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "./Header";

class New extends Component {
    render() {
        return (
            <div>
                <Header location={this.props.location.pathname} />
                <h2>This is to Create New</h2>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(New);