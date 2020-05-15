import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { updatePassword } from '../../../redux/modules/auth';
import TextField from '../../../components/TextField';
import config from '../../../config';

const Password = ({ dispatch }) => {
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [alert, setAlert] = useState(null);
  const [alertTimer, setAlertTimer] = useState(null);

  useEffect(() => {
    return () => clearTimeout(alertTimer);
  }, [alertTimer]);

  const resetAlert = () => {
    if (alertTimer) {
      clearTimeout(alertTimer);
    }

    setAlertTimer(setTimeout(() => {
      setAlert(null);
    }, 5000));
  };

  const submit = async event => {
    event.preventDefault();
    if (password !== repeat) {
      setAlert('Las contraseñas no coinciden!');
    } else {
      try {
        await dispatch(updatePassword(password));
        setPassword('');
        setRepeat('');
        setAlert('success');
      }
      catch (err) {
        setAlert(err.message);
      }
    }
    resetAlert();
  };

  return (
    <Form onSubmit={submit}>
      <h4 className="mb-4">
        Cambiar contraseña
      </h4>

      <div className="row">
        <div className="col-lg-6">
          {/* Password */}
          <TextField
            id="profile-password"
            type="password"
            label="Contraseña"
            pattern={config.regex.password.source}
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            tooltip="Al menos 6 caracteres, una mayúscula, un número y un caracter especial."
          />
        </div>
        <div className="col-lg-6">
          {/* Repeat */}
          <TextField
            id="profile-repeat"
            type="password"
            label="Repetir contraseña"
            required
            value={repeat}
            onChange={e => setRepeat(e.target.value)}
          />
        </div>
      </div>

      {/* Password update error */}
      <Alert
        className="fade-in"
        show={alert !== null}
        variant={alert === 'success' ? 'success' : 'danger'}
      >
        {alert === 'success' ? 'Se cambió su contraseña!' : alert}
      </Alert>

      {/* Submit password */}
      <Button type="submit" variant="primary" className="mt-1" block>
        Guardar cambios
      </Button>
    </Form>
  );
};

export default connect()(Password);
