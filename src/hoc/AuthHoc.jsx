import React, { Component } from "react";
import { connect } from "react-redux";
import Notifications from "react-notification-system-redux";
import "react-block-ui/style.css";
import * as a from "../actions/Auth/Auth_actions";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { style } from "../variables/Variables";

export const notificationOpts = props => ({
  title: <span data-notify="icon" className={props.title} />,
  message: <div>{props.message}</div>,
  position: "bc",
  autoDismiss: 5
});
export default function AuthHoc(WrappedComponent, passedProps) {
  class WrapperComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    componentWillMount() {
      const {
        checkAuthStatus,
        getUserProfile,
        auth,
        history,
        removeAll
      } = this.props;
      const { locale, type } = passedProps;
      const token = localStorage.getItem("webAuthToken");
      const id = localStorage.getItem("webAuthId");
      const { user } = auth;

      if (user.length < 1) {
        if (token && id) {
          checkAuthStatus(token, id, locale).then(() => {
            getUserProfile(token, id).then(profile => {
              if (profile.payload.role === type) {
                return true;
              }
              history.push("/login");
              return false;
            });
          });
        } else {
          history.push("/login");
        }
      } else {
        if (user.role === type) {
          return true;
        }
        history.goBack();
        return false;
      }

      return false;
    }
    render() {
      const { notifications } = this.props;
      const props = Object.assign(
        {},
        this.props,
        passedProps,
        notificationOpts
      );
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
    checkAuthStatus: (token, id, locale) =>
      dispatch(a.checkAuthStatus(token, id, locale)),
    getUserProfile: (token, id) => dispatch(a.getUserProfile(token, id)),
    showNotification: (title, message, fail) =>
      dispatch(a.showNotification(title, message, fail)),
    removeAll: () => dispatch(Notifications.removeAll()),
    success: message =>
      dispatch(
        Notifications.success({
          title: <span data-notify="icon" className="pe-7s-check" />,
          message: <div>{message}</div>,
          position: "bc",
          autoDismiss: 5
        })
      ),
    error: message =>
      dispatch(
        Notifications.error({
          title: <span data-notify="icon" className="pe-7s-shield" />,
          message: <div>{message}</div>,
          position: "bc",
          autoDismiss: 5
        })
      )
  });
  const mapStateToProps = state => ({
    auth: state.auth,
    notifications: state.notifications
  });
  const mergeProps = (state, actions, ownProps) => ({
    ...state,
    ...actions,
    ...ownProps,
    logout: () => {
      localStorage.removeItem("webAuthId");
      localStorage.removeItem("webAuthToken");
      actions.logout();
    }
  });
  return connect(mapStateToProps, mapDispatchToProps, mergeProps)(
    WrapperComponent
  );
}
