import React from 'react';
import Navbar from './../../components/admin/Navbar';
import consumidor from './../../helpers/consumidor';
import Loader from './../../components/Loader';
import Tabla from '../../components/admin/Municipios/tabla';
import Crear from '../../components/admin/Municipios/crear';
import Alert from './../../components/Alert';
import handleTabla from './../../helpers/handleTabla';
import { Breadcrumb } from '../../components/Breadcrumb';

const routes = [
    {
        name: 'Inicio',
        link: '/coordinador/',
        isLink: true
    },
    {
        name: 'Ubicaciones',
        link: '/coordinador/municipios',
        isLink: true
    },
    {
        name: 'Municipios',
        link: '/coordinador/municipios',
        isLink: false
    }
];

class Municipios extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loader: true,
            municipios: [],
            zonas: [],
            alert: {
                show: false,
                tipo: '',
                msj: ''
            }
        }
    }

    getMunicipios = async () => {
        let data = await consumidor.get('municipalities');


        if (data) {
            handleTabla.destroy('tbl');
            this.setState({
                municipios: data,
                loader: false
            });
            handleTabla.create('tbl');
            await this.getZonas();
        }

    }

    getZonas = async () => {
        let data = await consumidor.get('zones');
        if (data) {

            let zonas = [];

            for (let i = 0; i < data.length; i++) {
                zonas.push({
                    value: data[i].id,
                    label: data[i].name
                });
            }

            this.setState({
                zonas
            });
        }

    }

    handleAlert = (tipo, msj) => {
        this.setState({
            alert: {
                show: true,
                tipo,
                msj
            }
        });
        setTimeout(() => this.setState({
            alert: {
                show: false
            }
        }), 2000);
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
                    <div className="row justify-content-between mt-3">
                        <div>
                            <Breadcrumb routes={routes} />
                        </div>
                        <div>
                            <button
                                className="btn btn-success border mr-3"
                                data-target="#crear"
                                data-toggle="modal"
                            >
                                Crear
                                <i className="ml-1 fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="mt-1 mb-2">
                        <Tabla
                            datos={this.state.municipios}
                            zonas={this.state.zonas}
                            update={this.getMunicipios}
                            alerta={this.handleAlert}
                        />
                    </div>
                </div>
                <Crear
                    zonas={this.state.zonas}
                    alerta={this.handleAlert}
                    update={this.getMunicipios}
                />
                <Alert
                    tipo={this.state.alert.tipo}
                    msj={this.state.alert.msj}
                    show={this.state.alert.show}
                />
            </div>
        );
    }
}

export default Municipios;