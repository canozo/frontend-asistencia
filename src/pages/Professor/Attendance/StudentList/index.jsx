import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
  getAttendance,
  mark,
  unmark,
  closeRequest,
  close,
} from '../../../../redux/modules/attendance';

const StudentList = ({ dispatch, open, idUser, idSection, classCode, className, students }) => {
  const { idAttendanceLog } = useParams();
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    dispatch(getAttendance(idAttendanceLog, ac.signal))
      .catch(() => dispatch(close()));
    return () => ac.abort();
  }, []);

  if (!open) {
    return <Redirect to="/" />;
  }

  const markStudent = async idStudent => {
    try {
      await dispatch(mark(idStudent));
    }
    catch (err) {
      setAlert(err.message);
    }
  };

  const unmarkStudent = async idStudent => {
    try {
      await dispatch(unmark(idStudent));
    }
    catch (err) {
      setAlert(err.message);
    }
  };

  const updateList = async () => {
    try {
      await dispatch(getAttendance(idAttendanceLog));
    }
    catch (err) {
      setAlert(err.message);
    }
  };

  const exit = async () => {
    try {
      await dispatch(closeRequest(idAttendanceLog));
    }
    catch (err) {
      setAlert(err.message);
    }
  };

  return (
    <div className="container-fluid fade-in">
      <h3 className="mb-4">
        Asistencia de sección #{idSection}
        <br />
        <small className="text-muted">
          {classCode} - {className}
        </small>
      </h3>

      <Alert
        className="fade-in"
        show={alert !== null && alert !== 'success'}
        variant="danger"
      >
        {alert}
      </Alert>

      <div className="row">
        <div className="col-lg-10">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Acciones</th>
                <th>Cuenta</th>
                <th>Estudiante</th>
                <th>Marcado</th>
                <th>Captura</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.idStudent}>
                  <td className="action-long">
                    <ToggleButtonGroup
                      name="radio-present"
                      className="w-100"
                      size="sm"
                      value={student.idMarkedBy ? 1 : 0}
                    >
                      <ToggleButton
                        value={1}
                        variant={`${!student.idMarkedBy ? 'outline-' : ''}primary`}
                        onChange={() => markStudent(student.idStudent)}
                      >
                        Presente
                      </ToggleButton>
                      <ToggleButton
                        value={0}
                        variant={`${student.idMarkedBy ? 'outline-' : ''}danger`}
                        onChange={() => unmarkStudent(student.idStudent)}
                      >
                        Ausente
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </td>
                  <td>{student.accountNumber}</td>
                  <td>{student.student}</td>
                  <td>
                    {student.idMarkedBy ? (
                      student.idMarkedBy === idUser ? 'Si, por docente' : 'Si, por cámara'
                    ) : 'No'}
                  </td>
                  <td>
                    {student.captureKey ? (
                      <img style={{ height: '64px', width: '64px' }} src={student.src} />
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="col-lg-2 mt-2">
          <Button variant="primary" block onClick={updateList}>
            Actualizar
          </Button>
          <Button variant="secondary" block onClick={() => setModal(true)}>
            Cerrar asistencia
          </Button>
        </div>
      </div>

      <Modal
        show={modal}
        onHide={() => setModal(false)}
        aria-labelledby="modal-close-attendance"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal-close-attendance">
            Confirmación cerrar asistencia
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás segur@ de que deseas cerrar la asistencia? Una vez cerrada, no podrás seguir marcando a los estudiantes.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModal(false)}>
            Volver
          </Button>
          <Button variant="danger" onClick={exit}>
            Cerrar asistencia
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  idUser: state.auth.idUser,
  open: state.attendance.open,
  idSection: state.attendance.idSection,
  classCode: state.attendance.classCode,
  className: state.attendance.className,
  students: state.attendance.students,
});

export default connect(mapStateToProps)(StudentList);
