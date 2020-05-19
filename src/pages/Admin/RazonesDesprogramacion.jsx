import React from 'react';
import Nabvar from '../../components/admin/Navbar';
import consumidor from '../../helpers/consumidor';
import Tabla from '../../components/admin/razonesDesprogramacion/tabla';
import Crear from '../../components/admin/razonesDesprogramacion/crear';
import Loader from "../../components/Loader";
import Alerta from './../../components/Alert';
import Eliminar from '../../components/admin/razonesDesprogramacion/eliminar';
import handleTabla from '../../helpers/handleTabla';
import Editar from '../../components/admin/razonesDesprogramacion/editar';




class RazonesDesprogramacion extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            datos: [],
            loader: true,
            alerta:{
                show: false,
                msj: '',
                tipo: ''
            },
            eliminar:{
                id:''
            },
            editar:{
                id:'',
                name:''
            }
        }
    }

    getRazones= async ()=>{
        let datos = await consumidor.get('deprogrammingReasons');
        if(datos){
            handleTabla.destroy('tbl');
            this.setState({
                datos,
                loader: false
            });
            handleTabla.create('tbl');
        }
    }
    
    handleAlerta = (msj,tipo)=>{
        this.setState({
            alerta:{
                show: true,
                msj,
                tipo
            }
        });

        setTimeout(()=>this.setState({alerta:{show: false}}),2000);
    }

    setEliminar = id=> this.setState({
        eliminar:{
            id
        }
    });

    setEditar = (name,id) => this.setState({
        editar:{
            id,
            name
        }
    });

    setName = name => this.setState({
        editar:{
            ...this.state.editar,
            name
        }
    });

    async componentDidMount(){
        await this.getRazones();
    }

    render(){
        if(this.state.loader){
            return  <Loader/>
        }else{
            return(
                <div>
                    <Nabvar active="desprogramacion"/>
                    <div className="container">
                        <div className="row justify-content-end mt-3">
                            <button className="btn btn-success border mr-3" 
                                data-target="#crear" 
                                data-toggle="modal"
                            >
                                Crear <i className="fas fa-plus"></i>
                            </button>
                        </div>
                        <div className="mt-2 mb-3">
                            <Tabla
                                datos={this.state.datos}
                                eliminar={this.setEliminar}
                                editar={this.setEditar}
                            />
                        </div>
                        <Crear
                            update = {this.getRazones}
                            alerta = {this.handleAlerta}
                        />
                    </div>
                    <Eliminar 
                        id={this.state.eliminar.id}
                        update={this.getRazones}
                        alerta={this.handleAlerta}
                    />
                    <Editar
                        name={this.state.editar.name}
                        id={this.state.editar.id}
                        setName={this.setName}
                        update={this.getRazones}
                        alerta={this.handleAlerta}
                    />
                    <Alerta {...this.state.alerta}/>
                </div>
            );
        }
    }
}

export default RazonesDesprogramacion;