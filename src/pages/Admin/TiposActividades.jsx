import React from 'react';
import Navbar from './../../components/admin/Navbar';
import consumidor from './../../helpers/consumidor';
import Loader from './../../components/Loader'
import handleTabla from './../../helpers/handleTabla';
import Tabla from '../../components/admin/tiposActividades/tabla';
import Crear from '../../components/admin/tiposActividades/crear';
import Alert from './../../components/Alert';
import Eliminar from '../../components/admin/tiposActividades/eliminar';
import Editar from '../../components/admin/tiposActividades/editar';


class TiposActividades extends React.Component {

    constructor(props){
        super(props);
        
        this.state ={
            actividades : [],
            alerta:{
                show: false,
                msj: '',
                tipo: ''
            },
            datos: {
                id: '',
                name: '',
                color: ''
            },
            loader: true
        }

    }

    getActividades = async ()=>{
        let actividades = await consumidor.get('typeActivities');
        if(actividades){
            handleTabla.destroy('tbl');
            this.setState({
                loader: false,
                actividades
            });
            handleTabla.create('tbl');
        }
    }

    handleAlerta = async (msj,tipo) =>{
        this.setState({
            alerta:{
                show: true,
                msj,
                tipo
            }
        });

        setTimeout(()=>this.setState({alerta:{show: false}}),2000);
    }

    setEditar = (id,name,color)=>this.setState({datos:{
        id,
        name,
        color
    }});

    setEliminar = id => this.setState({
        datos:{
            id,
            name: '',
            color: '#000000'
        }
    });

    setNombre = name => this.setState({
        datos:{
            ...this.state.datos,
            name
        }
    });

    setColor = color => this.setState({
        datos:{
            ...this.state.datos,
            color
        }
    });

    async componentDidMount(){
        await this.getActividades();
    }

    render() {
        if(this.state.loader){
            return <Loader/>
        }else{
            return (
                <div>
                    <Navbar active="tipoActividades" />
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
                                actividades ={this.state.actividades}
                                setEditar = {this.setEditar}
                                setEliminar = {this.setEliminar}
                            />
                        </div>
                        <Crear
                            update = {this.getActividades}
                            alerta = {this.handleAlerta}
                        />
                        <Editar
                            update = {this.getActividades}
                            alerta = {this.handleAlerta}
                            name = {this.state.datos.name}
                            setName = {this.setNombre}
                            color = {this.state.datos.color}
                            setColor = {this.setColor}
                            id = {this.state.datos.id}
                        />
                        <Eliminar
                            update = {this.getActividades}
                            alerta = {this.handleAlerta}
                            id = {this.state.datos.id}
                        />
                    </div>
                    <Alert {...this.state.alerta} />
                </div>
            );
        }
    }
}

export default TiposActividades;