import React from 'react';
import Navbar from './../../components/admin/Navbar';
import Loader from './../../components/Loader'
import consumidor from '../../helpers/consumidor';
import Tabla from './../../components/admin/usuarios/tabla';
import handleTabla from '../../helpers/handleTabla';

class Usuarios extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            loader:  true,
            users: []
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

    async componentDidMount(){
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
                            <button className="btn btn-success">
                                Crear <i className="fas fa-plus"></i>
                            </button>
                        </div>
                        <div>
                            <Tabla usuarios={this.state.users}/>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Usuarios;