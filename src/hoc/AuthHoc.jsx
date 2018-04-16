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
      const { checkAuthStatus, getUserProfile, auth, history } = this.props;
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
              return true;
            });
          });
        } else {
          history.push("/login");
        }
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
    logout: () => dispatch(a.logout()),
    checkAuthStatus: (token, id, locale) =>
      dispatch(a.checkAuthStatus(token, id, locale)),
    getUserProfile: (token, id) => dispatch(a.getUserProfile(token, id))
  });
  const mapStateToProps = state => ({
    auth: state.auth
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
