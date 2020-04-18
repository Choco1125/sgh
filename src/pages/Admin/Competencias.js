import React from 'react';
import Nabvar from '../../components/admin/Navbar';
import Ver from '../../components/admin/competencias/ver';
import Crear from '../../components/admin/competencias/crear';
import Eliminar from './../../components/admin/competencias/eliminar';
import Edit from './../../components/admin/competencias/edit';
import Api from './../../components/Api';
import $ from 'jquery';
import 'datatables.net-bs4/css/dataTables.bootstrap4.css';
import 'datatables.net-bs4/js/dataTables.bootstrap4.js';
import './../css/Competencias.css';
import Alert from '../../components/Alert';

import Loader from './../../components/Loader';


class Competencias extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            compencias: [],
            idDelete: 0,
            pos: 0,
            edit:{
                id:'',
                code: '',
                description: '',
                summary: '',
                hours: '',
                formationProgramId:{
                    value: '',
                    label: ''
                }
            },
            ver:{
                code: '',
                description: '',
                summary: '',
                hours: '',
                formationProgramId:''
            },   
            showAlert: false,
            alertMsj: '',
            alertTipo: '',

            loader: true,
            programas: []
        }
    }

    handleChange = (e) => {
        this.setState({
            edit: {
                ...this.state.edit,
                [e.target.name]: e.target.value.toLowerCase().charAt(0).toUpperCase() + e.target.value.slice(1)
            }
        });
    }

    handleChangeSelect = (e) => {
        this.setState({
            edit: {
                ...this.state.edit,
                formationProgramId:{
                    value: e.value,
                    label: e.label
                }
            }
        });
        document.getElementById('formationProgramId_edit').children[2].innerHTML = '';
    }

    async componentDidMount() {
        await this.pedirDatos();
        this.setState({
            loader: false
        });
    }

    componentDidUpdate() {
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

    pedirDatos = async () => {
        let token = sessionStorage.getItem('token');
        let datos = await Api('competences', 'GET', token, '');
        if (datos === "jwt expired") {
            sessionStorage.removeItem('token');
            window.location.href = "/";
        }else if (datos === "jwt malformed") {
            sessionStorage.removeItem('token');
            window.location.href = "/";
        }        
        else {
            this.setState({ compencias: datos });
            await this.getGrupos();
        }
    }

    getGrupos = async () =>{
        let res = await Api('formationPrograms','GET',sessionStorage.getItem('token'),'');
        let programas = [];
        for (let i = 0; i < res.length; i++) {
            programas.push({
                value: res[i].id,
                label: res[i].name
            });
        }
        this.setState({
            programas
        });
    }


    setView = pos => this.setState({ 
        id: this.state.compencias[pos].id,
        code: this.state.compencias[pos].code,
        description: this.state.compencias[pos].description,
        summary: this.state.compencias[pos].summary,
        hours: this.state.compencias[pos].hours
    });


    handleAlert = (tipo, mensaje)=>{
        this.setState({
            showAlert: true,
            alertTipo: tipo,
            alertMsj: mensaje
        });
        setTimeout(()=>this.setState({showAlert: false}),2000);
    }

    render() {

        if(this.state.loader){
            return <Loader/>
        }else{
            return (
                <div>
                    <Nabvar active="competencias" />
                    <div className="container">
                        <div className="row justify-content-end mt-3">
                            <button className="btn btn-primary border mr-3" data-target="#crear" data-toggle="modal">Crear <i className="fas fa-plus"></i></button>
                        </div>
                        <div className="row mt-2">
                            <div className="table-responsive">
                                <table className="table table-sm text-center" id="tbl">
                                    <thead>
                                        <tr>
                                            <th className="hiden">Código</th>
                                            <th className="reducir">Descripción</th>
                                            <th className="reducir">Resúmen</th>
                                            <th className="hiden">Horas</th>
                                            <th >Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.compencias.map(({ id, code, description, summary, hours,formationProgram }, i) => (
                                                <tr key={id} id={i}>
                                                    <td className="hiden">{code}</td>
                                                    <td className="reducir">{description}</td>
                                                    <td className="reducir">{summary}</td>
                                                    <td className="hiden">{hours}</td>
                                                    <td className="align-items-center">
                                                        <span 
                                                            className="d-md-inline btn btn-outline-success btn-sm mt-1 col-6 
                                                            col-md-6 btn-middle" 
                                                            data-target="#editar" 
                                                            data-toggle="modal" 
                                                            onClick={() => this.setState({
                                                                edit:{
                                                                    id:id,
                                                                    code: code,
                                                                    description: description,
                                                                    summary: summary,
                                                                    hours: hours,
                                                                    formationProgramId:{
                                                                        value: formationProgram.id,
                                                                        label: formationProgram.name
                                                                    }
                                                                }
                                                            })}
                                                        >
                                                            <i className="fas fa-edit"></i>
                                                        </span>
                                                        <span> </span>
                                                        <span className="d-md-inline btn btn-outline-danger btn-sm mt-1 col-6 col-md-6 btn-middle" data-target="#eliminar" data-toggle="modal" onClick={() => this.setState({ idDelete: id })}>
                                                            <i className="fas fa-trash-alt"></i>
                                                        </span>
                                                        <span> </span>
                                                        <span 
                                                            className="d-md-none d-sm-inline btn btn-outline-primary btn-sm mt-1 col-6 
                                                                col-md-6 btn-middle" 
                                                            data-target="#ver" 
                                                            data-toggle="modal" 
                                                            onClick={() => this.setState({
                                                                ver:{
                                                                    code: code,
                                                                    description: description,
                                                                    summary: summary,
                                                                    hours: hours,
                                                                    formationProgramId:formationProgram.name
                                                                }
                                                            })}
                                                        >
                                                            <i className="fas fa-eye"></i>
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Edit
                            datos={this.state.edit}
                            handleChange={this.handleChange}
                            handleChangeSelect={this.handleChangeSelect}
                            pedirDatos={this.pedirDatos}
                            alert={this.handleAlert}
                            programas={this.state.programas}
                        />
                        <Ver
                            datos={this.state.ver}
                        /> 
                        <Crear pedirDatos={this.pedirDatos} 
                            alert={this.handleAlert} 
                            programas={this.state.programas} 
                        />
                        <Eliminar id={this.state.idDelete} pedirDatos={this.pedirDatos} alert={this.handleAlert} />
                    </div>
                    <Alert show={this.state.showAlert} msj={this.state.alertMsj} tipo={this.state.alertTipo}/>
                </div>
            );
        }

    }
}

export default Competencias;