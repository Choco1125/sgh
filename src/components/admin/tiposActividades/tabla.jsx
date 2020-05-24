import React from 'react';

const Tabla = ({actividades,setEditar,setEliminar}) =>{
    return(
        <table className="table table-sm text-center" id="tbl">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Color</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    actividades.map(actividad =>
                        <tr key={actividad.id}>
                            <td>{actividad.name}</td>
                            <td style={{
                                color: `${actividad.color}`
                            }}>{actividad.color}</td>
                            <td className="align-items-center">
                                <span className="d-lg-inline btn btn-outline-success btn-sm mt-1 col-6 col-md-6 btn-middle"
                                    data-target="#editar"
                                    data-toggle="modal"
                                    onClick = {()=>setEditar(actividad.id,actividad.name,actividad.color)}
                                >
                                    <i className="fas fa-edit"></i>
                                </span>
                                <span> </span>
                                <span className="d-lg-inline btn btn-outline-danger btn-sm mt-1 col-6 col-md-6 btn-middle"
                                    data-target="#eliminar"
                                    data-toggle="modal"
                                    onClick = {()=>setEliminar(actividad.id)}
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