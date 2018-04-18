import React, { Component } from "react";
import { connect } from "react-redux";
import Notifications from "react-notification-system-redux";
import * as a from "../actions/Auth/Auth_actions";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { style } from "../variables/Variables";

export default function PublicHoc(WrappedComponent, passedProps) {
  class WrapperComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    render() {
      const { notifications } = this.props;
      const props = Object.assign({}, this.props, passedProps);
      if (passedProps.header) {
        return (
          <div className="main-panel">
            <Notifications notifications={notifications} style={style} />
            <WrappedComponent {...props} />
          </div>
        );
      }
      return (
        <div className="main-panel">
          <Notifications notifications={notifications} style={style} />
          <Header {...props} />
          <WrappedComponent {...props} />
          <Footer {...props} />
        </div>
      );
    }
  }
  const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(a.logout()),
    showNotification: (title, message, fail) =>
      dispatch(a.showNotification(title, message, fail))
  });
  const mapStateToProps = state => ({
    auth: state.auth,
    notifications: state.notifications
  });
  return connect(mapStateToProps, mapDispatchToProps)(WrapperComponent);
}
