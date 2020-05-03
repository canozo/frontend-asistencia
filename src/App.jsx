import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

const App = () => (
  <Switch>
    <Route exact path="/" component={Login}/>
    <Route path="/about" component={() => <div>About</div>}/>
    <Route component={() => <div>Not Found</div>}/>
  </Switch>
);

export default App;
