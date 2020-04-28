import React from 'react';
import Navbar from './../../components/admin/Navbar';
import Loader from './../../components/Loader';
import consumidor from './../../helpers/consumidor';
import Rol from '../../components/admin/roles/rol';
import Editar from '../../components/admin/roles/editar';
import handleMayus from './../../helpers/handleMayus';
import Alert from './../../components/Alert'
import Eliminar from '../../components/admin/roles/eliminar';
import Crear from '../../components/admin/roles/crear';


class Roles extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            loader: true,
            roles: [],
            editar:{
                id: '',
                name:''
            },
            eliminar:{
                id: ''
            },
            alerta:{
                show: false,
                msj: '',
                tipo: ''
            }
        }
    }

    getRoles = async () =>{
        let res = await consumidor.get('rols');
        if(res){
            this.setState({
                roles: res,
                loader: false
            });
        }
    }

    setEdit = (name,id) => this.setState({
        editar:{
            id,
            name
        }
    });

    setDelete = id => this.setState({
        eliminar:{
            id
        }
    });

    handleChange = (e)=>{
        this.setState({
            editar:{
                ...this.state.editar,
                [e.target.name]: handleMayus(e.target.value)
            }
        });
    }

    handleAlerta = (msj,tipo)=>{
        this.setState({
            alerta:{
                show: true,
                msj,
                tipo
            }
        });

        setTimeout(()=>this.setState({
            alerta:{
                show: false
            }
        }),2000);
    }

    async componentDidMount(){
        await this.getRoles();
    }

    render() {
        if(this.state.loader){
            return <Loader/>

        }else{
            return (
                <div>
                    <Navbar active="parametrizacion"/>
                    <div className="container">
                        <div className="row justify-content-end mt-3">
                            <button className="btn btn-success border mr-3" data-target="#crear" data-toggle="modal">Crear <i className="fas fa-plus"></i></button>
                        </div>
                        <div className="row mt-2 justify-content-center">
                            {
                                this.state.roles.map(rol=> 
                                    <Rol 
                                        datos={rol} 
                                        key={rol.id}
                                        delet={this.setDelete}
                                        edit = {this.setEdit}
                                    />
                                )
                            }
                        </div>
                    </div>
                    <Editar 
                        datos={this.state.editar}
                        handleChange={this.handleChange}
                        actualizar={this.getRoles}
                        alerta={this.handleAlerta}
                    />
                    <Eliminar
                        datos={this.state.eliminar}
                        alerta={this.handleAlerta}
                        update={this.getRoles}
                    />
                    <Alert 
                        show={this.state.alerta.show}
                        msj={this.state.alerta.msj}
                        tipo={this.state.alerta.tipo}
                    />
                    <Crear
                        alerta={this.handleAlerta}
                        update={this.getRoles}
                    />
                </div>
            );
        }
       

    }

}

export default Roles;