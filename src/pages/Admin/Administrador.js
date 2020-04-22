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
                    <h3>Cambios:</h3>
                    <ul className="list-group">
                        <li className="list-group-item list-group-item-success">Crud de posiciones</li>
                        <li className="list-group-item list-group-item-success">Se añadió tipo de contrato a parametrización</li>
                        <li className="list-group-item list-group-item-warning">No se han aplicado cambios del documento ni los del backend</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

export default Administrador;