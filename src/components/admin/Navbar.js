import React from 'react';
import Logo from './../../assets/logo_nav.png';
import { Link } from 'react-router-dom'

const Nabvar = ({ active }) => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/admin">
            <img src={Logo} width="50" height="50" className="d-inline-block align-top" alt="Logo" />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className={`nav-item ${(active === "home") ? 'active' : ''}`}>
                    <Link to="/admin" className="nav-link">Inicio</Link>
                </li>
                <li className={`nav-item ${(active === "competencias") ? 'active' : ''}`}>
                    <Link className="nav-link" to="/admin/competencias">Competencias</Link>
                </li>
                <li className={`nav-item ${(active === "ambientes") ? 'active' : ''}`}>
                    <Link className="nav-link" to="/admin/ambientes">Ambientes</Link>
                </li>
                <li className={`nav-item ${(active === "contratos") ? 'active' : ''}`}>
                    <Link className="nav-link" to="/admin/contratos">Tipos de contratos</Link>
                </li>
                <li className={`nav-item  dropdown ${(active === "programas") ? 'active' : ''}`}>
                    <a className="nav-link dropdown-toggle" href="#0" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Programas de formación
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to="/admin/programas">Programas de formación</Link>
                        <Link className="dropdown-item" to="/admin/tipo-programas">Tipos de programación de formación </Link>
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