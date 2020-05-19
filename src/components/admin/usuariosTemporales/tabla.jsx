import React from 'react';

const Tabla = ({datos})=>{
    return(
        <table className="table table-sm text-center" id="tbl">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    datos.map(usuario =>
                        <tr key={usuario.id}>
                            <td>{usuario.name}</td>
                            <td>{usuario.type}</td> 
                            <td className="align-items-center">
                                <span className="d-lg-inline btn btn-outline-success btn-sm mt-1 col-6 col-md-6 btn-middle"
                                    data-target="#editar"
                                    data-toggle="modal"
                                >
                                    <i className="fas fa-edit"></i>
                                </span>
                                <span> </span>
                                <span className="d-lg-inline btn btn-outline-danger btn-sm mt-1 col-6 col-md-6 btn-middle"
                                    data-target="#eliminar"
                                    data-toggle="modal"
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </span>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}

export default Tabla;