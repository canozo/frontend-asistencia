import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { clear } from '../../redux/modules/signup';
import { login } from '../../redux/modules/auth';
import TextField from '../../components/TextField';
import SignupModal from './SignupModal';
import './Login.scss';

const Login = ({ dispatch, logged }) => {
  const [user, setUser] = useState('');
  const [pw, setPw] = useState('');
  const [loginErr, setLoginErr] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  if (logged) {
    return <Redirect to="/app" />;
  }

  const submit = event => {
    event.preventDefault();
    const fullEmail = `${user.toLowerCase()}@unitec.edu`;
    dispatch(login(fullEmail, pw))
      .catch(() => setLoginErr(true));
  };

  const onHideModal = () => {
    dispatch(clear());
    setShowRegister(false);
  };

  return (
    <div className="vertical-center fade-in">
      <div className="container-fluid">
        {/* Start form */}
        <Form onSubmit={submit}>
          <div className="row">
            <div
              id="login-elem"
              className="col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4 p-5"
            >
              <h3>Iniciar sesión</h3>
              <h6 className="mb-4">
                <small className="text-muted">
                  v0.0.2
                </small>
              </h6>

              {/* Email / Username */}
              <Form.Group controlId="login-user">
                <Form.Label>Usuario</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    required
                    value={user}
                    onChange={e => setUser(e.target.value)}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text id="group-email">@unitec.edu</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>

              {/* Password */}
              <TextField
                id="login-password"
                type="password"
                label="Contraseña"
                required
                value={pw}
                onChange={e => setPw(e.target.value)}
              />

              <Alert className="fade-in" show={loginErr} variant="danger">
                Error al ingresar, no existe un usuario con esas credenciales!
              </Alert>

              {/* Forgot password */}
              <Button variant="link" block>
                Recuperar contraseña
              </Button>

              {/* Submit button */}
              <Button type="submit" variant="primary" block>
                Iniciar sesión
              </Button>

              {/* Student signup button */}
              <Button variant="secondary" block onClick={() => setShowRegister(true)}>
                Registrar estudiante
              </Button>

              {/* About button */}
              <Link to="/about">
                <Button variant="info" className="mt-5" block>
                  Sobre el proyecto
                </Button>
              </Link>

            </div>
          </div>
        </Form>
      </div>

      {/* Modal Signup */}
      <SignupModal show={showRegister} onHide={onHideModal} />
    </div>
  );
};

const mapStateToProps = state => ({ logged: state.auth.logged });

export default connect(mapStateToProps)(Login);
