import React from "react";
import { Switch } from "react-router";
import { Route, Redirect } from "react-router-dom";

const renderRoutes = (
  routes: any,
  authed: any,
  authPath: any,
  extraProps = {},
  switchProps = {}
) => {

  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route: any, i: any) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={(props:any) => {
            if (!route.restricted || authed || route.path === authPath) {
              return (
                <route.component {...props} {...extraProps} route={route} />
              );
            }
            const redirPath = authPath ? authPath : "/login";
            return (
              <Redirect
                to={{
                  pathname: redirPath,
                  state: { from: props.location },
                }}
              />
            );
          }}
        />
      ))}
      <Redirect to={authed ? '/' : '/login'} />
    </Switch>
  ) : null;
};

export default renderRoutes;
