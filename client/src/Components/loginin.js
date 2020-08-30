import React, { Component } from "react";

export default class index extends Component {
  render() {
    return (
      <>
        <div
          style={{ marginTop: "20vh" }}
          className="container d-flex justify-content-center"
        >
          <h1>The Notes App</h1>
        </div>
        <div
          style={{ marginTop: "20vh" }}
          className="container d-flex justify-content-center"
        >
          <h3 className="text-muted">Click Here to login with Google</h3>
        </div>

        <div
          style={{ marginTop: "2vh" }}
          className="container d-flex justify-content-center"
        >
          <a href="/api/google" className="btnn btnn-icon btnn-googleplus">
            <i className="fa fa-google-plus"></i>
            <span>Google+</span>
          </a>
        </div>
      </>
    );
  }
}
