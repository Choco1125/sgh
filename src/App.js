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
import UsuariosTemporales from './pages/Admin/UsuariosTemporales';
import TipoActividades from './pages/Admin/TiposActividades';
import Usuarios from './pages/Admin/Usuarios';
import EditarUserPage from './components/admin/usuarios/editar/page';


const App = ()=>(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/coordinador" exact component={Administrador}/>
      <Route path="/coordinador/competencias" exact component={Competencias}/>
      <Route path="/coordinador/ambientes" exact component={Ambientes}/>
      <Route path="/coordinador/contratos" exact component={Contratos}/>
      <Route path="/coordinador/programas" exact component={Programas}/>
      <Route path="/coordinador/tipo-programas" exact component={TiposProgramas}/>
      <Route path="/coordinador/grupos" exact component={Grupos}/>
      <Route path="/coordinador/resultados" exact component={Resultados}/>
      <Route path="/coordinador/municipios" exact component={Municipios}/>
      <Route path="/coordinador/zonas" exact component={Zonas}/>
      <Route path="/coordinador/posiciones" exact component={Posiciones}/>
      <Route path="/coordinador/roles" exact component={Roles}/>
      <Route path="/coordinador/modalidades" exact component={Modalidades}/>
      <Route path="/coordinador/razonesdesprogramaciones" exact component={RazonesDesprogramaciones}/>
      <Route path="/coordinador/usuariostemporales" exact component={UsuariosTemporales}/>
      <Route path="/coordinador/tipo-actividades" exact component={TipoActividades}/>
      <Route path="/coordinador/usuarios" exact component={Usuarios}/>
      <Route path="/coordinador/usuarios/editar/:id" exact component={EditarUserPage}/>
    </Switch>
  </BrowserRouter>
);

export default App;
