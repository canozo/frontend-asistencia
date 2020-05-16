import config from '../../config';
import api from '../../request';

const LOGIN = 'asitencia-web/auth/LOGIN';
const LOGOUT = 'asitencia-web/auth/LOGOUT';
const UPDATE = 'asitencia-web/auth/UPDATE';

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

export function login(email, password) {
  return async dispatch => {
    const res = await api('/auth/login', 'post', { email, password });
    const payload = {
      token: res.token,
      idUser: res.user.idUser,
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
    const res = await api('/auth/register', 'post', payload);
    const loginData = {
      token: res.token,
      idUser: res.user.idUser,
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
    const state = getState();
    const token = state.auth.token;
    const iat = state.auth.iat;
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
    await api('/user', 'put', payload, token);
    return dispatch({ type: UPDATE, payload });
  };
}

export function updatePassword(password) {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    return await api('/user/pw', 'put', { password }, token);
  };
}

export function logout() {
  return { type: LOGOUT };
}
