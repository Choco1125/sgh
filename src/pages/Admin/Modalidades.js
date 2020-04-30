import React from 'react';
import Loader from '../../components/Loader';
import Navbar from './../../components/admin/Navbar';
import consumidor  from './../../helpers/consumidor';
import Modalidad from '../../components/admin/modalidades/modalidad';
import Crear from '../../components/admin/modalidades/crear';
import Alert from './../../components/Alert';
import Eliminar from '../../components/admin/modalidades/eliminar';
import handleMayus from '../../helpers/handleMayus';
import Editar from '../../components/admin/modalidades/editar';



class Modalidades extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            loader: true,
            modalidades: [],
            alerta:{
                show: false,
                msj: '',
                tipo: ''
            },
            edit:{
                id:'',
                name:''
            },
            delete:{
                id: ''
            }
        }
    }

    getModalidades = async ()=>{
        let res = await consumidor.get('modalities');
        if(res){
            this.setState({
                loader: false,
                modalidades: res
            });    
        }
    }
    
    setEdit= (name,id)=> this.setState({
        edit:{
            id,
            name
        }
    });

    setDelete = id => this.setState({
        delete:{
            id
        }
    });

    handleAlerta = (msj,tipo)=>{
        this.setState({
            alerta:{
                show: true,
                msj,
                tipo
            }
        });

        setTimeout(()=> this.setState({
            alerta:{
                show: true
            }
        }),2000);
    } 

    handleChange= e=>this.setState({
        edit:{
            ...this.state.edit,
            [e.target.name]: handleMayus(e.target.value)
        }
    });

    async componentDidMount(){
        await this.getModalidades();
    }

    render(){
        if(this.state.loader){
            return <Loader/>
        }else{
            return(
                <div>
                    <Navbar active="programas"/>
                    <div className="container">
                        <div className="row justify-content-end mt-3">
                            <button className="btn btn-success border mr-3" data-target="#crear" data-toggle="modal">Crear <i className="fas fa-plus"></i></button>
                        </div>
                        <div className="row mt-2 justify-content-center">
                            {
                                this.state.modalidades.map(modalidad=> 
                                    <Modalidad
                                        datos={modalidad}
                                        edit={this.setEdit}
                                        delet={this.setDelete}
                                        key={modalidad.id}
                                    />
                                )
                            }
                        </div>
                    </div>
                    <Crear
                        update={this.getModalidades}
                        alerta={this.handleAlerta}
                    />
                    <Editar
                        datos={this.state.edit}
                        handleChange={this.handleChange}
                        update={this.getModalidades}
                        alerta={this.handleAlerta}
                    />
                    <Eliminar
                        datos={this.state.delete}
                        alerta={this.handleAlerta}
                        update={this.getModalidades}
                    />
                    <Alert 
                        {...this.state.alerta}
                    />
                </div>
            );
        }
    }
}

export default Modalidades;