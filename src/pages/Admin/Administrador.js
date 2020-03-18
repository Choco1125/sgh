import React from 'react';
import Nabvar from './../../components/admin/Navbar';

const Administrador = ()=>(
    <div>
        <Nabvar active="home"/>
        <div className="container">
            <div className="row justify-content-center">
                <div className="jumbotron mt-5">
                    <h1 className="display-4">Sistema de gestión de horario</h1>
                    <p className="lead">La plataforma está en construcción, pero puedes revisar las opciones que tienes en la barra de navegación</p>
                    <p>Espero te guste :)</p>
                </div>
            </div>
        </div>
    </div>
);

export default Administrador;