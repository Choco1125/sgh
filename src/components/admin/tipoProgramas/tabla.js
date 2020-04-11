import React from 'react';
import Editar from './editar';
import Eliminar from './eliminar';
import Ver from './ver';

class Tabla extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editar: {
                id: 0,
                name: '',
                electiveMonths: '',
                practiceMonths: ''
            },
            eliminar: {
                id: 0
            },
            ver: {
                name: '',
                electiveMonths: 0,
                practiceMonths: 0
            }
        }
    }

    handleChange = (e) => {
        this.setState({
            editar: {
                ...this.state.editar,
                [e.target.name]: e.target.value.toLowerCase().charAt(0).toUpperCase() + e.target.value.slice(1)
            }
        });

    }

    handleChangeNumber = (e) => {
        this.setState({
            editar: {
                ...this.state.editar,
                [e.target.name]: e.target.value
            }
        });
    }

    render() {
        return (
            <div>
                <table className="table table-sm text-center" id="tbl">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Meses electivos</th>
                            <th>Meses de práctica</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.datos.map((programa, i) => {
                                return (
                                    <tr key={programa.id} id={i}>
                                        <td>{programa.name}</td>
                                        <td>{programa.electiveMonths}</td>
                                        <td >{programa.practiceMonths}</td>
                                        <td className="align-items-center">
                                            <span className="d-lg-inline btn btn-outline-success btn-sm mt-1 col-6 col-md-12 btn-middle"
                                                data-target="#editar"
                                                data-toggle="modal"
                                                onClick={() => this.setState({
                                                    editar: {
                                                        id: programa.id,
                                                        name: programa.name,
                                                        electiveMonths: programa.electiveMonths,
                                                        practiceMonths: programa.practiceMonths
                                                    }
                                                })}
                                            >
                                                <i className="fas fa-edit"></i>
                                            </span>
                                            <span> </span>
                                            <span className="d-lg-inline btn btn-outline-danger btn-sm mt-1 col-6 col-md-12 btn-middle"
                                                data-target="#eliminar"
                                                data-toggle="modal"
                                                onClick={() => this.setState({
                                                    eliminar: {
                                                        id: programa.id
                                                    }
                                                })}
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </span>
                                            <span> </span>
                                            <span className="d-md-none d-sm-inline btn btn-outline-primary btn-sm mt-1 col-6 col-md-12 btn-middle"
                                                data-target="#ver"
                                                data-toggle="modal"
                                                onClick={() => this.setState({
                                                    ver: {
                                                        name: programa.name,
                                                        electiveMonths: programa.electiveMonths,
                                                        practiceMonths: programa.practiceMonths
                                                    }
                                                })}
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
                <Editar datos={this.state.editar}
                    handleChange={this.handleChange}
                    handleChangeNumber={this.handleChangeNumber}
                    actualizar={this.props.update}
                    alerta={this.props.alerta}
                />
                <Eliminar id={this.state.eliminar.id}
                    update={this.props.update}
                    alerta={this.props.alerta}
                />
                <Ver datos={this.state.ver} />
            </div>
        );
    }

}

export default Tabla;