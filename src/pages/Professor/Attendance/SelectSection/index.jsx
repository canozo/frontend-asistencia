import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { open } from '../../../../redux/modules/attendance';
import TimedAlert from '../../../../components/TimedAlert';
import api from '../../../../request';

const SelectSection = ({ dispatch, token }) => {
  const [enrolled, setEnrolled] = useState([]);
  const [selected, setSelected] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    api('/professor/enrolled', 'get', undefined, token, ac.signal)
      .then(res => setEnrolled(res.data))
      .catch(err => console.log(err));
    return () => ac.abort();
  }, []);

  const submit = async () => {
    if (!selected) {
      return setAlert('Seleccione una sección de la lista');
    }
    try {
      await dispatch(open(selected));
    }
    catch (err) {
      setAlert(err.message);
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
      <TimedAlert type={alert} reset={() => setAlert(null)} />

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
            Abrir asistencia
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
