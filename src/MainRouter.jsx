import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Logout from './pages/Logout';
import About from './pages/About';
import App from './pages/App';
import NotFound from './pages/NotFound';
import UploadForm from './components/UploadFile/UploadForm';

const MainRouter = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/app" component={App} />
    <Route path="/about" component={About} />
    <Route path="/upload" component={UploadForm} />
    <Route path="/logout" component={Logout} />
    <Route component={NotFound} />
  </Switch>
);

export default MainRouter;
