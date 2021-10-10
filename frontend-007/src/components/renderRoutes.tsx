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
  console.log('routes ',routes,authPath)

  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route: any, i: any) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={(props:any) => {
            console.log(route, "ROUTEE")
            if (!route.restricted || authed || route.path === authPath) {
              console.log("TESTNAAJAA")
              return (
                <route.component {...props} {...extraProps} route={route} />
              );
            }
            const redirPath = authPath ? authPath : "/login";
            console.log(redirPath , 'redirPath')
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
