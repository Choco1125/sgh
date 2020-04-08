import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/Login';
import Administrador from './pages/Admin/Administrador';
import Competencias from './pages/Admin/Competencias';
import Ambientes from './pages/Admin/Ambientes';
import Contratos from './pages/Admin/Contratos';

const App = ()=>(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/admin" exact component={Administrador}/>
      <Route path="/admin/competencias" exact component={Competencias}/>
      <Route path="/admin/ambientes" exact component={Ambientes}/>
      <Route path="/admin/contraros" exact component={Contratos}/>
    </Switch>
  </BrowserRouter>
);

export default App;
