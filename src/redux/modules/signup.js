const ON_CHANGE = 'salitec-web/signup/ON_CHANGE';
const CLEAR = 'salitec-web/signup/CLEAR';

const defaultState = {
  names: '',
  surnames: '',
  email: '',
  password: '',
  accountNumber: '',
};

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case ON_CHANGE:
      return { ...state, ...action.payload };

    case CLEAR:
      return { names: '', surnames: '', email: '', password: '', accountNumber: '' };

    default:
      return state;
  }
}

export function onChange(payload) {
  return { type: ON_CHANGE, payload };
}

export function clear() {
  return { type: CLEAR };
}
