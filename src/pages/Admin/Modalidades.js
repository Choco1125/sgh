import React from 'react';
import Loader from '../../components/Loader';
import Navbar from './../../components/admin/Navbar';
import consumidor  from './../../helpers/consumidor';
import Modalidad from '../../components/admin/modalidades/modalidad';


class Modalidades extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            loader: true,
            modalidades: []
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
        console.log(res);
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
                                        delet={this}
                                        key={modalidad.id}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Modalidades;