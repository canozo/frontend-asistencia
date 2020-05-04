import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Logout from './pages/Logout';
import About from './pages/About';
import UploadForm from './components/UploadFile/UploadForm';

const App = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/about" component={About} />
    <Route path="/upload" component={UploadForm} />
    <Route path="/logout" component={Logout} />
    <Route component={() => <div>Not Found</div>} />
  </Switch>
);

export default App;
