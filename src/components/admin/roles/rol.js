import React from 'react';

const Rol = ({ datos, edit,delet }) => (
    <div className="card col-10 col-md-5 col-lg-3 mr-lg-1 mt-2 mb-2 text-center" style={{ minHeight: '150px' }}>
        <div className="card-body">
            <h5 className="card-title" style={{height: '70px'}}>{datos.name}</h5>
            <button className="btn btn-outline-success col-11" data-toggle="modal" data-target="#editar"
                onClick={() => edit(datos.name, datos.id)}
            >Editar <i className="fas fa-edit"></i></button>
            <button className="btn btn-outline-danger col-11 mt-2" data-toggle="modal" data-target="#eliminar"
                onClick={() => delet(datos.id)}
            >Eliminar <i className="fas fa-trash"></i></button>
        </div>
    </div>
);


export default Rol;