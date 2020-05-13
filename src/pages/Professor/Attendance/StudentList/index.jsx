import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { getAttendance, close } from '../../../../redux/modules/attendance';

const StudentList = ({ dispatch, open, idUser, idSection, classCode, className, students }) => {
  const { idAttendanceLog } = useParams();

  useEffect(() => {
    const ac = new AbortController();
    dispatch(getAttendance(idAttendanceLog, ac.signal))
      .catch(() => dispatch(close()));
    return () => ac.abort();
  }, []);

  if (!open) {
    return <Redirect to="/" />;
  }

  // botones:
  // actualizar
  // cerrar

  // info students:
  // idStudent
  // student
  // accountNumber
  // idMarkedBy
  // markedAt

  const markStudent = idStudent => {
    console.log('Marked', idStudent);
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

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Acciones</th>
            <th>Cuenta</th>
            <th>Estudiante</th>
            <th>Marcado</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr
              className="pointer"
              key={student.idStudent}
              onClick={() => markStudent(student.idStudent)}
            >
              <td>#</td>
              <td>{student.accountNumber}</td>
              <td>{student.student}</td>
              <td>
                {student.idMarkedBy ? (
                  student.idMarkedBy === idUser ? 'Si' : 'Si, cámara'
                ) : 'No'}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const mapStateToProps = state => ({
  open: state.attendance.open,
  idUser: state.auth.idUser,
  idSection: state.attendance.idSection,
  classCode: state.attendance.classCode,
  className: state.attendance.className,
  students: state.attendance.students,
});

export default connect(mapStateToProps)(StudentList);
