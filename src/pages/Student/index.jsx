import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MobileItem from '../../components/MobileItem';
import Dashboard from '../../components/Dashboard';
import Welcome from '../../components/Welcome';
import Profile from '../Profile';

const home = '/app/student';

const menu = [{
  to: '/section',
  icon: 'library_books',
  title: 'Secciones matriculadas',
}, {
  to: '/history',
  icon: 'assignment_turned_in',
  title: 'Historial de asistencia',
}, {
  to: '/upload',
  icon: 'face',
  title: 'Cargar imagen de rostro',
}, {
  to: '/presencial',
  icon: 'event_note',
  title: 'Secciones presencial',
}];

const Student = () => (
  <Dashboard menu={menu} home={home}>
    <Switch>
      <Route exact path={home} component={Welcome} />
      <Route path={`${home}/profile`} component={Profile} />
      <Route path={`${home}/section`} component={() => <h3>Sections</h3>} />
      <Route path={`${home}/history`} component={() => <h3>History</h3>} />
      <Route path={`${home}/upload`} component={() => <h3>Upload</h3>} />
      <Route path={`${home}/presencial`} component={() => <h3>Presencial</h3>} />
      <Route component={Welcome} />
    </Switch>
  </Dashboard>
);

const StudentDropdown = () => <MobileItem menu={menu} home={home} />;

export {
  Student,
  StudentDropdown,
};
