const LOGIN = 'salitec-web/auth/LOGIN';
const LOGOUT = 'salitec-web/auth/LOGOUT';

const defaultState = {
  token: '',
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

export function login() {
  return { type: LOGIN, payload: { token: 'xd' } };
}

export function logout() {
  return { type: LOGOUT };
}
