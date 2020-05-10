import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Gateway = ({ userType }) => <Redirect to={`/app/${userType}`} />;

const mapStateToProps = state => ({ userType: state.auth.userType });

export default connect(mapStateToProps)(Gateway);
