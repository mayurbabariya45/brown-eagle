import React, { Component } from "react";
import { connect } from "react-redux";
import * as a from "../actions/Auth/Auth_actions";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

export default function AuthHoc(WrappedComponent, passedProps) {
  class WrapperComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    componentWillMount() {
      const { auth, history } = this.props;
      const { user } = auth;
      if (user.length < 1) {
        history.push("/login");
      }
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
  const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(a.logout())
  });
  const mapStateToProps = state => ({
    auth: state.auth
  });
  return connect(mapStateToProps, mapDispatchToProps)(WrapperComponent);
}
