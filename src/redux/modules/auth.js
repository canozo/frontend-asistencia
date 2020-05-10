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

async function apiVerify(token) {
  const data = await fetch(`${config.server}/api/auth/verify`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const res = await data.json();
  if (res.status === 'error') {
    throw new Error(res.msg);
  }
  return res;
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
    const payload = {
      token: res.token,
      userType: res.user.userType,
      names: res.user.names,
      surnames: res.user.surnames,
      email: res.user.email,
      accountNumber: res.user.accountNumber,
    };
    return dispatch({ type: LOGIN, payload });
  };
}

export function signup() {
  return async (dispatch, getState) => {
    const { signup } = getState();
    const payload = { ...signup, email: `${signup.email}@unitec.edu` };
    const res = await apiSignup(payload);
    const loginData = {
      token: res.token,
      userType: res.user.userType,
      names: res.user.names,
      surnames: res.user.surnames,
      email: res.user.email,
      accountNumber: res.user.accountNumber,
    };
    return dispatch({ type: LOGIN, payload: { ...loginData } });
  };
}

export function verify() {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      await apiVerify(token);
    }
    catch (err) {
      return dispatch({ type: LOGOUT });
    }
  };
}

export function logout() {
  return { type: LOGOUT };
}
