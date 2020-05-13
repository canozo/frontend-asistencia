import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import SelectSection from './SelectSection';
import StudentList from './StudentList';

const home = '/app/professor/attendance';

const Attendance = ({ token }) => {
  return (
    <Switch>
      <Route exact path={home} component={SelectSection} />
      <Route path={`${home}/:idAttendanceLog`} component={StudentList} />
      <Route component={() => <h1>Holi</h1>} />
    </Switch>
  );
};

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(Attendance);
