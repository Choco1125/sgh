import React from 'react';
import handleError from '../../../helpers/handleError';
import handleMayus from '../../../helpers/handleMayus';
import Editar from './editar';


class Tabla extends React.Component{  

    constructor(props){
        super(props);

        this.state = {
            datos:{
                id: '',
                name: '',
                zone_id: {
                    value: '',
                    label: ''
                }
            }
        }
    }

    handleChange = (e) =>{
        this.setState({
            datos:{
                ...this.state.datos,
                [e.target.name] : handleMayus(e.target.value)
            }
        });
    }

    handleChangeSelect = (e) =>{
        this.setState({
            datos:{
                ...this.state.datos,
                zone_id: e
            }
        });
        handleError.removeErrorSelect('zone_id_edit');
    }

    render(){
        return(
            <div>
                <table className="table table-sm text-center" id="tbl">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Zona</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.datos.map((municipio, i) => {
                                return (
                                    <tr key={municipio.id} id={i}>
                                        <td>{municipio.name}</td>
                                        <td>{municipio.zone.name}</td>
                                        <td className="align-items-center">
                                            <span className="d-lg-inline btn btn-outline-success btn-sm mt-1 col-6 col-md-6 btn-middle"
                                                data-target="#editar"
                                                data-toggle="modal"
                                                onClick={()=>this.setState({
                                                    datos:{
                                                        id: municipio.id,
                                                        name: municipio.name,
                                                        zone_id: {
                                                            value: municipio.zone.id,
                                                            label: municipio.zone.name
                                                        }
                                                    }
                                                })}
                                            >
                                                <i className="fas fa-edit"></i>
                                            </span>
                                            <span> </span>
                                            <span className="d-lg-inline btn btn-outline-danger btn-sm mt-1 col-6 col-md-6 btn-middle" 
                                                data-target="#eliminar" 
                                                data-toggle="modal"
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </span>
                                            <span> </span>
                                        </td>
                                    </tr>
                                )
                            }
                            )
                        }
                    </tbody>
                </table>
                <Editar 
                    datos={this.state.datos}
                    zonas = {this.props.zonas}
                    update={this.props.update}
                    alerta={this.props.alerta}
                    handleChange={this.handleChange}
                    handleChangeSelect={this.handleChangeSelect}
                />
            </div>
        );
    }

}

export default Tabla;