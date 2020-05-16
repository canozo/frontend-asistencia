import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

const TimedAlert = ({ type, success, reset }) => {
  const [alert, setAlert] = useState(false);
  const [alertTimer, setAlertTimer] = useState(null);

  useEffect(() => {
    if (type) {
      setAlert(true);
      resetAlert();
    }
  }, [type]);

  useEffect(() => {
    return () => clearTimeout(alertTimer);
  }, [alertTimer]);

  const resetAlert = () => {
    if (alertTimer) {
      clearTimeout(alertTimer);
    }

    setAlertTimer(setTimeout(() => {
      setAlert(false);
      reset();
    }, 5000));
  };

  return (
    <Alert
      className="fade-in"
      show={alert}
      variant={type === 'success' ? 'success' : 'danger'}
    >
      {type === 'success' ? success : type}
    </Alert>
  );
};

TimedAlert.propTypes = {
  type: PropTypes.string,
  success: PropTypes.string,
  reset: PropTypes.func.isRequired,
};

export default TimedAlert;
