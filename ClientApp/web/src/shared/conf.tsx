import React from "react";
import { Options } from "@loadable/component";

import Fallback from "@/components/Fallback";

export const HOST = "http://localhost:5000";

export const API_ORIGIN = "http://localhost:61598";

/**
 * [put] create
 * [delete] delete
 */
export const API_V1_USER = `${API_ORIGIN}/api/v1/user`;

/**
 * [post]
 */
export const API_V1_USER_LOGIN = `${API_V1_USER}/login`;

/**
 * [post]
 */
export const API_V1_USER_LOGOUT = `${API_V1_USER}/logout`;

/**
 * [get] get all polls
 * [put] create
 * [post] update
 * [delete] delete
 */
export const API_V1_POLLS = `${API_ORIGIN}/api/v1/poll`;

/**
 * [get] `url/{pollId}`
 */
export const API_V1_POLL_BY_ID = `${API_ORIGIN}/api/v1/poll/p`;

/**
 * [get] get all polls by current user
 */
export const API_V1_POLLS_BY_USER = `${API_ORIGIN}/api/v1/poll/u`;

/**
 * [put] `url/{pollId}` answer a poll
 */
export const API_V1_ANSWER = `${API_ORIGIN}/api/v1/poll/answer`;

export const ALLOWED_ORIGINS = [API_ORIGIN];


export const defaultLoadableOption: Options<any> = {
  fallback: <Fallback />
};
