import React from "react";
import { Options } from "@loadable/component";

import Fallback from "@/components/Fallback";

export const HOST = "http://localhost:5000";

export const API_ORIGIN = "http://localhost:61598";
export const API_V1_USER = `${API_ORIGIN}/api/v1/user`;
export const API_V1_POLL = `${API_ORIGIN}/api/v1/poll`;

export const ALLOWED_ORIGINS = [API_ORIGIN];


export const defaultLoadableOption: Options<any> = {
  fallback: <Fallback />
};
