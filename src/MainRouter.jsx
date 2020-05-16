import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Logout from './pages/Logout';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Loading from './components/Loading';

const App = React.lazy(() => import('./pages/App'));
const Login = React.lazy(() => import('./pages/Login'));

const MainRouter = () => (
  <Suspense fallback={Loading()}>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/app" component={App} />
      <Route path="/about" component={About} />
      <Route path="/logout" component={Logout} />
      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

export default MainRouter;
