import React from 'react';


class Tabla extends React.Component{  

    render(){
        return(
            <div>
                <table className="table table-sm text-center" id="tbl">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Zona</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.datos.map((municipio, i) => {
                                return (
                                    <tr key={municipio.id} id={i}>
                                        <td>{municipio.name}</td>
                                        <td>{municipio.zone.name}</td>
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
                                            <span> </span>
                                        </td>
                                    </tr>
                                )
                            }
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }

}

export default Tabla;