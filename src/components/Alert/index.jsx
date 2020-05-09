import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ show, type, message }) => (
  <div className={`alert alert-${type} ${show ? 'fade-in' : 'd-none'}`} role="alert">
    {message}
  </div>
);

Alert.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'primary',
    'secondary',
    'danger',
    'success',
    'warning',
    'info',
    'light',
    'dark',
  ]).isRequired,
};

export default Alert;
