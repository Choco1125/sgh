import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/Login';

//Admin
import Administrador from './pages/Admin/Administrador';
import Competencias from './pages/Admin/Competencias';
import Ambientes from './pages/Admin/Ambientes';
import Contratos from './pages/Admin/Contratos';
import Programas from './pages/Admin/Programas';
import TiposProgramas from './pages/Admin/TipoProgramas';
import Grupos from './pages/Admin/Grupos';
import Resultados from "./pages/Admin/Resultados";
import Municipios from "./pages/Admin/Municipios";
import Zonas from './pages/Admin/Zonas';
import Posiciones from './pages/Admin/Posiciones';
import Roles from './pages/Admin/Roles';
import Modalidades from './pages/Admin/Modalidades';
import RazonesDesprogramaciones from './pages/Admin/RazonesDesprogramacion';


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
      <Route path="/admin/grupos" exact component={Grupos}/>
      <Route path="/admin/resultados" exact component={Resultados}/>
      <Route path="/admin/municipios" exact component={Municipios}/>
      <Route path="/admin/zonas" exact component={Zonas}/>
      <Route path="/admin/posiciones" exact component={Posiciones}/>
      <Route path="/admin/roles" exact component={Roles}/>
      <Route path="/admin/modalidades" exact component={Modalidades}/>
      <Route path="/admin/razonesdesprogramaciones" exact component={RazonesDesprogramaciones}/>
    </Switch>
  </BrowserRouter>
);

export default App;
