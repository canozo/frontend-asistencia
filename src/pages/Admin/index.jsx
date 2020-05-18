import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MobileItem from '../../components/MobileItem';
import Dashboard from '../../components/Dashboard';
import Welcome from '../../components/Welcome';
import Profile from '../Profile';
import Sections from '../Sections';
import Campus from './Campus';
import Building from './Building';
import Classroom from './Classroom';
import Semester from './Semester';
import Class from './Class';
import Section from './Section';
import Student from './Student';
import Professor from './Professor';
import Personnel from './Personnel';
import Camera from './Camera';
import Enroll from './Enroll';

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
  division: 'Matricular',
}, {
  to: '/enroll',
  icon: 'add_box',
  title: 'Matricular estudiante',
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
      <Route path={`${home}/campus`} component={Campus} />
      <Route path={`${home}/building`} component={Building} />
      <Route path={`${home}/classroom`} component={Classroom} />
      <Route path={`${home}/semester`} component={Semester} />
      <Route path={`${home}/class`} component={Class} />
      <Route path={`${home}/section`} component={Section} />
      <Route path={`${home}/enroll`} component={Enroll} />
      <Route path={`${home}/student`} component={Student} />
      <Route path={`${home}/professor`} component={Professor} />
      <Route path={`${home}/personnel`} component={Personnel} />
      <Route path={`${home}/camera`} component={Camera} />
      <Route path={`${home}/presencial`} component={Sections} />
      <Route component={Welcome} />
    </Switch>
  </Dashboard>
);

const AdminDropdown = () => <MobileItem menu={menu} home={home} />;

export default Admin;

export {
  Admin,
  AdminDropdown,
};
