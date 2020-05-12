import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import { updateProfile } from '../../../redux/modules/auth';
import TextField from '../../../components/TextField';

const Update = ({ dispatch, userType, accountNumber, ...rest }) => {
  const [names, setNames] = useState(rest.names);
  const [surnames, setSurnames] = useState(rest.surnames);
  const [email, setEmail] = useState(rest.email.split('@')[0]);
  const [timer, setTimer] = useState(null);
  const [alertTimer, setAlertTimer] = useState(null);
  const [updateMsg, setUpdateMsg] = useState(null);
  const mounted = useRef(false);

  const resetAlert = () => {
    if (alertTimer) {
      clearTimeout(alertTimer);
    }

    setAlertTimer(setTimeout(() => {
      setUpdateMsg(null);
    }, 5000));
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (timer) {
        clearTimeout(timer);
      }

      setTimer(setTimeout(async () => {
        setTimer(null);
        const payload = {
          names,
          surnames,
          email: `${email}@unitec.edu`,
        };
        try {
          await dispatch(updateProfile(payload));
          setUpdateMsg('success');
        }
        catch (err) {
          setUpdateMsg(err.message);
        }
        resetAlert();
      }, 2000));
    }
  }, [names, surnames, email]);

  return (
    <>
      <div className="row">
        <div className="col-lg-6">
          {/* Email / Username */}
          <Form.Group controlId="profile-user">
            <Form.Label>Usuario</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                required
                disabled
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <InputGroup.Append>
                <InputGroup.Text id="profile-group-email">@unitec.edu</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </div>
        {userType === 'student' ? (
          <div className="col-lg-6">
            {/* Show account number */}
            <TextField
              id="profile-acc-num"
              type="text"
              label="Número de cuenta"
              disabled
              value={accountNumber}
            />
          </div>
        ) : null}
      </div>

      <div className="row">
        <div className="col-lg-6">
          {/* Names */}
          <TextField
            id="profile-names"
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
            id="profile-surnames"
            type="text"
            label="Apellidos"
            required
            value={surnames}
            onChange={e => setSurnames(e.target.value)}
          />
        </div>
      </div>

      {/* Profile update error */}
      <Alert
        className="fade-in"
        show={updateMsg !== null}
        variant={updateMsg === 'success' ? 'success' : 'danger'}
      >
        {updateMsg === 'success' ? 'Se modificaron sus datos!' : updateMsg}
      </Alert>
    </>
  );
};

const mapStateToProps = state => ({
  userType: state.auth.userType,
  names: state.auth.names,
  surnames: state.auth.surnames,
  email: state.auth.email,
  accountNumber: state.auth.accountNumber,
});

export default connect(mapStateToProps)(Update);
