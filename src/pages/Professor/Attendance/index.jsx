import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SelectSection from './SelectSection';
import StudentList from './StudentList';

const home = '/app/professor/attendance';

const Attendance = () => {
  return (
    <Switch>
      <Route exact path={home} component={SelectSection} />
      <Route path={`${home}/:idAttendanceLog`} component={StudentList} />
    </Switch>
  );
};

export default Attendance;
