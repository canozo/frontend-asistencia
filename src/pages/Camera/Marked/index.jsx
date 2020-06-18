import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import config from '../../../config';
import api from '../../../request';

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

const Marked = ({ token }) => {
  const [marked, setMarked] = useState([]);

  useEffect(() => {
    const ac = new AbortController();
    async function job() {
      try {
        const res = await api('/camera/marked', 'get', undefined, token, ac.signal);
        const mapped = res.data.map(async (item) => {
          const img = await get(`/camera/capture/${item.captureKey}`, token, ac.signal);
          return { ...item, src: img };
        });
        const data = await Promise.all(mapped);
        setMarked(data);
      } catch (err) {
        console.log(err);
      }
    }

    job();
    return () => ac.abort();
  }, []);

  return (
    <div className="container-fluid fade-in">
      <h3 className="mb-4">
        Historial de marcados
        <br />
        <small className="text-muted">Estudiantes marcados por esta cámara</small>
      </h3>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Clase</th>
            <th>Estudiante</th>
            <th>Número de cuenta</th>
            <th>Hora marcado</th>
            <th>Captura</th>
          </tr>
        </thead>
        <tbody>
          {marked.map(item => (
            <tr key={`${item.idLog}-${item.idStudent}`}>
              <td>{item.classCode} - {item.className}</td>
              <td>{item.student}</td>
              <td>{item.accountNumber}</td>
              <td>{new Date(item.markedAt).toLocaleString()}</td>
              <td><img style={{ height: '64px', width: '64px' }} src={item.src} /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const mapStateToProps = state => ({ token: state.auth.token });

export default connect(mapStateToProps)(Marked);
