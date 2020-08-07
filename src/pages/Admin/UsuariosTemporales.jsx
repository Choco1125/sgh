import React from 'react';
import Nabvar from '../../components/admin/Navbar';
import consumidor from './../../helpers/consumidor';
import handleTabla from './../../helpers/handleTabla';
import Tabla from './../../components/admin/usuariosTemporales/tabla';
import Loader from './../../components/Loader';
import Crear from './../../components/admin/usuariosTemporales/crear';
import Alert from './../../components/Alert';
import handleMayus from '../../helpers/handleMayus';
import Editar from '../../components/admin/usuariosTemporales/editar';
import Eliminar from '../../components/admin/usuariosTemporales/eliminar';
import { Breadcrumb } from '../../components/Breadcrumb';

const routes = [
    {
        name: 'Inicio',
        link: '/coordinador/',
        isLink: true
    },
    {
        name: 'Usuarios',
        link: '/coordinador/usuariostemporales',
        isLink: true
    },
    {
        name: 'Usuarios temporales',
        link: '/coordinador/usuariostemporales',
        isLink: false
    }
];

class UsuariosTemporales extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            usuarios: [],
            alerta: {
                show: false,
                msj: '',
                tipo: ''
            },
            edit: {
                id: '',
                name: '',
                observations: '',
                type: ''
            },
            eliminar: {
                id: ''
            },
            loader: true
        }
    }

    getUsuarios = async () => {

        let usuarios = await consumidor.get('temporaryUserActivities');
        if (usuarios) {
            handleTabla.destroy('tbl');
            this.setState({
                usuarios,
                loader: false
            });
            handleTabla.create('tbl');
        }
    }

    handleChange = (e) => {
        this.setState({
            edit: {
                ...this.state.edit,
                [e.target.name]: handleMayus(e.target.value)
            }
        });
    }


    setEdit = (id, name, observations, type) => this.setState({
        edit: {
            id,
            name,
            observations,
            type,

        }
    });

    handleAlert = (msj, tipo) => {
        this.setState({
            alerta: {
                show: true,
                msj,
                tipo
            }
        });
        setTimeout(() => this.setState({
            alerta: {
                show: false
            }
        }), 2000);
    }

    setEliminar = (id) => this.setState({
        eliminar: {
            id
        }
    });

    async componentDidMount() {
        await this.getUsuarios();
    }

    render() {
        if (this.state.loader) {
            return <Loader />
        } else {
            return (
                <div>
                    <Nabvar active="usuarios" />
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
                                datos={this.state.usuarios}
                                setEdit={this.setEdit}
                                eliminar={this.setEliminar}
                            />
                        </div>
                    </div>
                    <Crear
                        periocidades={this.state.periocidades}
                        actualizar={this.getUsuarios}
                        alerta={this.handleAlert}
                    />
                    <Editar
                        datos={this.state.edit}
                        handleChange={this.handleChange}
                        update={this.getUsuarios}
                        alerta={this.handleAlert}
                    />
                    <Eliminar
                        id={this.state.eliminar.id}
                        alerta={this.handleAlert}
                        update={this.getUsuarios}
                    />
                    <Alert
                        show={this.state.alerta.show}
                        msj={this.state.alerta.msj}
                        tipo={this.state.alerta.tipo}
                    />
                </div>
            )
        }
    }
}

export default UsuariosTemporales;