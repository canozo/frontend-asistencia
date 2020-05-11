import React from 'react';
import MobileItem from '../../../components/MobileItem';

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

export default () => <MobileItem menu={menu} home={home} />;
