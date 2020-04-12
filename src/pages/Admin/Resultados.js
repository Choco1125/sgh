import React from 'react';
import Loader from './../../components/Loader';
import Alert from './../../components/Alert';
import Navbar from './../../components/admin/Navbar';
import Api from './../../components/Api';
import $ from 'jquery';
import Tabla from './../../components/admin/resultados/tabla';


class Resultados extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            loader: true,
            alert:{
                show: false,
                msj: '',
                type: ''
            },
            resultados: []
        }
    }

    getResultados = async () => {
        try{
            let datos = await Api('learningResults','GET',sessionStorage.getItem('token'),'');
            if (datos === "jwt expired") {
                sessionStorage.removeItem('token');
                window.location.href = "/";
            }else if (datos === "jwt malformed") {
                sessionStorage.removeItem('token');
                window.location.href = "/";
            }        
            else {
                console.log(datos);
                $('#tbl').DataTable().destroy();
                this.setState({
                    loader: false,
                    resultados: datos
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
        await this.getResultados();
    }

    render(){
        if(this.state.loader){
            return <Loader/>
        }else{
            return (
                <div>
                <Navbar active="competencias" />
                <div className="container">
                    <div className="row justify-content-end mt-3">
                        <button className="btn btn-primary border mr-3" data-target="#crear" data-toggle="modal">Crear <i className="fas fa-plus"></i></button>
                    </div>
                    <div className="mt-2 mb-3">
                        <Tabla datos = {this.state.resultados}/>
                    </div>
                </div>
                <Alert show={this.state.alert.show} msj={this.state.alert.msj} tipo={this.state.alert.tipo} update={this.getPrograms}/>
            </div>
            );
        }
    }

}

export default Resultados;