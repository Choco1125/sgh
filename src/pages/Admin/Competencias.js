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


class Competencias extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            compencias: [],
            idDelete: 0,
            pos: 0,
            
            id: '',
            code: '',
            description: '',
            summary: '',
            hours: '',
           
            erroDescrip: '',
            msjDes: '',
            erroResu: '',
            msjResu: '',

            showAlert: false,
            alertMsj: '',
            alertTipo: ''
        }
    }

    //Setters
    setCode = valor => this.setState({code: valor});
    setDescription = valor => this.setState({description: valor});
    setSummary = valor => this.setState({summary: valor});
    setHours = valor => this.setState({hours: valor});

    //Manejo de errores
    addErrorDescripcion = msj => {
        this.setState({ erroDescrip: 'is-invalid' });
        this.setState({ msjDes: msj });
    }

    removeErrorDescripcion = () => {
        this.setState({ erroDescrip: '' });
        this.setState({ msjDes: '' });
    }


    addErrorResumen = msj => {
        this.setState({ erroResu: 'is-invalid' });
        this.setState({ msjResu: msj });
    }

    removeErrorResumen = () => {
        this.setState({ erroResu: '' });
        this.setState({ msjResu: '' });
    }

    async componentDidMount() {
        await this.pedirDatos();
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
        }
    }

    setEdit = pos => this.setState({ 
        id: this.state.compencias[pos].id,
        code: this.state.compencias[pos].code,
        description: this.state.compencias[pos].description,
        summary: this.state.compencias[pos].summary,
        hours: this.state.compencias[pos].hours
    });

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
                                        this.state.compencias.map(({ id, code, description, summary, hours }, i) => (
                                            <tr key={id} id={i}>
                                                <td className="hiden">{code}</td>
                                                <td className="reducir">{description}</td>
                                                <td className="reducir">{summary}</td>
                                                <td className="hiden">{hours}</td>
                                                <td className="align-items-center">
                                                    <span className="d-md-inline btn btn-outline-success btn-sm mt-1 col-6 col-md-6 btn-middle" data-target="#editar" data-toggle="modal" onClick={() => this.setEdit(i)}>
                                                        <i className="fas fa-edit"></i>
                                                    </span>
                                                    <span> </span>
                                                    <span className="d-md-inline btn btn-outline-danger btn-sm mt-1 col-6 col-md-6 btn-middle" data-target="#eliminar" data-toggle="modal" onClick={() => this.setState({ idDelete: id })}>
                                                        <i className="fas fa-trash-alt"></i>
                                                    </span>
                                                    <span> </span>
                                                    <span className="d-md-none d-sm-inline btn btn-outline-primary btn-sm mt-1 col-6 col-md-6 btn-middle" data-target="#ver" data-toggle="modal" onClick={() => this.setView(i)}>
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
                        id={this.state.id} 
                        code={this.state.code} 
                        description={this.state.description} 
                        summary={this.state.summary} 
                        hours={this.state.hours} 
                        setCode={this.setCode}
                        setDescription={this.setDescription}
                        setSummary={this.setSummary}
                        setHours={this.setHours}
                        addErrorDescripcion={this.addErrorDescripcion}
                        removeErrorDescripcion={this.removeErrorDescripcion}
                        addErrorResumen={this.addErrorResumen}
                        removeErrorResumen={this.removeErrorResumen}
                        pedirDatos={this.pedirDatos}
                        alert={this.handleAlert}
                    />
                    <Ver
                        id={this.state.id} 
                        code={this.state.code} 
                        description={this.state.description} 
                        summary={this.state.summary} 
                        hours={this.state.hours} 
                    /> 
                    <Crear pedirDatos={this.pedirDatos} alert={this.handleAlert} />
                    <Eliminar id={this.state.idDelete} pedirDatos={this.pedirDatos} alert={this.handleAlert} />
                </div>
                <Alert show={this.state.showAlert} msj={this.state.alertMsj} tipo={this.state.alertTipo}/>
            </div>
        );
    }
}

export default Competencias;