import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import appRoutes from "../../routes/index";
import isAuthenticated from "../../hoc/AuthHoc";
import isNotAuthenticated from "../../hoc/PublicHoc";

const objectAssignProps = (prevProps, newProps) =>
  Object.assign({}, prevProps, {
    ...newProps
  });
const RoutesContainer = passingProps => (
  <Switch>
    {appRoutes.map((prop, key) => {
      if (prop.hasOwnProperty("header"))
        return (
          <Route
            exact
            path={prop.path}
            component={isNotAuthenticated(
              prop.component,
              objectAssignProps(passingProps, prop.header)
            )}
            key={key}
          />
        );
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      if (prop.authRequired)
        return (
          <Route
            exact
            path={prop.path}
            component={isAuthenticated(prop.component, passingProps)}
            key={key}
          />
        );
      return (
        <Route
          exact
          path={prop.path}
          component={isNotAuthenticated(prop.component, passingProps)}
          key={key}
        />
      );
    })}
  </Switch>
);
export default RoutesContainer;
