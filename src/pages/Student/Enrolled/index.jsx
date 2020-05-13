import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import config from '../../../config';

async function apiEnrolled(token, signal) {
  const data = await fetch(`${config.server}/api/student/enrolled`, {
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

const Enrolled = ({ token }) => {
  const [enrolled, setEnrolled] = useState([]);

  useEffect(() => {
    const ac = new AbortController();
    apiEnrolled(token, ac.signal)
      .then(res => setEnrolled(res.data))
      .catch(err => console.log(err));
    return () => ac.abort();
  }, []);

  return (
    <div className="container-fluid fade-in">
      <h3 className="mb-4">
        Secciones matriculadas
        <br />
        <small className="text-muted">Secciones en las que aparaces como estudiante</small>
      </h3>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Código</th>
            <th>Asignatura</th>
            <th>Hora</th>
            <th>Aula</th>
            <th>Días</th>
            <th>Catedrático</th>
          </tr>
        </thead>
        <tbody>
          {enrolled.map(section => (
            <tr key={section.idSection}>
              <td>{section.idSection}</td>
              <td>{section.classCode}</td>
              <td>{section.class}</td>
              <td>{section.startTime} - {section.finishTime}</td>
              <td>{section.classroom}/{section.building}</td>
              <td>{section.days}</td>
              <td>{section.professor}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(Enrolled);
