import React from 'react';
import Navbar from './../../components/admin/Navbar';
import Crear from './../../components/admin/programas/crear';
import $ from 'jquery';
import Alert from './../../components/Alert';
import Api from './../../components/Api';
import Tabla from '../../components/admin/programas/tabla';


import 'datatables.net-bs4/css/dataTables.bootstrap4.css';
import 'datatables.net-bs4/js/dataTables.bootstrap4.js';

import Loader from './../../components/Loader';

class Programas extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            alert:{
                show: false,
                tipo: '',
                msj: ''
            },
            programas: [],
            loader: true
        }
    }

    handleAlerta = (msj,tipo)=> {
        this.setState({
            alert:{
                show: true,
                tipo: tipo,
                msj: msj
            }
        });

        setTimeout(()=>this.setState({alert:{show: false}}),2000);
    }
    
    getPrograms = async ()=>{
        try{
            let datos = await Api('/formationPrograms','GET',sessionStorage.getItem('token'),'');
            if (datos === "jwt expired") {
                sessionStorage.removeItem('token');
                window.location.href = "/";
            }else if (datos === "jwt malformed") {
                sessionStorage.removeItem('token');
                window.location.href = "/";
            }        
            else {
                $('#tbl').DataTable().destroy();
                this.setState({
                    loader: false
                });
                this.setState({
                    programas: datos
                });
                $('#tbl').DataTable({
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
        }catch(err){
            console.log(err);
        }
    }

    async componentDidMount(){
        $('[data-toggle="tooltip"]').tooltip();
        await this.getPrograms();
        
    }

    render() {
        if(this.state.loader){
            return <Loader/>
        }else{
            return (
                <div>
                    <Navbar active="programas" />
                    <div className="container">
                        <div className="row justify-content-end mt-3">
                            <button className="btn btn-success border mr-3" data-target="#crear" data-toggle="modal">Crear <i className="fas fa-plus"></i></button>
                        </div>
                        <div className="mt-2 mb-3">
                            <Tabla datos={this.state.programas} alerta={this.handleAlerta} update={this.getPrograms}/>
                        </div>
                    </div>
                    <Crear alerta={this.handleAlerta} update={this.getPrograms}/>
                    <Alert show={this.state.alert.show} msj={this.state.alert.msj} tipo={this.state.alert.tipo} update={this.getPrograms}/>
                </div>
            );
        }
    }
}

export default Programas;