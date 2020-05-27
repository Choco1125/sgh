import React from 'react';
import Logo from './../../assets/logo_nav.png';
import { Link } from 'react-router-dom'

const Nabvar = ({ active }) => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/admin">
            <img src={Logo} width="30" height="30" className="d-inline-block align-top" alt="Logo" />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className={`nav-item ${(active === "home") ? 'active' : ''}`}>
                    <Link to="/coordinador" className="nav-link">Inicio</Link>
                </li>
                <li className={`nav-item ${(active === "ambientes") ? 'active' : ''}`}>
                    <Link className="nav-link" to="/coordinador/ambientes">Ambientes</Link>
                </li>
                <li className={`nav-item  dropdown ${(active === "programas") ? 'active' : ''}`}>
                    <a className="nav-link dropdown-toggle" href="#0" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Programas de formación
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to="/coordinador/competencias">Competencias</Link> 
                        <Link className="dropdown-item" to="/coordinador/grupos">Grupos</Link>
                        <Link className="dropdown-item" to="/coordinador/modalidades">Modalidades</Link>
                        <Link className="dropdown-item" to="/coordinador/programas">Programas de formación</Link>
                        <Link className="dropdown-item" to="/coordinador/resultados">Resultados de aprendizaje</Link>
                        <Link className="dropdown-item" to="/coordinador/tipo-programas">Tipos de programa de formación </Link>
                    </div>
                </li>
                <li className={`nav-item  dropdown ${(active === "ubicaciones") ? 'active' : ''}`}>
                    <a className="nav-link dropdown-toggle" href="#0" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Ubicaciones
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to="/coordinador/municipios">Municipios</Link>
                        <Link className="dropdown-item" to="/coordinador/zonas">Zonas</Link>
                    </div>
                </li>
                <li className={`nav-item  dropdown ${(active === "parametrizacion") ? 'active' : ''}`}>
                    <a className="nav-link dropdown-toggle" href="#0" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Parametrización
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to="/coordinador/contratos">Tipos de contratos</Link>
                        <Link className="dropdown-item" to="/coordinador/posiciones">Posiciones</Link>
                        <Link className="dropdown-item" to="/coordinador/roles">Roles</Link>
                    </div>
                </li>
                <li className={`nav-item  dropdown ${(active === "desprogramacion") ? 'active' : ''}`}>
                    <a className="nav-link dropdown-toggle" href="#0" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Desprogramaciones
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to="/coordinador/razonesdesprogramaciones">Razones de desprogramación</Link> 
                    </div>
                </li>
                <li className={`nav-item  dropdown ${(active === "usuarios") ? 'active' : ''}`}>
                    <a className="nav-link dropdown-toggle" href="#0" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Usuarios
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to="/coordinador/usuariostemporales">Usuarios temporales</Link> 
                    </div>
                </li>
                <li className={`nav-item  dropdown ${(active === "tipoActividades") ? 'active' : ''}`}>
                    <a className="nav-link dropdown-toggle" href="#0" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Tipo de activdades
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to="/coordinador/tipo-actividades">Tipo de activdades</Link> 
                    </div>
                </li>
                <li className={`nav-item `}>
                    <a className="nav-link" href="/" onClick={() => {
                        sessionStorage.removeItem('token');
                    }}>Salir</a>
                </li>
            </ul>
        </div>
    </nav>
)

export default Nabvar;