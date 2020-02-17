import { RedirectProps, RouteProps } from "react-router";

type CustomRouteType = {
  path?: string,
  redirect?: boolean,
  auth?: boolean
}
export type RouteArrayType = Array<(Omit<RouteProps, "path"> | Omit<RedirectProps, "path">) & CustomRouteType>