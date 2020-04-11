import React from 'react';
import Logo from './../../assets/logo_nav.png';

const Nabvar = ({active})=>(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/admin">
            <img src={Logo} width="50" height="50" className="d-inline-block align-top" alt="Logo"/>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className={`nav-item ${(active==="home")?'active':''}`}>
                    <a className="nav-link" href="/admin">Inicio</a>
                </li>
                <li className={`nav-item ${(active==="competencias")?'active':''}`}>
                    <a className="nav-link" href="/admin/competencias">Competencias</a>
                </li>
                <li className={`nav-item ${(active==="ambientes")?'active':''}`}>
                    <a className="nav-link" href="/admin/ambientes">Ambientes</a>
                </li>
                <li className={`nav-item ${(active==="contratos")?'active':''}`}>
                    <a className="nav-link" href="/admin/contratos">Tipos de contratos</a>
                </li>
                <li className={`nav-item ${(active==="programas")?'active':''}`}>
                    <a className="nav-link" href="/admin/programas">Programas de formación</a>
                </li>
                <li className={`nav-item `}>
                    <a className="nav-link" href="/" onClick={()=>{
                        sessionStorage.removeItem('token');
                    }}>Salir</a>
                </li>
            </ul>
        </div>
    </nav>
)

export default Nabvar;