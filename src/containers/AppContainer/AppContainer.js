import React from "react";
import { connect } from "react-redux";
import { withTranslate, IntlActions } from "react-redux-multilingual";
import RouteContainer from "../RoutesContainer/RoutesContainer";

const AppContainer = props => <RouteContainer {...props} />;

const mapDispatchToProps = dispatch => ({
  setLocale: lang => dispatch(IntlActions.setLocale(lang))
});
const mapStateToProps = state => ({
  ...state.Intl
});

const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps
});
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  withTranslate(AppContainer)
);
