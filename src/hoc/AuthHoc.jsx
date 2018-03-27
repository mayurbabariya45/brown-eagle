import React, { Component } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

export default function AuthHoc(WrappedComponent, passedProps) {
  class WrapperComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    render() {
      const props = Object.assign({}, this.props, passedProps);
      return (
        <div className="main-panel">
          <Header {...this.props} />
          <WrappedComponent {...props} />
          <Footer {...this.props} />
        </div>
      );
    }
  }
  return WrapperComponent;
}
