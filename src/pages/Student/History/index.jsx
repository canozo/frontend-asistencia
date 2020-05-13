import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import config from '../../../config';

async function apiHistory(token, signal) {
  const data = await fetch(`${config.server}/api/student/attendance`, {
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

const History = ({ token, accountNumber }) => {
  const [history, setHistory] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    apiHistory(token, ac.signal)
      .then(res => setHistory(res.data))
      .catch(err => console.log(err));
    return () => ac.abort();
  }, []);

  // idSection
  // idLog
  // idProfessor
  // idMarkedBy
  // markedAt
  // className
  // classCode

  return (
    <div className="container-fluid fade-in">
      <h3 className="mb-4">
        Historial de asistencia
        <br />
        <small className="text-muted">
          Estudiante con número de cuenta: {accountNumber}
        </small>
      </h3>

      <Alert
        className="fade-in"
        show={alert !== null && alert !== 'success'}
        variant="danger"
      >
        {alert}
      </Alert>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Estado</th>
            <th>Sección</th>
            <th>Clase</th>
            <th>Marcado por</th>
          </tr>
        </thead>
        <tbody>
          {history.map(his => (
            <tr key={`${accountNumber}-${his.idLog}`}>
              <td>
                <ToggleButtonGroup
                  name="radio-student-present"
                  className="w-100"
                  size="sm"
                  value={his.idMarkedBy ? 1 : 0}
                >
                  <ToggleButton
                    disabled
                    value={1}
                    variant={`${!his.idMarkedBy ? 'outline-' : ''}primary`}
                  >
                    Presente
                  </ToggleButton>
                  <ToggleButton
                    disabled
                    value={0}
                    variant={`${his.idMarkedBy ? 'outline-' : ''}danger`}
                  >
                    Ausente
                  </ToggleButton>
                </ToggleButtonGroup>
              </td>
              <td>{his.idSection}</td>
              <td>{his.classCode} - {his.className}</td>
              <td>
                {his.idMarkedBy ? (
                  his.idMarkedBy === his.idProfessor ? 'Profesor' : 'Cámara'
                ) : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const mapStateToProps = state => ({
  token: state.auth.token,
  accountNumber: state.auth.accountNumber,
});

export default connect(mapStateToProps)(History);
