import { HttpMethod } from '@/typings/types';

export const HOST = 'http://localhost:5000';

export const API_AUTHORITY = 'http://localhost:61598';

export const API_ORIGIN = 'http://localhost:61598';

/**
 * [put] create
 *
 * [delete] delete
 */
export const API_V1_USER = `${API_ORIGIN}/api/v1/user`;

/**
 * [post] login
 */
export const API_V1_USER_LOGIN = `${API_V1_USER}/login`;

/**
 * [post] logout
 */
export const API_V1_USER_LOGOUT = `${API_V1_USER}/logout`;

/**
 * [get] get all polls
 *
 * [put] create poll
 *
 * [post] update poll by id
 *
 * [delete] `url/{pollId}` delete poll by id
 */
export const API_V1_POLLS = `${API_ORIGIN}/api/v1/poll`;

/**
 * [get] `url/{pollId}` get poll by id
 */
export const API_V1_POLL_BY_ID = `${API_V1_POLLS}/p`;

/**
 * [get] get all polls by current user
 */
export const API_V1_POLLS_BY_USER = `${API_V1_POLLS}/u`;

/**
 * [post] `url/{pollId}` get poll answers by id
 *
 * [put] `url/{pollId}` answer a poll by id
 */
export const API_V1_ANSWER = `${API_V1_POLLS}/answer`;

interface UrlControl {
  methods: Array<HttpMethod>
  matchers: Array<string>
}

/**
 * Conditions to add Authorization header
 */
export const AUTHORIZATION_ALLOWED_URLS: Array<UrlControl> = [
  {
    methods: [
      'POST',
      'PUT',
      'DELETE',
    ],
    matchers: [API_ORIGIN],
  }
];

/**
 * Conditions to include credentials
 */
export const CREDENTIAL_ALLOWED_URLS: Array<UrlControl> = [
  {
    methods: [
      'POST',
      'PUT',
      'DELETE',
    ],
    matchers: [API_ORIGIN],
  }
];
