import React from 'react';
import Navbar from './../../components/admin/Navbar';
import consumidor from '../../helpers/consumidor';
import Loader from '../../components/Loader';
import handleTabla from '../../helpers/handleTabla';
import Tabla from '../../components/admin/posiciones/tabla';
import Alert from '../../components/Alert';
import Crear from '../../components/admin/posiciones/crear';
import { Breadcrumb } from '../../components/Breadcrumb';

const routes = [
    {
        name: 'Inicio',
        link: '/coordinador/',
        isLink: true
    },
    {
        name: 'Parametrización',
        link: '/coordinador/posiciones',
        isLink: true
    },
    {
        name: 'Posiciones',
        link: '/coordinador/posiciones',
        isLink: false
    }
];

class Posiciones extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loader: {
                show: true
            },
            posiciones: [],
            alert: {
                show: false,
                msj: '',
                tipo: ''
            }
        }
    }

    getPosiciones = async () => {
        let datos = await consumidor.get('positions');
        if (datos) {
            handleTabla.destroy('tbl');
            this.setState({
                posiciones: datos,
                loader: {
                    show: false
                }
            });
            handleTabla.create('tbl');
        }
    }

    handleAlerta = (msj, tipo) => {
        this.setState({
            alert: {
                show: true,
                msj,
                tipo
            }
        });

        setTimeout(() => this.setState({
            alert: {
                show: true
            }
        }), 2000);
    }

    async componentDidMount() {
        await this.getPosiciones();
    }

    render() {
        if (this.state.loader.show) {
            return <Loader />
        } else {
            return (
                <div>
                    <Navbar active="parametrizacion" />
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
                                    Crear <i className="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div className="mt-2 mb-3">
                            <Tabla
                                datos={this.state.posiciones}
                                alerta={this.handleAlerta}
                                update={this.getPosiciones}
                            />
                        </div>
                    </div>
                    <Crear
                        alerta={this.handleAlerta}
                        update={this.getPosiciones}
                    />
                    <Alert
                        {... this.state.alert}
                    />
                </div>
            );
        }
    }
}

export default Posiciones;