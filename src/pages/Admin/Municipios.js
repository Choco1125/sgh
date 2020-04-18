import React from 'react';
import Navbar from './../../components/admin/Navbar';
import consumidor from './../../helpers/consumidor';
import Loader from './../../components/Loader';
import validador from './../../helpers/validador';
import Tabla from '../../components/admin/Municipios/tabla';

class Municipios extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loader: true,
            municipios: [],
        }
    }

    getMunicipios = async () => {
        let data = await consumidor.get('municipalities');
        
        validador(data);
        
        if (data) {
            this.setState({
                municipios: data,
                loader: false
            });
            console.log(data);
        }

    }

    async componentDidMount() {
        await this.getMunicipios();
    }

    render() {
        if (this.state.loader)
            return <Loader />
        return (
            <div>
                <Navbar active="ubicaciones" />
                <div className="container">
                    <div className="row justify-content-end mt-3">
                        <button 
                            className="btn btn-success border mr-3" 
                            data-target="#crear"
                            data-toggle="modal"
                        >
                            Crear 
                            <i className="ml-1 fas fa-plus"></i>
                        </button>
                    </div>
                    <div className="mt-1 mb-2">
                        <Tabla datos={this.state.municipios}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Municipios;