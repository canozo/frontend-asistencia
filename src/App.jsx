import React from 'react';
import { Switch, Route } from 'react-router-dom';

const App = () => (
  <Switch>
    <Route exact path="/" component={() => <div>Login Home</div>}/>
    <Route path="/about" component={() => <div>About</div>}/>
    <Route component={() => <div>Not Found</div>}/>
  </Switch>
);

export default App;
