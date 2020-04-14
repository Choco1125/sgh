import React from 'react';
import Eliminar from './eliminar';


class Tabla extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            delete:{
                id: ''
            }
        }
    }

    render() {
        return (
            <div>
                <table className="table table-sm text-center" id="tbl">
                    <thead>
                        <tr>
                            <th>Descripción</th>
                            <th>Resumen</th>
                            <th>Comptencia asociada</th>
                            <th>Trimestre Evaluado</th>
                            <th>horas</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.datos.map((resultado, i) => {
                                return (
                                    <tr key={resultado.id} id={i}>
                                        <td>{resultado.description}</td>
                                        <td>{resultado.summary}</td>
                                        <td>{resultado.competence.description}</td>
                                        <td>{resultado.trimesterEvaluate}</td>
                                        <td >{resultado.hours}</td>
                                        <td className="align-items-center">
                                            <span className="d-lg-inline btn btn-outline-success btn-sm mt-1 col-6 col-md-12 btn-middle"
                                                data-target="#editar"
                                                data-toggle="modal"
                                               
                                            >
                                                <i className="fas fa-edit"></i>
                                            </span>
                                            <span> </span>
                                            <span className="d-lg-inline btn btn-outline-danger btn-sm mt-1 col-6 col-md-12 btn-middle"
                                                data-target="#eliminar"
                                                data-toggle="modal"
                                                onClick = {()=>this.setState({
                                                    delete:{
                                                        id: resultado.id
                                                    }
                                                })}
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </span>
                                            <span> </span>
                                            <span className="d-lg-none d-md-inline-block btn btn-outline-primary btn-sm mt-1 col-6 col-md-12 btn-middle"
                                                data-target="#ver"
                                                data-toggle="modal"
                                                
                                            >
                                                <i className="fas fa-eye"></i>
                                            </span>
                                        </td>
                                    </tr>
                                )
                            }
                            )
                        }
                    </tbody>
                </table>
                <Eliminar 
                    id = {this.state.delete.id}
                    alerta = {this.props.alerta}
                    update = {this.props.update}
                />
            </div>
        );
    }

}

export default Tabla;