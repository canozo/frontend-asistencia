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

const Student = ({ token }) => {
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState(null);
  const [idDelete, setIdDelete] = useState('');
  const [names, setNames] = useState('');
  const [surnames, setSurnames] = useState('');
  const [email, setEmail] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const ac = new AbortController();
    api('/student', 'get', undefined, token, ac.signal)
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
      setIdDelete('');
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
        accountNumber,
        password,
      };
      const res = await api('/student', 'post', payload, token);
      setList([...list, {
        idUser: res.id,
        names,
        surnames,
        email: `${email}@unitec.edu`,
        accountNumber,
      }]);

      setAlert('success');
      setNames('');
      setSurnames('');
      setEmail('');
      setAccountNumber('');
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
        Estudiantes
        <br />
        <small className="text-muted">Modificar datos de estudiantes</small>
      </h3>

      <Form onSubmit={submit}>
        <div className="row">
          <div className="col-lg-6">
            {/* Names */}
            <TextField
              id="student-names"
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
              id="student-surnames"
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
            <Form.Group controlId="student-email">
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
                  <InputGroup.Text id="student-group-email">@unitec.edu</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </div>
          <div className="col-lg-6">
            {/* Account Number */}
            <TextField
              id="student-acc-num"
              type="text"
              label="Número de cuenta"
              required
              pattern={config.regex.username.source}
              value={accountNumber}
              onChange={e => setAccountNumber(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            {/* Password */}
            <TextField
              id="student-password"
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
              Registrar estudiante
            </Button>
          </div>
        </div>
      </Form>

      <Table className="mt-5" striped bordered hover>
        <thead>
          <tr>
            <th>Acciones</th>
            <th>#</th>
            <th>Estudiante</th>
            <th>Correo</th>
            <th>Número de cuenta</th>
          </tr>
        </thead>
        <tbody>
          {list.map(item => (
            <tr key={item.idUser}>
              <td style={{ width: '92px' }}>
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
              <td>{item.accountNumber}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal delete item */}
      <Modal
        show={idDelete ? true : false}
        onHide={() => setIdDelete('')}
        aria-labelledby="modal-student"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal-student">
            Confirmación eliminar estudiante
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás segur@ de que deseas eliminar al estudiante? Una vez eliminado, no podrá ser recuperado.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIdDelete('')}>
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

export default connect(mapStateToProps)(Student);
