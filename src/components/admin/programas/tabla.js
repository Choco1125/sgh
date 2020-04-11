import React from 'react';
import 'datatables.net-bs4/css/dataTables.bootstrap4.css';
import 'datatables.net-bs4/js/dataTables.bootstrap4.js';
import './tabla.css'
import Editar from './editar';
import Eliminar from './eliminar';
import Ver from './ver';


class Tabla extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            datos: {
                id: '',
                code: '',
                name: '',
                formationTypeId: '',
                isRegisterQualified: false,
                isRegisterQualifiedDate: ''
            },
            ver: {
                code: '',
                name: '',
                formationType: '',
                isRegisterQualified: false,
                isRegisterQualifiedDate: ''
            },
            eliminar:{
                id:''
            }
        }
    }

    handleChange = (e) => {
        this.setState({
            datos: {
                ...this.state.datos,
                [e.target.name]: e.target.value.toLowerCase().charAt(0).toUpperCase() + e.target.value.slice(1)
            }
        });
    }

    changeQualifiqued = () => {
        this.setState({
            datos: {
                ...this.state.datos,
                isRegisterQualified: !this.state.datos.isRegisterQualified
            }
        });
    }

    render() {
        return (
            <div>
                <table className="table table-sm text-center" id="tbl">
                    <thead>
                        <tr>
                            <th className="hiden">Código</th>
                            <th>Nombre</th>
                            <th>Formación</th>
                            <th className="pequena hiden">Registro cualificado</th>
                            <th className="pequena hiden">Fecha registro cualificado</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.datos.map((programa, i) => {
                                let fecha = (programa.isRegisterQualifiedDate !== null) ? programa.isRegisterQualifiedDate.split('T') : '';
                                return (
                                    <tr key={programa.id} id={i}>
                                        <td className="hiden">{programa.code}</td>
                                        <td>{programa.name}</td>
                                        <td >{programa.formationType.name}</td>
                                        <td className="pequena hiden">{(programa.isRegisterQualified) ? <span>Sí</span> : <span className="text-danger">No</span>}</td>
                                        <td className="pequena hiden">{fecha[0]}</td>
                                        <td className="align-items-center">
                                            <span className="d-lg-inline btn btn-outline-success btn-sm mt-1 col-6 col-md-12 btn-middle"
                                                data-target="#editar"
                                                data-toggle="modal"
                                                onClick={() => this.setState({
                                                    datos: {
                                                        id: programa.id,
                                                        code: programa.code,
                                                        name: programa.name,
                                                        formationTypeId: programa.formationType.id,
                                                        isRegisterQualified: programa.isRegisterQualified,
                                                        isRegisterQualifiedDate: fecha[0]
                                                    }
                                                })}
                                            >
                                                <i className="fas fa-edit"></i>
                                            </span>
                                            <span> </span>
                                            <span className="d-lg-inline btn btn-outline-danger btn-sm mt-1 col-6 col-md-12 btn-middle" 
                                                data-target="#eliminar" 
                                                data-toggle="modal"
                                                onClick = {()=>this.setState({
                                                    eliminar:{
                                                        id: programa.id
                                                    }
                                                })}
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </span>
                                            <span> </span>
                                            <span className="d-lg-none d-md-inline-block btn btn-outline-primary btn-sm mt-1 col-6 col-md-12 btn-middle" 
                                                data-target="#ver" 
                                                data-toggle="modal"
                                                onClick={()=>this.setState({
                                                    ver:{
                                                        code: programa.code,
                                                        name: programa.name,
                                                        formationType: programa.formationType.name,
                                                        isRegisterQualified: programa.isRegisterQualified,
                                                        isRegisterQualifiedDate: fecha[0]
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
                <Editar datos={this.state.datos} handleChange={this.handleChange} changeQualifiqued={this.changeQualifiqued} alerta={this.props.alerta} update={this.props.update}/>
                <Eliminar id={this.state.eliminar.id} update={this.props.update} alerta={this.props.alerta}/>
                <Ver datos={this.state.ver}/>
            </div>
        );
    }

}

export default Tabla;