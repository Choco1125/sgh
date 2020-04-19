import React from 'react';
import Loader from './../../components/Loader';
import Navbar from './../../components/admin/Navbar';
import consumidor from './../../helpers/consumidor';
import handleTabla from './../../helpers/handleTabla';
import Zona from '../../components/admin/zonas/zonas';




class Zonas extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            loader: true,
            zonas:[]
        }
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

        console.log(res);
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

export default Zonas;