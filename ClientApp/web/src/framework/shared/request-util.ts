import { UserAuthentication } from '@/store/actions/action-auth';
import { Answer, Questionnaire } from '@/components/Questionnaire/questionnaire';
import { Http } from '@/framework/shared';
import {
  API_V1_ANSWER,
  API_V1_POLL_BY_ID,
  API_V1_POLLS,
  API_V1_POLLS_BY_USER,
  API_V1_USER,
  API_V1_USER_LOGIN,
  API_V1_USER_LOGOUT,
} from '@/framework/shared/api/questionnaire';

// API_V1_USER
export function createUser(user: UserAuthentication) {
  return Http(API_V1_USER, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).
    then((res) => {
      if (res.status >= 400) {
        throw res;
      }
    });
}

export function deleteUser() {
  return Http(API_V1_USER, {
    method: 'DELETE',
  });
}


// API_V1_USER_LOGIN
export function loginUser(user: UserAuthentication) {
  return Http(API_V1_USER_LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).
    then((res) => {
      if (res.status >= 400) {
        throw res;
      }
    });
}


// API_V1_USER_LOGOUT
export function logoutUser() {
  return Http(API_V1_USER_LOGOUT, {
    method: 'POST',
  }).catch(() => {
    // noop
  });
}


// API_V1_POLLS
export async function createPoll(poll: Questionnaire) {
  return Http(API_V1_POLLS, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(poll),
  });
}

export async function updatePoll(poll: Questionnaire) {
  return Http(API_V1_POLLS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(poll),
  });
}

export async function deletePollById(id: string | number) {
  return Http(`${API_V1_POLLS}/${id}`, {
    method: 'DELETE',
  });
}

export async function getAllPolls() {
  return Http(API_V1_POLLS);
}


// API_V1_POLLS_BY_USER
export async function getAllPollsByCurrentUser() {
  return Http(API_V1_POLLS_BY_USER);
}


// API_V1_POLL_BY_ID
export async function getPollByPollId(id: string | number) {
  return Http(`${API_V1_POLL_BY_ID}/${id}`);
}


// API_V1_ANSWER
export async function getAnswersByPollId(id: string | number) {
  return Http(`${API_V1_ANSWER}/${id}`, {
    method: 'POST',
  });
}

export async function createAnswerByPollId(id: string | number, answer: Answer[]) {
  return Http(`${API_V1_ANSWER}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(answer),
  });
}
