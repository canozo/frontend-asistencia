import React from 'react';
import MobileItem from '../../../components/MobileItem';

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

export default () => <MobileItem menu={menu} home={home} />;
