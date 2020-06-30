import React from 'react';

const Tabla = ({usuarios})=>{
    return (
        <div>
            <table className="table table-sm text-center" id="tbl">
                <thead>
                    <tr>
                        <th scope="col">Documento</th>
                        <th scope="col" data-priority="1">Nombres</th>
                        <th scope="col">Misena correo</th>
                        <th scope="col">Correo institucional</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Rol</th>
                        <th scope="col" data-priority="1">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map(usuario =>
                            <tr key={usuario.id}>
                                <td>{usuario.document}</td>
                                <td>{usuario.username}</td>
                                <td>{usuario.misena_email}</td>
                                <td>{usuario.institutional_email}</td>
                                <td>{usuario.state}</td>
                                <td data-priority="2">{usuario.rol.name}</td>
                                <td>
                                    <span className="d-lg-inline btn btn-outline-success btn-sm mt-1 col-md-6 btn-middle"
                                        data-target="#editar"
                                        data-toggle="modal"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </span>
                                    <span> </span>
                                    <span className="d-lg-inline btn btn-outline-danger btn-sm mt-1 col-md-6 btn-middle"
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
        </div>
    );
}
export default Tabla;