import React from "react";
import { Redirect, Route } from "react-router";
import { LocationDescriptor } from "history";

import { RouteArrayType } from "./routes";

export function renderRoutes(routes: RouteArrayType) {
  return routes.map((route, i) =>
    route.redirect
      ? <Redirect key={i} to={route.to as LocationDescriptor<any>} {...route} />
      : <Route key={i} {...route} />
  );
}
