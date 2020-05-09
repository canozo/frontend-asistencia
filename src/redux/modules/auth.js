import config from '../../config';

const LOGIN = 'salitec-web/auth/LOGIN';
const LOGOUT = 'salitec-web/auth/LOGOUT';

const defaultState = {
  token: '',
  userType: '',
  names: '',
  surnames: '',
  email: '',
  accountNumber: '',
  logged: false,
};

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return { ...action.payload, logged: true };

    case LOGOUT:
      return { logged: false };

    default:
      return state;
  }
}

async function apiLogin(payload) {
  const data = await fetch(`${config.server}/api/auth/login`, {
    method: 'post',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const res = await data.json();
  if (res.status === 'error') {
    throw new Error(res.msg);
  }
  return res;
}

async function apiSignup(payload) {
  const data = await fetch(`${config.server}/api/auth/register`, {
    method: 'post',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const res = await data.json();
  if (res.status === 'error') {
    throw new Error(res.msg);
  }
  return res;
}

export function login(email, password) {
  return async dispatch => {
    const res = await apiLogin({ email, password });
    return dispatch({ type: LOGIN, payload: { token: res.token } });
  };
}

export function signup() {
  return async (dispatch, getState) => {
    const { signup } = getState();
    const payload = { ...signup, email: `${signup.email}@unitec.edu` };
    const res = await apiSignup(payload);
    return dispatch({ type: LOGIN, payload: { token: res.token } })
  };
}

export function logout() {
  return { type: LOGOUT };
}
