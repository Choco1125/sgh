import React from 'react';
import Nabvar from '../../components/admin/Navbar';
import consumidor from './../../helpers/consumidor';
// import handleTabla from './../../helpers/handleTabla';
import Tabla from './../../components/admin/usuariosTemporales/tabla';
import Loader from './../../components/Loader';
import Crear from './../../components/admin/usuariosTemporales/crear';

class UsuariosTemporales extends React.Component{

    constructor(props){
        super(props);

        this.state ={
            usuarios: [],
            loader: true
        }
    }

    getUsuarios = async ()=> {
        let datos = await consumidor.get('temporaryUserActivities');
        if(datos){
            this.setState({
                loader: false,
                usuarios: datos
            });
        }
    }

    async componentDidMount(){
        await this.getUsuarios();
        console.log(this.state.usuarios);
    }

    render() {
        if(this.state.loader){
            return <Loader/>
        }
        return (
            <div>
                <Nabvar active="usuarios"/>
                <div className="container">
                    <div className="row justify-content-end mt-3">
                        <button className="btn btn-success border mr-3" 
                            data-target="#crear" 
                            data-toggle="modal"
                        >
                            Crear <i className="fas fa-plus"></i>
                        </button>
                    </div>
                    <div className="row mt-2 mb-3">
                        <Tabla
                            datos={this.state.usuarios}
                        />
                    </div>
                </div>
                <Crear/>
            </div>
        )
    }
}

export default UsuariosTemporales;