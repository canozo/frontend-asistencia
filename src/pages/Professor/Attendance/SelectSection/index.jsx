import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { open } from '../../../../redux/modules/attendance';
import config from '../../../../config';

async function apiEnrolled(token, signal) {
  const data = await fetch(`${config.server}/api/professor/enrolled`, {
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

const SelectSection = ({ dispatch, token }) => {
  const [enrolled, setEnrolled] = useState([]);
  const [selected, setSelected] = useState(null);
  const [alert, setAlert] = useState(null);
  const [alertTimer, setAlertTimer] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    apiEnrolled(token, ac.signal)
      .then(res => setEnrolled(res.data))
      .catch(err => console.log(err));
    return () => ac.abort();
  }, []);

  const resetAlert = () => {
    if (alertTimer) {
      clearTimeout(alertTimer);
    }

    setAlertTimer(setTimeout(() => {
      setAlert(null);
    }, 5000));
  };

  const submit = async () => {
    if (!selected) {
      setAlert('Seleccione una sección de la lista');
      return resetAlert();
    }
    try {
      await dispatch(open(selected));
      clearTimeout(alertTimer);
    }
    catch (err) {
      setAlert(err.message);
      resetAlert();
    }
  };

  return (
    <div className="container-fluid fade-in">
      <h3 className="mb-4">
        Abrir asistencia
        <br />
        <small className="text-muted">Seleccione una sección</small>
      </h3>

      {/* Open atendance error */}
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
            <th>#</th>
            <th>Código</th>
            <th>Asignatura</th>
            <th>Hora</th>
            <th>Aula</th>
            <th>Días</th>
          </tr>
        </thead>
        <tbody>
          {enrolled.map(section => (
            <tr
              className={`pointer ${selected === section.idSection ? 'selected' : ''}`}
              key={section.idSection}
              onClick={() => setSelected(section.idSection)}
            >
              <td>{section.idSection}</td>
              <td>{section.classCode}</td>
              <td>{section.class}</td>
              <td>{section.startTime} - {section.finishTime}</td>
              <td>{section.classroom}/{section.building}</td>
              <td>{section.days}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="row">
        <div className="col-lg-2 offset-lg-10">
          <Button onClick={submit} variant="primary" block>
            Arbir asistencia
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(SelectSection);
