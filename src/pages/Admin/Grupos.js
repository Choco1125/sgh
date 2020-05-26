import React from 'react';
import Loader from './../../components/Loader';
import Alert from './../../components/Alert';
import Navbar from './../../components/admin/Navbar';
import consumidor from './../../helpers/consumidor';
import Tabla from '../../components/admin/grupos/tabla';


class Grupos extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            loader: true,
            alert:{
                show: false,
                msj: '',
                type: ''
            },
            grupos: []
        }
    }

    getGrupos = async () => {
        let res = await consumidor.get('groups');
        console.log(res.groups);
        if(res.groups){
            this.setState({
                grupos:res.groups,
                loader: false
            });
        }
    }

    async componentDidMount(){
        await this.getGrupos();
    }

    render(){
        if(this.state.loader){
            return <Loader/>
        }else{
            return (
                <div>
                <Navbar active="grupos" />
                <div className="container">
                    <div className="row justify-content-end mt-3">
                        <button className="btn btn-success border mr-3" data-target="#crear" data-toggle="modal">Crear <i className="fas fa-plus"></i></button>
                    </div>
                    <div className="mt-2 mb-3">
                        <Tabla
                            grupos = {this.state.grupos}
                        />
                    </div>
                </div>
                <Alert 
                    show={this.state.alert.show} 
                    msj={this.state.alert.msj} 
                    tipo={this.state.alert.tipo} 
                />
            </div>
            );
        }
    }

}

export default Grupos;