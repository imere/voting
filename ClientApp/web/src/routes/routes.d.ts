import { RedirectProps, RouteProps } from "react-router";
import { LocationDescriptor } from "history";

type CustomRouteType = {
  auth?: boolean
  path?: string,
  redirect?: boolean,
  to?: LocationDescriptor<any>
}
declare type RouteArrayType = Array<(Omit<RouteProps, "path"> | Omit<RedirectProps, "path" | "to">) & CustomRouteType>
