import React from 'react';

const Tabla = ({ datos,eliminar,editar }) => {
    return (
        <table className="table table-sm text-center" id="tbl">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    datos.map(razon =>
                        <tr key={razon.id}>
                            <td>{razon.name}</td>
                            <td className="align-items-center">
                                <span className="d-lg-inline btn btn-outline-success btn-sm mt-1 col-6 col-md-6 btn-middle"
                                    data-target="#editar"
                                    data-toggle="modal"
                                    onClick={()=>editar(razon.name,razon.id)}
                                >
                                    <i className="fas fa-edit"></i>
                                </span>
                                <span> </span>
                                <span className="d-lg-inline btn btn-outline-danger btn-sm mt-1 col-6 col-md-6 btn-middle"
                                    data-target="#eliminar"
                                    data-toggle="modal"
                                    onClick={()=>eliminar(razon.id)}
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