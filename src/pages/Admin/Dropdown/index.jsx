import React from 'react';
import MobileItem from '../../../components/MobileItem';

const home = '/app/admin';

const menu = [{
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

export default () => <MobileItem menu={menu} home={home} />;
