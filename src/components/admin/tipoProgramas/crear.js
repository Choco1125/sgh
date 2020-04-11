import React from 'react';
import Spinner from './../../spinner';
import Api from './../../Api';
import $ from 'jquery';
import agregarError from './../../../helpers/agregarError';


class Crear extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showSpinner: false,
            datos: {
                name: '',
                electiveMonths: '',
                practiceMonths: ''
            }
        }
    }

    handleChange(e) {
        this.setState({
            datos: {
                ...this.state.datos,
                [e.target.name]: e.target.value.toLowerCase().charAt(0).toUpperCase() + e.target.value.slice(1)
            }
        });

    }

    handleChangeNumber(e) {

        this.setState({
            datos: {
                ...this.state.datos,
                [e.target.name]: e.target.value
            }
        });


    }

    async save() {
        this.setState({
            showSpinner: true
        });

        if (this.state.datos.name !== '') {
            if(this.state.datos.electiveMonths !== ''){
                if (this.state.datos.electiveMonths > -1 && this.state.datos.electiveMonths < 13) {
                    if(this.state.datos.practiceMonths !== ''){
                        if(this.state.datos.practiceMonths > -1 && this.state.datos.practiceMonths < 13){
                            try {
                                let datos = await Api('formationProgramTypes', 'POST', sessionStorage.getItem('token'), this.state.datos);
                                switch (datos) {
                                    case 'Nuevo tipo de programa de formacion creado':
                                        this.props.update();
                                        $('#crear').modal('hide');
                                        this.props.alerta(datos, 'success');
                                        break;
                                    case 'Tipo de programa de formacion ya existente':
                                        agregarError(document.getElementById('name'), datos);
                                        break;
                                    default:
                                        $('#crear').modal('hide');
                                        this.props.alerta(datos, 'danger');
                                        break;
                                }
                            } catch (error) {
                                console.error(error);
                            }
                        }else{
                            agregarError(document.getElementById('practiceMonths'), 'Debes poner un número entre 0 y 12');
                        }
                    }else{
                        agregarError(document.getElementById('practiceMonths'), 'Debes llenar este campo');
                    }
                }else{
                    agregarError(document.getElementById('electiveMonths'), 'Debes poner un número entre 0 y 12');
                }
            }else{
                agregarError(document.getElementById('electiveMonths'), 'Debes llenar este campo');

            }
        } else {
            agregarError(document.getElementById('name'), 'Debes llenar este campo');
        }

        this.setState({
            showSpinner: false
        });
    }

    render() {
        return (
            <div className="modal fade" id="crear" data-backdrop="static" role="dialog" aria-labelledby="crearLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="crearLabel">Crear tipo de programa de formación</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group" id="name">
                                <label htmlFor="name">Nombre</label>
                                <input name="name" type="text" className="form-control" placeholder="Nombre del tipo programa"
                                    value={this.state.datos.name}
                                    onChange={(e) => this.handleChange(e)}

                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="electiveMonths">
                                <label htmlFor="electiveMonths">Meses lectivos</label>
                                <input type="number" name="electiveMonths" className="form-control"
                                    value={this.state.datos.electiveMonths}
                                    step="1"
                                    max="12"
                                    onChange={(e) => this.handleChangeNumber(e)}
                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="practiceMonths">
                                <label htmlFor="practiceMonths">Meses electivos</label>
                                <input type="number" name="practiceMonths" className="form-control"
                                    value={this.state.datos.practiceMonths}
                                    step="1"
                                    max="12"
                                    onChange={(e) => this.handleChangeNumber(e)}
                                />
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-outline-success" onClick={() => this.save()} >Crear <i className="fas fa-save"></i> <Spinner show={this.state.showSpinner} /></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Crear;