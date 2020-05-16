import React, { useState } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { updatePassword } from '../../../redux/modules/auth';
import TextField from '../../../components/TextField';
import TimedAlert from '../../../components/TimedAlert';
import config from '../../../config';

const Password = ({ dispatch }) => {
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [alert, setAlert] = useState(null);

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
      <TimedAlert type={alert} reset={() => setAlert(null)} success="Se cambió su contraseña!" />

      {/* Submit password */}
      <Button type="submit" variant="primary" className="mt-1" block>
        Guardar cambios
      </Button>
    </Form>
  );
};

export default connect()(Password);
