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
  autoDismiss: 5,
  ...props
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
        getSellerActivePlans,
        auth,
        history
      } = this.props;
      const { locale, type } = passedProps;
      const webAuthToken = localStorage.getItem("webAuthToken");
      const webAuthId = localStorage.getItem("webAuthId");
      const webAuthRole = localStorage.getItem("webAuthRole");
      const { user } = auth;
      if (user.length < 1) {
        if (webAuthToken && webAuthId && webAuthRole) {
          checkAuthStatus(webAuthToken, webAuthId, locale).then(() => {
            getUserProfile(webAuthToken, webAuthId, webAuthRole).then(
              profile => {
                if (profile.payload.role === "seller") {
                  // getSellerActivePlans(profile.payload.id);
                }
                if (profile.payload.role === type) {
                  return true;
                }
                history.push("/login");
                return false;
              }
            );
          });
        } else {
          history.push("/login");
        }
      } else {
        if (user.role === type) {
          getUserProfile(webAuthToken, user.id, user.role).then(profile => {
            if (profile.payload.role === "seller") {
              // getSellerActivePlans(profile.payload.id);
            }
            if (profile.payload.role === type) {
              return true;
            }
            history.push("/login");
            return false;
          });
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
    getUserProfile: (token, id, role) =>
      dispatch(a.getUserProfile(token, id, role)),
    getSellerActivePlans: seller => dispatch(a.getSellerActivePlans(seller)),
    showNotification: (title, message, fail, action) =>
      dispatch(a.showNotification(title, message, fail, action)),
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
    notifications: state.notifications,
    cartProductTotal: state.cart.cartProductTotal
  });
  const mergeProps = (state, actions, ownProps) => ({
    ...state,
    ...actions,
    ...ownProps,
    logout: () => {
      localStorage.removeItem("webAuthId");
      localStorage.removeItem("webAuthToken");
      localStorage.removeItem("webAuthRole");
      actions.logout();
    }
  });
  return connect(mapStateToProps, mapDispatchToProps, mergeProps)(
    WrapperComponent
  );
}
