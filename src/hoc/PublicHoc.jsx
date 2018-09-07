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
    componentWillMount() {
      const { checkAuthStatus, getUserProfile, auth, history } = this.props;
      const { locale } = passedProps;
      const webAuthToken = localStorage.getItem("webAuthToken");
      const webAuthId = localStorage.getItem("webAuthId");
      const webAuthRole = localStorage.getItem("webAuthRole");
      const { user } = auth;
      if (user.length < 1) {
        if (webAuthToken && webAuthId && webAuthRole) {
          checkAuthStatus(webAuthToken, webAuthId, locale).then(() => {
            getUserProfile(webAuthToken, webAuthId, webAuthRole).then(
              () => false
            );
          });
        }
      }
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
    showNotification: (title, message, fail, action) =>
      dispatch(a.showNotification(title, message, fail, action)),
    removeAll: () => dispatch(Notifications.removeAll()),
    checkAuthStatus: (token, id, locale) =>
      dispatch(a.checkAuthStatus(token, id, locale)),
    getUserProfile: (token, id, role) =>
      dispatch(a.getUserProfile(token, id, role))
  });
  const mapStateToProps = state => ({
    auth: state.auth,
    notifications: state.notifications,
    cartProductTotal: state.cart.cartProductTotal
  });
  return connect(mapStateToProps, mapDispatchToProps)(WrapperComponent);
}
