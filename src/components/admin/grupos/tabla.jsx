import React from 'react';

const Tabla = ({grupos})=>{
    return(
        <table className="table table-sm text-center" id="tbl">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Programa</th>
                    <th>Jefe de grupo</th>
                    <th>Modalidad</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    grupos.map(grupo =>
                        <tr key={grupo.id}>
                            <td>{grupo.codeTab}</td>
                            <td>{grupo.formationProgram.name}</td> 
                            <td>{grupo.manager.username}</td> 
                            <td>{grupo.modality.name}</td> 
                            <td className="align-items-center">
                                <span className="d-lg-inline btn btn-outline-success btn-sm mt-1 col-6 col-md-6 btn-middle"
                                    data-target="#editar"
                                    data-toggle="modal"
                                    onClick={()=>console.log(grupo)}
                                >
                                    <i className="fas fa-edit"></i>
                                </span>
                                <span> </span>
                                <span className="d-lg-inline btn btn-outline-danger btn-sm mt-1 col-6 col-md-6 btn-middle"
                                    data-target="#eliminar"
                                    data-toggle="modal"
                                    onClick={()=>console.log(grupo)}
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