import React from 'react';
import Nabvar from '../../components/admin/Navbar';

import Api from "./../../components/Api";
import $ from 'jquery';
import Tabla from "./../../components/admin/ambientes/tabla";
import Crear from "./../../components/admin/ambientes/crear";
import Alert from '../../components/Alert';

class Ambientes extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            ambientes: [],
            delete:{
                id:0
            },
            alerta:{
                show: false,
                tipo: '',
                msj: ''
            }
        }
    }
        
    pedirDatos = async () => {
        let token = sessionStorage.getItem('token');
        let datos = await Api('ambients', 'GET', token, '');
        if (datos === "jwt expired") {
            sessionStorage.removeItem('token');
            window.location.href = "/";
        }else if (datos === "jwt malformed") {
            sessionStorage.removeItem('token');
            window.location.href = "/";
        }        
        else {
            $('#tbl').DataTable().destroy();
            this.setState({ambientes: datos});
        }
    }

    hadleAlert = (msj,tipo)=>{
        console.log(msj,tipo)
        this.setState({
            alerta:{
                show: true,
                tipo: tipo,
                msj: msj
            }
        });
        setTimeout(()=>this.setState({alerta:{show:false}}),2000);
    }

    async componentDidMount(){
        await this.pedirDatos();
    }

    render(){
        return(
            <div>
                <Nabvar active="ambientes"/>
                <div className="container">
                    <div className="row justify-content-end mt-3">
                        <button className="btn btn-primary border mr-3" data-target="#crear" data-toggle="modal">Crear <i className="fas fa-plus"></i></button>
                    </div>
                    <div className="row mt-2">
                        <div className="table-responsive">
                            <Tabla datos={this.state.ambientes} update={this.pedirDatos} alerta={this.hadleAlert}/>
                        </div>
                    </div>
                </div>
                <Crear update={this.pedirDatos} alerta={this.hadleAlert}/>
                <Alert show={this.state.alerta.show} tipo={this.state.alerta.tipo} msj={this.state.alerta.msj}/>
            </div>
        );
    }
}

export default Ambientes;