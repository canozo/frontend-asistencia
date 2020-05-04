import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../redux/modules/auth';
import './Login.scss';

const Login = ({ dispatch, logged }) => {
  const [user, setUser] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);

  if (logged) {
    return <Redirect to="/app" />;
  }

  const submit = e => {
    e.preventDefault();

    if (user && pw) {
      const email = `${user.toLowerCase()}@unitec.edu`;
      dispatch(login(email, pw))
        .catch(() => setErr(true));
    }
  };

  return (
    <div className="vertical-center">
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
                />
              </div>

              {/* Forgot password */}
              <button type="button" className="btn btn-link btn-block">
                Recuperar contraseña
              </button>

              {/* Submit button */}
              <button type="submit" className="btn btn-primary btn-block">
                Iniciar sesión
              </button>

              {/* Student signup button */}
              <button type="button" className="btn btn-secondary btn-block">
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
    </div>
  );
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  logged: PropTypes.bool.isRequired,
};

const mapStateToProps = globalState => {
  const state = globalState.auth;
  return {
    logged: state.logged,
  };
};

export default connect(mapStateToProps)(Login);

