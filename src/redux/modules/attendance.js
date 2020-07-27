import config from '../../config';
import api from '../../request';

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
            return { ...student, idMarkedBy: null, captureKey: null, src: null };
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

async function get(route, token, signal) {
  const data = await fetch(`${config.server}/api${route}`, {
    method: 'get',
    signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const res = await data.arrayBuffer();

  // to base64
  let binary = '';
  const bytes = new Uint8Array(res);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return 'data:image/jpeg;base64,' + window.btoa(binary);
}

export function open(idSection) {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await api('/attendance', 'post', { idSection }, token);
    const res = await api('/attendance', 'get', undefined, token);
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
    const res = await api('/attendance', 'get', undefined, token, signal);
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
    const res = await api(`/attendance/${id}`, 'get', undefined, token, signal);
    const mapped = res.data.map(async item => {
      if (!item.captureKey) {
        return item;
      }
      const img = await get(`/camera/capture/${item.captureKey}`, token, signal);
      return { ...item, src: img };
    });
    const data = await Promise.all(mapped);
    return dispatch({ type: ON_CHANGE, payload: { students: data } });
  };
}

export function closeRequest(id) {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await api(`/attendance/${id}`, 'put', undefined, token);
    return dispatch({ type: CLOSE });
  };
}

export function mark(idStudent) {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.auth.token;
    const id = state.attendance.idAttendanceLog;
    await api( `/attendance/${id}/mark/${idStudent}`, 'post', undefined, token);
    const idMarkedBy = state.auth.idUser;
    return dispatch({ type: MARK, payload: { idStudent, idMarkedBy } });
  };
}

export function unmark(idStudent) {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.auth.token;
    const id = state.attendance.idAttendanceLog;
    await api(`/attendance/${id}/mark/${idStudent}`, 'delete', undefined, token);
    return dispatch({ type: UNMARK, payload: { idStudent } });
  };
}

export function close() {
  return { type: CLOSE };
}

export function onChange(payload) {
  return { type: ON_CHANGE, payload };
}
