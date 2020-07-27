import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import TimedAlert from '../../../components/TimedAlert';
import config from '../../../config';
import api from '../../../request';

const server = `${config.server}/api/student/upload`;

async function apiUpload(token, formData) {
  const data = await fetch(server, {
    method: 'post',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const res = await data.json();
  if (res.status === 'error') {
    throw new Error(res.msg);
  }
  return res;
}

const Upload = ({ token }) => {
  const [faces, setFaces] = useState([]);
  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    api('/student/faces', 'get', undefined, token, ac.signal)
      .then(res => setFaces(res.data))
      .catch(err => console.log(err));
    return () => ac.abort();
  }, []);

  const fileChange = e => {
    console.log('[DEBUG] Archivos: ', e.target.files);
    const nextSib = e.target.nextElementSibling;
    nextSib.innerText = e.target.files[0].name;
    setFile(e.target.files[0]);
  };

  const submit = async event => {
    event.preventDefault();
    if (file !== null) {
      const form = document.getElementById('upload-form');
      const data = new FormData(form);

      try {
        const some = await apiUpload(token, data);
        console.log('[DEBUG] Respuesta: ', some);
        setAlert('success');
        setTimeout(() => {
          api('/student/faces', 'get', undefined, token)
            .then(res => setFaces(res.data))
            .catch(err => console.log(err));
        }, 3000);
      }
      catch (err) {
        setAlert(err.message);
      }
    }
  };

  return (
    <div className="container-fluid fade-in">
      <h3 className="mb-5">
        Cargar imagen de rostro
        <br />
        <small className="text-muted">
          Para ser reconocido por la cámara, sube una foto clara de tu rostro.
          <br />
          Asegúrate de ser el único en la imagen.
        </small>
      </h3>

      <div className="row">
        <div className="col-lg-6 mb-5">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Identificador de rostro</th>
              </tr>
            </thead>
            <tbody>
              {faces.map((face, index) => (
                <tr key={face}>
                  <td>{index + 1}</td>
                  <td>{face}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="col-lg-6">
          <form
            id="upload-form"
            onSubmit={submit}
            action={server}
            method="post"
            encType="multipart/form-data"
          >
            {/* Input */}
            <div className="form-group">
              <label htmlFor="file-input">Subir imagen de rostro</label>
              <div className="custom-file">
                <input
                  type="file"
                  onChange={fileChange}
                  name="face"
                  accept="image/jpeg,image/png"
                  id="file-input"
                  className="custom-file-input form-control"
                />
                <label className="custom-file-label" htmlFor="file-input" data-browse="Elegir">
                  Archivo
                </label>
              </div>
            </div>


            {/* Upload error */}
            <TimedAlert type={alert} reset={() => setAlert(null)} success="Se cargó su imagen!" />

            {/* Submit */}
            <Button type="submit" variant="primary" className="mt-1" block>
              Guardar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(Upload);
