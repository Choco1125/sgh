import React from 'react';
import Nabvar from '../../components/admin/Navbar';
import consumidor from './../../helpers/consumidor';
// import handleTabla from './../../helpers/handleTabla';
import Tabla from './../../components/admin/usuariosTemporales/tabla';
import Loader from './../../components/Loader';
import Crear from './../../components/admin/usuariosTemporales/crear';
import Alert from './../../components/Alert';

class UsuariosTemporales extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            usuarios: [],
            periocidades: [{
                value: null,
                label: ''
            }],
            alerta: {
                show: false,
                msj: '',
                tipo: ''
            },
            loader: true
        }
    }

    getUsuarios = async () => {

        let datos = await consumidor.get('temporaryUserActivities');
        if (datos) {
            this.setState({
                loader: false,
                usuarios: datos
            });
        }
    }

    getPeriocidades = async () => {
        let res = await consumidor.get('periodicities');
        console.log(res);
    }

    handleAlert = (msj, tipo) => {
        this.setState({
            alerta:{
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

async componentDidMount(){
    await this.getUsuarios();
    await this.getPeriocidades()
}

render() {
    if (this.state.loader) {
        return <Loader />
    }
    return (
        <div>
            <Nabvar active="usuarios" />
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
            <Crear
                periocidades={this.state.periocidades}
                actualizar={this.getUsuarios}
                alerta={this.handleAlert}
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

export default UsuariosTemporales;