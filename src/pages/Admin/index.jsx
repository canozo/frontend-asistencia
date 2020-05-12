import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MobileItem from '../../components/MobileItem';
import Dashboard from '../../components/Dashboard';
import Welcome from '../../components/Welcome';
import Profile from '../Profile';
import Sections from '../Sections';

const home = '/app/admin';

const menu = [{
  division: 'Universidad',
}, {
  to: '/campus',
  icon: 'location_city',
  title: 'Campus',
}, {
  to: '/building',
  icon: 'domain',
  title: 'Edificios',
}, {
  to: '/classroom',
  icon: 'event_seat',
  title: 'Aulas de clase',
}, {
  division: 'Carga académica',
}, {
  to: '/semester',
  icon: 'date_range',
  title: 'Semestres',
}, {
  to: '/class',
  icon: 'class',
  title: 'Clases',
}, {
  to: '/section',
  icon: 'schedule',
  title: 'Secciones',
}, {
  division: 'Usuarios',
}, {
  to: '/student',
  icon: 'school',
  title: 'Estudiantes',
}, {
  to: '/professor',
  icon: 'account_box',
  title: 'Profesores',
}, {
  to: '/personnel',
  icon: 'portrait',
  title: 'Personal administrativo',
}, {
  to: '/camera',
  icon: 'photo_camera',
  title: 'Camaras',
}, {
  division: 'Otros',
}, {
  to: '/presencial',
  icon: 'event_note',
  title: 'Secciones presencial',
}];

const Admin = () => (
  <Dashboard menu={menu} home={home}>
    <Switch>
      <Route exact path={home} component={Welcome} />
      <Route path={`${home}/profile`} component={Profile} />
      <Route path={`${home}/campus`} component={() => <h3>/campus</h3>} />
      <Route path={`${home}/building`} component={() => <h3>/building</h3>} />
      <Route path={`${home}/classroom`} component={() => <h3>/classroom</h3>} />
      <Route path={`${home}/semester`} component={() => <h3>/semester</h3>} />
      <Route path={`${home}/class`} component={() => <h3>/class</h3>} />
      <Route path={`${home}/section`} component={() => <h3>/section</h3>} />
      <Route path={`${home}/student`} component={() => <h3>/student</h3>} />
      <Route path={`${home}/professor`} component={() => <h3>/professor</h3>} />
      <Route path={`${home}/personnel`} component={() => <h3>/personnel</h3>} />
      <Route path={`${home}/camera`} component={() => <h3>/camera</h3>} />
      <Route path={`${home}/presencial`} component={Sections} />
      <Route component={Welcome} />
    </Switch>
  </Dashboard>
);

const AdminDropdown = () => <MobileItem menu={menu} home={home} />;

export {
  Admin,
  AdminDropdown,
};
