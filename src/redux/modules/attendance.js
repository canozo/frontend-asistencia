import config from '../../config';

const ON_CHANGE = 'salitec-web/attendance/ON_CHANGE';
const OPEN = 'salitec-web/attendance/OPEN';
const CLOSE = 'salitec-web/attendance/CLOSE';

const defaultState = {
  open: false,
  idAttendanceLog: '',
  idSection: '',
  classCode: '',
  className: '',
  students: [],
};

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case OPEN:
      return { ...state, ...action.payload, open: true };

    case CLOSE:
      return {
        open: false,
        idAttendanceLog: '',
        idSection: '',
        classCode: '',
        className: '',
        students: [],
      };

    case ON_CHANGE:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

async function apiNewAttendance(token, idSection) {
  const data = await fetch(`${config.server}/api/attendance`, {
    method: 'post',
    body: JSON.stringify({ idSection }),
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

async function apiGetAttendance(token, idAttendanceLog, signal) {
  const data = await fetch(`${config.server}/api/attendance/${idAttendanceLog}`, {
    method: 'get',
    signal,
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

async function apiAttendanceInfo(token, signal) {
  const data = await fetch(`${config.server}/api/attendance`, {
    method: 'get',
    signal,
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

export function open(idSection) {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await apiNewAttendance(token, idSection);
    const res = await apiAttendanceInfo(token);
    const payload = {
      idAttendanceLog: res.data.idAttendanceLog,
      idSection: res.data.idSection,
      className: res.data.className,
      classCode: res.data.classCode,
    };
    return dispatch({ type: OPEN, payload });
  };
}

export function isOpen(signal) {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const res = await apiAttendanceInfo(token, signal);
    if (res.data) {
      const payload = {
        idAttendanceLog: res.data.idAttendanceLog,
        idSection: res.data.idSection,
        className: res.data.className,
        classCode: res.data.classCode,
      };
      return dispatch({ type: OPEN, payload });
    }
  };
}

export function getAttendance(id, signal) {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const res = await apiGetAttendance(token, id, signal);
    return dispatch({ type: ON_CHANGE, payload: { students: res.data } });
  };
}

export function close() {
  return { type: CLOSE };
}

export function onChange(payload) {
  return { type: ON_CHANGE, payload };
}
