import React from 'react';
import './Login.scss';

const Login = () => {
  const submit = e => {
    e.preventDefault();
    console.log('submit');
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
                  />
                  <div className="input-group-append">
                    <span id="group-email" className="input-group-text">@unitec.edu</span>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="login-password">Contraseña</label>
                <input type="password" className="form-control" id="login-password" />
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
              <button type="button" className="btn btn-info btn-block mt-5">
                Sobre el proyecto
              </button>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

