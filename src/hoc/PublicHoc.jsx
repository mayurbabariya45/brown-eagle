import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

export default function PublicHoc(WrappedComponent, passedProps) {
  class WrapperComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    render() {
      const props = Object.assign({}, this.props, passedProps);
      if (passedProps.header) {
        return (
          <div className="main-panel">
            <WrappedComponent {...props} />
          </div>
        );
      }
      return (
        <div className="main-panel">
          <Header {...props} />
          <WrappedComponent {...props} />
          <Footer {...props} />
        </div>
      );
    }
  }
  const mapStateToProps = state => ({
    auth: state.auth
  });
  return connect(mapStateToProps)(WrapperComponent);
}
