import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import UploadForm from './components/UploadFile/UploadForm';

const App = () => (
  <Switch>
    <Route exact path="/" component={Login}/>
    <Route path="/upload" component={UploadForm}/>
    <Route path="/about" component={() => <div>About</div>}/>
    <Route component={() => <div>Not Found</div>}/>
  </Switch>
);

export default App;
