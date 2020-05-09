import React from 'react';
import { connect } from 'react-redux';
import { onChange } from '../../../redux/modules/signup';
import config from '../../../config';

const Signup = ({ dispatch, email, names, surnames, password, accountNumber }) => {
  return (
    <>
      {/* Names */}
      <div className="form-group">
        <label htmlFor="signup-names">Nombres</label>
        <input
          type="text"
          className="form-control"
          id="signup-names"
          value={names}
          onChange={e => dispatch(onChange({ names: e.target.value }))}
          required
        />
      </div>

      {/* Surnames */}
      <div className="form-group">
        <label htmlFor="signup-surnames">Apellidos</label>
        <input
          type="text"
          className="form-control"
          id="signup-surnames"
          value={surnames}
          onChange={e => dispatch(onChange({ surnames: e.target.value }))}
          required
        />
      </div>

      {/* Email / Username */}
      <div className="form-group">
        <label htmlFor="signup-user">Usuario</label>
        <div className="input-group">
          <input
            id="signup-user"
            type="text"
            className="form-control"
            aria-describedby="signup-group-email"
            pattern={config.regex.username.source}
            value={email}
            onChange={e => dispatch(onChange({ email: e.target.value }))}
            required
          />
          <div className="input-group-append">
            <span id="signup-group-email" className="input-group-text">@unitec.edu</span>
          </div>
        </div>
      </div>

      {/* Account Number */}
      <div className="form-group">
        <label htmlFor="signup-account-num">Número de cuenta</label>
        <input
          type="text"
          className="form-control"
          id="signup-account-num"
          pattern={config.regex.accountNum.source}
          value={accountNumber}
          onChange={e => dispatch(onChange({ accountNumber: e.target.value }))}
          required
        />
      </div>

      {/* Password */}
      <div className="form-group">
        <label htmlFor="signup-password">Contraseña</label>
        <input
          type="password"
          className="form-control"
          id="signup-password"
          aria-describedby="signup-pw-tip"
          pattern={config.regex.password.source}
          value={password}
          onChange={e => dispatch(onChange({ password: e.target.value }))}
          required
        />
        <small id="signup-pw-tip" className="form-text text-muted">
          Al menos 6 caracteres, una mayúscula, un número y un caracter especial.
        </small>
      </div>

      {/* Hidden submit */}
      <input type="submit" hidden />
    </>
  );
}

const mapStateToProps = state => {
  const { signup } = state;
  return {
    names: signup.names,
    surnames: signup.surnames,
    email: signup.email,
    password: signup.password,
    accountNumber: signup.accountNumber,
  };
};

export default connect(mapStateToProps)(Signup);
