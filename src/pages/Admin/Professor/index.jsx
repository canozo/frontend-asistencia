import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import TextField from '../../../components/TextField';
import TimedAlert from '../../../components/TimedAlert';
import config from '../../../config';
import api from '../../../request';

const Professor = ({ token }) => {
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState(null);
  const [idDelete, setIdDelete] = useState(0);
  const [names, setNames] = useState('');
  const [surnames, setSurnames] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const ac = new AbortController();
    api('/professor', 'get', undefined, token, ac.signal)
      .then(res => setList(res.data))
      .catch(err => console.log(err));
    return () => ac.abort();
  }, []);

  const remove = async id => {
    if (idDelete) {
      // confirmed
      try {
        await api(`/user/${idDelete}`, 'delete', undefined, token);
        setList(list.filter(item => item.idUser !== idDelete));
        setAlert('success');
      } catch (err) {
        setAlert(err.message);
      }
      setIdDelete(0);
    } else {
      setIdDelete(id);
    }
  };

  const submit = async event => {
    event.preventDefault();
    try {
      const payload = {
        names,
        surnames,
        email: `${email}@unitec.edu`,
        password,
      };
      const res = await api('/professor', 'post', payload, token);
      setList([...list, {
        idUser: res.id,
        names,
        surnames,
        email: `${email}@unitec.edu`,
      }]);

      setAlert('success');
      setNames('');
      setSurnames('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setAlert(err.message);
    }
  };

  return (
    <div className="container-fluid fade-in">
      <TimedAlert
        className="mb-4"
        type={alert}
        reset={() => setAlert(null)}
        success="Operación realizada con éxito!"
      />
      <h3 className="mb-4">
        Profesores
        <br />
        <small className="text-muted">Modificar datos de profesores</small>
      </h3>

      <Form onSubmit={submit}>
        <div className="row">
          <div className="col-lg-6">
            {/* Names */}
            <TextField
              id="professor-names"
              type="text"
              label="Nombres"
              required
              value={names}
              onChange={e => setNames(e.target.value)}
            />
          </div>
          <div className="col-lg-6">
            {/* Surnames */}
            <TextField
              id="professor-surnames"
              type="text"
              label="Apellidos"
              required
              value={surnames}
              onChange={e => setSurnames(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            {/* Email */}
            <Form.Group controlId="professor-email">
              <Form.Label>Correo</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  required
                  pattern={config.regex.username.source}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <InputGroup.Append>
                  <InputGroup.Text id="professor-group-email">@unitec.edu</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </div>
          <div className="col-lg-6">
            {/* Password */}
            <TextField
              id="professor-password"
              type="password"
              label="Contraseña"
              required
              pattern={config.regex.password.source}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm">
            <Button type="submit" variant="primary" className="my-3" block>
              Registrar profesor
            </Button>
          </div>
        </div>
      </Form>

      <Table className="mt-5" striped bordered hover>
        <thead>
          <tr>
            <th>Acciones</th>
            <th>#</th>
            <th>Profesor</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {list.map(item => (
            <tr key={item.idUser}>
              <td className="action-short">
                <Button
                  className="mx-1"
                  variant="danger"
                  size="sm"
                  onClick={() => remove(item.idUser)}
                >
                  Eliminar
                </Button>
              </td>
              <td>{item.idUser}</td>
              <td>{item.names} {item.surnames}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal delete item */}
      <Modal
        show={idDelete ? true : false}
        onHide={() => setIdDelete(0)}
        aria-labelledby="modal-professor"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal-professor">
            Confirmación eliminar profesor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás segur@ de que deseas eliminar al profesor? Una vez eliminado, no podrá ser recuperado.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIdDelete(0)}>
            Volver
          </Button>
          <Button variant="danger" onClick={() => remove(idDelete)}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({ token: state.auth.token });

export default connect(mapStateToProps)(Professor);
