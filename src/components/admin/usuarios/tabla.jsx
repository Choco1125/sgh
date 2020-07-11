import React from 'react';
import './../../css/tablas.css'
import { Link } from 'react-router-dom';
const Tabla = ({usuarios, setId})=>{
    return (
        <div>
            <table className="table table-sm text-center" id="tbl">
                <thead>
                    <tr>
                        <th scope="col" className="hide">Documento</th>
                        <th scope="col">Nombres</th>
                        <th scope="col" className="hide">Misena correo</th>
                        <th scope="col" className="hide">Correo institucional</th>
                        <th scope="col" className="hide">Estado</th>
                        <th scope="col" className="hide">Rol</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map(usuario =>
                            <tr key={usuario.id}>
                                <td className="hide">{usuario.document}</td>
                                <td >{usuario.username}</td>
                                <td className="hide">{usuario.misena_email}</td>
                                <td className="hide">{usuario.institutional_email}</td>
                                <td className="hide">{usuario.state}</td>
                                <td className="hide">{usuario.rol.name}</td>
                                <td>
                                    <Link to={`/coordinador/usuarios/editar/${usuario.id}`}>
                                        <span className="d-lg-inline btn btn-outline-success btn-sm mt-1 col-md-6 btn-middle"
                                            data-target="#editar"
                                            data-toggle="modal"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </span>
                                    </Link>
                                    <span> </span>
                                    <span className="d-lg-inline btn btn-outline-danger btn-sm mt-1 col-md-6 btn-middle"
                                        data-target="#eliminar"
                                        data-toggle="modal"
                                        onClick = {() => setId(usuario.id)}
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