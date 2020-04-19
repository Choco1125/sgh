import React from 'react';
import Loader from './../../components/Loader';
import Navbar from './../../components/admin/Navbar';
import consumidor from './../../helpers/consumidor';
import handleTabla from './../../helpers/handleTabla';
import Zona from '../../components/admin/zonas/zonas';
import Crear from '../../components/admin/zonas/crear';
import Alerta from './../../components/Alert';
import Eliminar from '../../components/admin/zonas/elminar';



class Zonas extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            loader: true,
            zonas:[],
            editar: {
                name: '',
                id: ''
            },
            eliminar:{
                id:''
            },
            alerta:{
                tipo: '',
                msj: '',
                shoW: ''
            }
        }
    }

    setEdit = (name,id) => {
        this.setState({
            editar:{
                name: name,
                id:id
            }
        });
    }

    setDelete = id =>{
        this.setState({
            eliminar:{
                id
            }
        });
    }

    getZonas = async ()=>{
        let res = await consumidor.get('zones');

        if(res){
            handleTabla.destroy('tbl')
            this.setState({
                zonas: res,
                loader: false
            });
            handleTabla.create('tbl');
        }

    }

    handleAlerta = (msj,tipo)=>{
        this.setState({
            alerta:{
                msj,
                tipo,
                show: true
            }
        });

        setTimeout(()=>this.setState({
            alerta:{
                show: true
            }
        }),2000);
    }

    async componentDidMount(){
        await this.getZonas();
    }

    render(){
        if(this.state.loader){
            return <Loader/>
        }else{
            return (
                <div>
                    <Navbar active="ubicaciones"/>
                    <div className="container">
                        <div className="row justify-content-end mt-3">
                            <button className="btn btn-success border mr-3" 
                                data-target="#crear" data-toggle="modal">
                                Crear <i className="fas fa-plus"></i>
                            </button>
                        </div>
                        <div className="row mt-2 mb-3 justify-content-center">
                            {
                                this.state.zonas.map((zona,i)=>
                                    <Zona
                                        key={i}
                                        datos={zona}
                                        delet={this.setDelete}
                                        edit={this.setEdit}
                                    />
                                )
                            }
                        </div>
                    </div>
                    <Crear 
                        update = {this.getZonas}
                        alerta = {this.handleAlerta}
                    />
                    <Eliminar 
                        id ={this.state.eliminar.id}
                        alerta = {this.handleAlerta}
                        update = {this.getZonas}
                    />
                    <Alerta 
                        tipo={this.state.alerta.tipo}
                        msj={this.state.alerta.msj}
                        show={this.state.alerta.show}
                    />
                </div>
            );
        }
    }

}

export default Zonas;