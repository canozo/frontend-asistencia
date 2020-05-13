import config from '../../config';

const ON_CHANGE = 'asistencia-web/attendance/ON_CHANGE';
const MARK = 'asistencia-web/attendance/MARK';
const UNMARK = 'asistencia-web/attendance/UNMARK';
const OPEN = 'asistencia-web/attendance/OPEN';
const CLOSE = 'asistencia-web/attendance/CLOSE';

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
    case MARK:
      return {
        ...state,
        students: state.students.map(student => {
          if (student.idStudent === action.payload.idStudent) {
            return { ...student, idMarkedBy: action.payload.idMarkedBy };
          }
          return student;
        }),
      };

    case UNMARK:
      return {
        ...state,
        students: state.students.map(student => {
          if (student.idStudent === action.payload.idStudent) {
            return { ...student, idMarkedBy: null };
          }
          return student;
        }),
      };

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

async function apiNew(token, idSection) {
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

async function apiClose(token, idAttendanceLog) {
  const data = await fetch(`${config.server}/api/attendance/${idAttendanceLog}`, {
    method: 'put',
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

async function apiGet(token, idAttendanceLog, signal) {
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

async function apiInfo(token, signal) {
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

async function apiMark(token, idAttendanceLog, idStudent) {
  const data = await fetch(`${config.server}/api/attendance/${idAttendanceLog}/mark/${idStudent}`, {
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

async function apiUnmark(token, idAttendanceLog, idStudent) {
  const data = await fetch(`${config.server}/api/attendance/${idAttendanceLog}/mark/${idStudent}`, {
    method: 'delete',
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
    await apiNew(token, idSection);
    const res = await apiInfo(token);
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
    const res = await apiInfo(token, signal);
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
    const res = await apiGet(token, id, signal);
    return dispatch({ type: ON_CHANGE, payload: { students: res.data } });
  };
}

export function closeRequest(id) {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await apiClose(token, id);
    return dispatch({ type: CLOSE });
  };
}

export function mark(idStudent) {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.auth.token;
    const idAttendanceLog = state.attendance.idAttendanceLog;
    await apiMark(token, idAttendanceLog, idStudent);
    const idMarkedBy = state.auth.idUser;
    return dispatch({ type: MARK, payload: { idStudent, idMarkedBy } });
  };
}

export function unmark(idStudent) {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.auth.token;
    const idAttendanceLog = state.attendance.idAttendanceLog;
    await apiUnmark(token, idAttendanceLog, idStudent);
    return dispatch({ type: UNMARK, payload: { idStudent } });
  };
}

export function close() {
  return { type: CLOSE };
}

export function onChange(payload) {
  return { type: ON_CHANGE, payload };
}
