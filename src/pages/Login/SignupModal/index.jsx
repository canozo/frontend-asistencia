import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { signup } from '../../../redux/modules/auth';
import { onChange } from '../../../redux/modules/signup';
import TextField from '../../../components/TextField';
import config from '../../../config';

const SignupModal = ({
  dispatch,
  show,
  onHide,
  names,
  surnames,
  email,
  password,
  accountNumber,
}) => {
  const [error, setError] = useState(false);

  const submit = event => {
    event.preventDefault();
    dispatch(signup())
      .catch(() => setError(true));
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="modal-register"
      centered
    >
      <Form onSubmit={submit}>
        <Modal.Header closeButton>
          <Modal.Title id="modal-register">
            Registrarse como estudiante
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Names */}
          <TextField
            id="signup-names"
            type="text"
            label="Nombres"
            required
            value={names}
            onChange={e => dispatch(onChange({ names: e.target.value }))}
          />

          {/* Surnames */}
          <TextField
            id="signup-surnames"
            type="text"
            label="Apellidos"
            required
            value={surnames}
            onChange={e => dispatch(onChange({ surnames: e.target.value }))}
          />

          {/* Email / Username */}
          <Form.Group controlId="signup-user">
            <Form.Label>Usuario</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                required
                pattern={config.regex.username.source}
                value={email}
                onChange={e => dispatch(onChange({ email: e.target.value }))}
              />
              <InputGroup.Append>
                <InputGroup.Text id="signup-group-email">@unitec.edu</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>

          {/* Account Number */}
          <TextField
            id="signup-account-num"
            type="text"
            label="Número de cuenta"
            pattern={config.regex.accountNum.source}
            required
            value={accountNumber}
            onChange={e => dispatch(onChange({ accountNumber: e.target.value }))}
          />

          {/* Password */}
          <TextField
            id="signup-password"
            type="password"
            label="Contraseña"
            pattern={config.regex.password.source}
            required
            value={password}
            onChange={e => dispatch(onChange({ password: e.target.value }))}
            tooltip="Al menos 6 caracteres, una mayúscula, un número y un caracter especial."
          />

          {/* Hidden submit */}
          <input type="submit" hidden />

          {/* Error */}
          <Alert variant="danger" className={`${error ? 'fade-in' : 'd-none'}`}>
            Error al registrarse.
          </Alert>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Volver
          </Button>
          <Button type="submit" variant="primary">
            Registrar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

SignupModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ ...state.signup });

export default connect(mapStateToProps)(SignupModal);
