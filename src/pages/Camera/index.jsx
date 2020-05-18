import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MobileItem from '../../components/MobileItem';
import Dashboard from '../../components/Dashboard';
import Welcome from '../../components/Welcome';
import Profile from '../Profile';
import Marked from './Marked';

const home = '/app/camera';

const menu = [{
  to: '/marked',
  icon: 'assignment_turned_in',
  title: 'Historial de marcados',
}];

const Camera = () => (
  <Dashboard menu={menu} home={home}>
    <Switch>
      <Route exact path={home} component={Welcome} />
      <Route path={`${home}/profile`} component={Profile} />
      <Route path={`${home}/marked`} component={Marked} />
      <Route component={Welcome} />
    </Switch>
  </Dashboard>
);

const CameraDropdown = () => <MobileItem menu={menu} home={home} />;

export default Camera;

export {
  Camera,
  CameraDropdown,
};
