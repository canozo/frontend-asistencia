import config from '../../config';

const LOGIN = 'salitec-web/auth/LOGIN';
const LOGOUT = 'salitec-web/auth/LOGOUT';
const UPDATE = 'salitec-web/auth/UPDATE';

const defaultState = {
  token: '',
  idUser: '',
  userType: '',
  names: '',
  surnames: '',
  email: '',
  accountNumber: '',
  logged: false,
  iat: 0,
};

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
      case LOGIN:
      const iat = Math.floor(Date.now() / 1000);
      return { ...action.payload, iat, logged: true };

    case LOGOUT:
      return { logged: false };

    case UPDATE:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

async function apiVerify(token, iat) {
  const now = Math.floor(Date.now() / 1000);
  if (now < iat + 5400) {
    return { status: 'success', msg: 'Token has not expired (local).' };
  }

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

async function apiUpdateProfile(token, payload) {
  const data = await fetch(`${config.server}/api/user`, {
    method: 'put',
    body: JSON.stringify(payload),
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

async function apiUpdatePassword(token, password) {
  const data = await fetch(`${config.server}/api/user/pw`, {
    method: 'put',
    body: JSON.stringify({ password }),
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

export function login(email, password) {
  return async dispatch => {
    const res = await apiLogin({ email, password });
    const payload = {
      token: res.token,
      idUser: res.idUser,
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
      idUser: res.idUser,
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
    const iat = getState().auth.iat;
    try {
      await apiVerify(token, iat);
    }
    catch (err) {
      return dispatch({ type: LOGOUT });
    }
  };
}

export function updateProfile(payload) {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await apiUpdateProfile(token, payload);
    return dispatch({ type: UPDATE, payload });
  };
}

export function updatePassword(password) {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    return await apiUpdatePassword(token, password);
  };
}

export function logout() {
  return { type: LOGOUT };
}
