import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/Login';
import Administrador from './pages/Admin/Administrador';
import Competencias from './pages/Admin/Competencias';

const App = ()=>(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/admin" exact component={Administrador}/>
      <Route path="/admin/competencias" exact component={Competencias}/>
    </Switch>
  </BrowserRouter>
);

export default App;
