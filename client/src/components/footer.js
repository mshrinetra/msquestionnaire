import React from "react";

const Footer = function () {
    return (
        <footer className="footer fixed-bottom">
            Copyright (c) {(new Date()).getFullYear()} Manvendra Shrinetra
        </footer>
    );
}

export default Footer;