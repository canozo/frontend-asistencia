import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, signup } from '../../redux/modules/auth';
import { clear } from '../../redux/modules/signup';
import Alert from '../../components/Alert';
import Modal from '../../components/Modal';
import Signup from './Signup';
import './Login.scss';

const Login = ({ dispatch, logged }) => {
  const [user, setUser] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [registerErr, setRegisterErr] = useState('');

  if (logged) {
    return <Redirect to="/app" />;
  }

  const submit = event => {
    event.preventDefault();
    const fullEmail = `${user.toLowerCase()}@unitec.edu`;
    dispatch(login(fullEmail, pw))
      .catch(() => setErr('Error al ingresar, no existe un usuario con esas credenciales!'));
  };

  const signupSubmit = event => {
    event.preventDefault();
    dispatch(signup())
      .catch(err => {
        console.log(err);
        setRegisterErr(err);
      });
  };

  return (
    <div className="vertical-center fade-in">
      <div id="login-root" className="container-fluid">
        {/* Start form */}
        <form onSubmit={submit}>
          <div className="row">
            <div
              id="login-elem"
              className="col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4 p-5"
            >
              <h3 className="mb-4">Iniciar sesión</h3>

              {/* Email / Username */}
              <div className="form-group">
                <label htmlFor="login-user">Usuario</label>
                <div className="input-group">
                  <input
                    id="login-user"
                    type="text"
                    className="form-control"
                    aria-describedby="group-email"
                    value={user}
                    onChange={e => setUser(e.target.value)}
                    required
                  />
                  <div className="input-group-append">
                    <span id="group-email" className="input-group-text">@unitec.edu</span>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="login-password">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="login-password"
                  value={pw}
                  onChange={e => setPw(e.target.value)}
                  required
                />
              </div>

              <Alert
                show={err ? true : false}
                type="danger"
                message={err}
              />

              {/* Forgot password */}
              <button type="button" className="btn btn-link btn-block">
                Recuperar contraseña
              </button>

              {/* Submit button */}
              <button type="submit" className="btn btn-primary btn-block">
                Iniciar sesión
              </button>

              {/* Student signup button */}
              <button
                type="button"
                className="btn btn-secondary btn-block"
                data-toggle="modal"
                data-target="#modal-register"
                onClick={() => dispatch(clear())}
              >
                Registrar estudiante
              </button>

              {/* About button */}
              <Link to="/about">
                <button type="button" className="btn btn-info btn-block mt-5">
                  Sobre el proyecto
                </button>
              </Link>

            </div>
          </div>
        </form>
      </div>
      <form onSubmit={signupSubmit}>
        <Modal
          id="modal-register"
          title="Registrarse como estudiante"
          primary="submit"
          txtPrimary="Registrar"
        >
          <Signup />
        </Modal>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  const { auth, signup } = state;
  return {
    logged: auth.logged,
    names: signup.names,
    surnames: signup.surnames,
    email: signup.email,
    password: signup.password,
    accountNumber: signup.accountNumber,
  };
};

export default connect(mapStateToProps)(Login);
