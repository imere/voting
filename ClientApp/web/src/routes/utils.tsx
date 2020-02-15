import React from "react";
import { Redirect, Route } from "react-router";

export function renderRoutes(routes: any[]) {
  return routes.map((route: any, i: number) =>
    route.redirect
      ? <Redirect key={i} {...route} />
      : <Route key={i} {...route} />
  );
}
