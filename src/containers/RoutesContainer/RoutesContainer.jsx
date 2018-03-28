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
    {appRoutes.map(prop => {
      if (prop.header && !prop.secure)
        return (
          <Route
            exact
            path={prop.path}
            component={isNotAuthenticated(
              prop.component,
              objectAssignProps(passingProps, prop.header)
            )}
            key={prop.name}
          />
        );
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={prop.name} />;
      if (prop.secure) {
        if (prop.header)
          return (
            <Route
              exact
              path={prop.path}
              component={isAuthenticated(
                prop.component,
                objectAssignProps(passingProps, {
                  ...prop.header,
                  type: prop.type
                })
              )}
              key={prop.name}
            />
          );
        return (
          <Route
            exact
            path={prop.path}
            component={isAuthenticated(prop.component, passingProps)}
            key={prop.name}
          />
        );
      }
      return (
        <Route
          exact
          path={prop.path}
          component={isNotAuthenticated(prop.component, passingProps)}
          key={prop.name}
        />
      );
    })}
  </Switch>
);
export default RoutesContainer;
