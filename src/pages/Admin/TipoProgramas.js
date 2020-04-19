import React from 'react';
import Navbar from './../../components/admin/Navbar';
import Api from './../../components/Api';
import Tabla from './../../components/admin/tipoProgramas/tabla';
import Crear from '../../components/admin/tipoProgramas/crear';
import Alerta from './../../components/Alert';
import Loader from './../../components/Loader';
import handleTabla from '../../helpers/handleTabla';



class TipoProgramas extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            tipoProgramas:[],
            alert:{
                show: false,
                msj: '',
                tipo: ''
            },
            loader: true
        }
    }

    getDatos= async ()=>{
        let datos = await Api('formationProgramTypes','GET',sessionStorage.getItem('token'),'');
        if (datos === "jwt expired" || datos === "jwt malformed" ) {
            sessionStorage.removeItem('token');
            window.location.href = "/";
        }else{
            handleTabla.destroy('tbl');
            this.setState({
                loader: false,
                tipoProgramas: datos
            });
            handleTabla.create('tbl');
        }
    }

    handleAlerta = (msj, tipo)=>{
        this.setState({
            alert:{
                show: true,
                msj: msj,
                tipo: tipo
            }
        });
        setTimeout(()=> this.setState({
            alert:{
                show: false
            }
        }),2000);
    }

    async componentDidMount(){
        await this.getDatos();
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
                            <button className="btn btn-success border mr-3" 
                                data-target="#crear" data-toggle="modal">
                                Crear <i className="fas fa-plus"></i>
                            </button>
                        </div>
                        <div className="mt-2">
                            <Tabla datos = {this.state.tipoProgramas} 
                                update = {this.getDatos}
                                alerta = {this.handleAlerta}
                            />
                        </div>
                    </div>
                    <Crear alerta = {this.handleAlerta} update = {this.getDatos}/>
                    <Alerta show={this.state.alert.show} msj={this.state.alert.msj} tipo={this.state.alert.tipo}/>
                </div>
            );
        }
    }
}

export default TipoProgramas;