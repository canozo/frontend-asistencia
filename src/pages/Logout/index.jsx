import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/modules/auth';

const Logout = ({ dispatch, logged }) => {
  useEffect(() => {
    dispatch(logout())
  }, []);

  if (logged) {
    return <div>Cerrando Sesión...</div>;
  }

  return <Redirect to="/" />;
};

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  logged: PropTypes.bool.isRequired,
};

const mapStateToProps = globalState => {
  const state = globalState.auth;
  return {
    logged: state.logged,
  };
};

export default connect(mapStateToProps)(Logout);
