import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import config from '../../config';

async function apiSections(token) {
  const data = await fetch(`${config.server}/api/section`, {
    method: 'get',
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

const Sections = ({ token }) => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    apiSections(token)
      .then(res => setSections(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container-fluid fade-in">
      <h3 className="mb-4">
        Secciones presenciales
        <br />
        <small className="text-muted">Todas las secciones disponibles</small>
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
          {sections.map(section => (
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

export default connect(mapStateToProps)(Sections);
