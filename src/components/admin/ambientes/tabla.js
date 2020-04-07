import React from 'react';


import $ from 'jquery';
import 'datatables.net-bs4/css/dataTables.bootstrap4.css';
import 'datatables.net-bs4/js/dataTables.bootstrap4.js';
import Delete from './delete';
import Editar from './editar';
import View from './view';


class Tabla extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            delete:{
                id: 0
            },
            edit:{
                id: '',
                name: '',
                state: '',
                usability: ''
            },
            view:{
                name: '',
                state: '',
                usability: ''
            }
        }
    }

    handleChange = (e)=> {
        this.setState({
            edit: {
                ...this.state.edit,
                [e.target.name]: e.target.value.toLowerCase().charAt(0).toUpperCase() + e.target.value.slice(1)
            }
        });
    }


    componentDidUpdate(){
        $('#tbl').DataTable({
            retrieve: true,
            "language": {
                "lengthMenu": "Mostrar _MENU_ registros",
                "zeroRecords": "No se encontraron resultados",
                "info": "",
                "infoEmpty": "",
                "infoFiltered": "",
                "sSearch": "Buscar:",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast": "Último",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior"
                },
                "sProcessing": "",
            }
        });
    }

    render() {
        return (
            <>
            <table className="table table-sm text-center" id="tbl">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Usabilidad</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {   
                        this.props.datos.map(({ id, name, state, usability }, i) => (
                            <tr key={id} id={i}>
                                <td>{name}</td>
                                <td>{state}</td>
                                <td>{usability}</td>
                                <td className="align-items-center">
                                    <span className="d-md-inline btn btn-outline-success btn-sm mt-1 col-6 col-md-6 btn-middle" data-target="#editar" data-toggle="modal" 
                                    onClick={() => this.setState({edit:{
                                        id: id,
                                        name: name,
                                        state: state,
                                        usability: usability
                                    }})}>
                                        <i className="fas fa-edit"></i>
                                    </span>
                                    <span> </span>
                                    <span className="d-md-inline btn btn-outline-danger btn-sm mt-1 col-6 col-md-6 btn-middle" data-target="#eliminar" data-toggle="modal" 
                                    onClick={() => this.setState({delete:{id: id}})}>
                                        <i className="fas fa-trash-alt"></i>
                                    </span>
                                    <span> </span>
                                    <span className="d-md-none d-sm-inline btn btn-outline-primary btn-sm mt-1 col-6 col-md-6 btn-middle" data-target="#ver" data-toggle="modal" 
                                    onClick={() => this.setState({view:{
                                        name: name,
                                        state: state,
                                        usability: usability
                                    }})}>
                                        <i className="fas fa-eye"></i>
                                    </span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Delete id={this.state.delete.id} update={this.props.update} alerta={this.props.alerta}/>
            <Editar datos={this.state.edit} update={this.props.update} alerta={this.props.alerta} handleChange={this.handleChange}/>
            <View datos={this.state.view}/>
            </>
        );
    }
}
export default Tabla;