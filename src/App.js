import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/Login';
import Administrador from './pages/Admin/Administrador';
import Competencias from './pages/Admin/Competencias';
import Ambientes from './pages/Admin/Ambientes';
import Contratos from './pages/Admin/Contratos';
import Programas from './pages/Admin/Programas';
import TiposProgramas from './pages/Admin/TipoProgramas'


const App = ()=>(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/admin" exact component={Administrador}/>
      <Route path="/admin/competencias" exact component={Competencias}/>
      <Route path="/admin/ambientes" exact component={Ambientes}/>
      <Route path="/admin/contratos" exact component={Contratos}/>
      <Route path="/admin/programas" exact component={Programas}/>
      <Route path="/admin/tipo-programas" exact component={TiposProgramas}/>
    </Switch>
  </BrowserRouter>
);

export default App;
