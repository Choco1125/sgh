import React from 'react';
import Navbar from './../../components/admin/Navbar';
import Loader from './../../components/Loader'
import consumidor from '../../helpers/consumidor';
import Tabla from './../../components/admin/usuarios/tabla';
import handleTabla from '../../helpers/handleTabla';
import Crear from '../../components/admin/usuarios/crear';
import Alert from '../../components/Alert';
import Eliminar from '../../components/admin/usuarios/eliminar';

class Usuarios extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            loader:  true,
            users: [],
            cargos: [{
                label: '',
                values: ''
            }],
            tipoContrato: [{
                label: '',
                values: ''
            }],
            rols: [{
                label: '',
                values: ''
            }],
            alerta:{
                show: false,
                tipo: '',
                msj: ''
            },
            editar:{
                id: ''
            }
        }
    }

    handleAlerta = (tipo, msj) => {
        this.setState({
            alerta:{
                show: true,
                tipo,
                msj
            }
        });

        setTimeout(()=>this.setState({
            alerta: {
                show: false
            }
        }),2000);
    }

    getRols = async () => {
        let response = await consumidor.get('rols');
        if(response){
            let roles = [];
            response.map(rol => roles.push({
                label: rol.name,
                value: rol.id
            }));
            this.setState({
                rols: roles
            });
        }
    }

    getCargos = async () => {
        let response = await consumidor.get('positions');
        
        if(response){
            let jsonCargos = [];

            response.map(cargo => jsonCargos.push({
                value: cargo.id,
                label: cargo.name
            }));

            this.setState({
                cargos : jsonCargos
            });
        }
    }

    getTipoDeContratos = async () => {
        let response = await consumidor.get('contractTypes');

        if(response){
            let JSONTipoDeContrato = [];

            response.map(tipoContrato => JSONTipoDeContrato.push({
                label: tipoContrato.name,
                value: tipoContrato.id
            }));
            
            this.setState({
                tipoContrato: JSONTipoDeContrato
            });
        }
    }

    getUsuarios = async ()=>{
        handleTabla.destroy('tbl');
        let res =  await consumidor.get('users');
        if (res) {
            this.setState({
                users: res.users,
                loader: false
            });
        }
        handleTabla.create('tbl');
    }

    setId = id => this.setState({
        editar:{
            id
        }
    });

    async componentDidMount(){
        await this.getRols();
        await this.getTipoDeContratos();
        await this.getCargos();
        await this.getUsuarios();
    }

    render(){
        if(this.state.loader){
            return <Loader/>
        }else{
            return(
                <div>
                    <Navbar active="usuarios"/>
                    <div className="container">
                        <div className="row justify-content-end mt-3 mb-3">
                            <button 
                                className="btn btn-success"
                                data-target="#crear"
                                data-toggle="modal"
                            >
                                Crear <i className="fas fa-plus"></i>
                            </button>
                        </div>
                        <div>
                            <Tabla usuarios={this.state.users} setId={this.setId}/>
                        </div>
                    </div>
                    <Crear
                        cargos={this.state.cargos}
                        tiposContratos={this.state.tipoContrato}
                        rols={this.state.rols}
                        update = {this.getUsuarios}
                        alerta = {this.handleAlerta}
                    />
                    <Eliminar 
                        id={this.state.editar.id}
                        alerta = {this.handleAlerta}
                        update = {this.getUsuarios}
                    />
                    <Alert {...this.state.alerta}/>
                </div>
            );
        }
    }
}

export default Usuarios;