import React from 'react';
import Nabvar from '../../components/admin/Navbar';
import Tabla from '../../components/admin/competencias/Tabla';

const Competencias = () =>(
    <div>
        <Nabvar active="competencias"/>
        <div className="container">
            <div className="row justify-content-end mt-3">
                <button className="btn btn-primary border mr-3">Crear <i className="fas fa-plus"></i></button>
            </div>
            <div className="row mt-2">
                <div className="table-responsive">
                    <Tabla/>
                </div>
            </div>
        </div>
    </div>
);

export default Competencias;