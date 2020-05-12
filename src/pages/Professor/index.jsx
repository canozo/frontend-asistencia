import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MobileItem from '../../components/MobileItem';
import Dashboard from '../../components/Dashboard';
import Welcome from '../../components/Welcome';
import Profile from '../Profile';
import Sections from '../Sections';

const home = '/app/professor';

const menu = [{
  to: '/attendance',
  icon: 'assignment_turned_in',
  title: 'Abrir asistencia',
}, {
  to: '/presencial',
  icon: 'event_note',
  title: 'Secciones presencial',
}];

const Professor = () => (
  <Dashboard menu={menu} home={home}>
    <Switch>
      <Route exact path={home} component={Welcome} />
      <Route path={`${home}/profile`} component={Profile} />
      <Route path={`${home}/attendance`} component={() => <h3>/attendance</h3>} />
      <Route path={`${home}/presencial`} component={Sections} />
      <Route component={Welcome} />
    </Switch>
  </Dashboard>
);

const ProfessorDropdown = () => <MobileItem menu={menu} home={home} />;

export {
  Professor,
  ProfessorDropdown,
};
