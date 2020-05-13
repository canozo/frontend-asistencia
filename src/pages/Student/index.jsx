import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MobileItem from '../../components/MobileItem';
import Dashboard from '../../components/Dashboard';
import Welcome from '../../components/Welcome';
import Sections from '../Sections';
import Profile from '../Profile';
import Upload from './Upload';
import Enrolled from './Enrolled';
import History from './History';

const home = '/app/student';

const menu = [{
  to: '/history',
  icon: 'assignment_turned_in',
  title: 'Historial de asistencia',
}, {
  to: '/upload',
  icon: 'face',
  title: 'Cargar imagen de rostro',
}, {
  to: '/enrolled',
  icon: 'library_books',
  title: 'Secciones matriculadas',
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
      <Route path={`${home}/enrolled`} component={Enrolled} />
      <Route path={`${home}/history`} component={History} />
      <Route path={`${home}/upload`} component={Upload} />
      <Route path={`${home}/presencial`} component={Sections} />
      <Route component={Welcome} />
    </Switch>
  </Dashboard>
);

const StudentDropdown = () => <MobileItem menu={menu} home={home} />;

export {
  Student,
  StudentDropdown,
};
