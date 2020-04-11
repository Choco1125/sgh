import React from 'react';
import Spinner from './../../spinner';
import agregarError from './../../../helpers/agregarError';
import Api from './../../Api';
import $ from 'jquery';


class Editar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showSpinner: false
        }
    }

    async update() {
        this.setState({
            showSpinner: true
        });
        console.log(this.props.datos);

        if (this.props.datos.name !== '') {
            if (this.props.datos.electiveMonths !== '') {
                if (this.props.datos.electiveMonths > -1 && this.props.datos.electiveMonths < 13) {
                    if (this.props.datos.practiceMonths !== '') {
                        if (this.props.datos.practiceMonths > -1 && this.props.datos.practiceMonths < 13) {
                            try {
                                let datos = await Api(`formationProgramTypes/${this.props.datos.id}`, 'PUT', sessionStorage.getItem('token'), this.props.datos);
                                switch (datos) {
                                    case 'Tipo de programa de formacion actualizado':
                                        await this.props.actualizar();
                                        $('#editar').modal('hide');
                                        this.props.alerta(datos, 'success');
                                        break;
                                    case 'Tipo de programa de formacion ya existente':
                                        agregarError(document.getElementById('name_edit'), datos);
                                        break;
                                    default:
                                        $('#editar').modal('hide');
                                        this.props.alerta(datos, 'danger');
                                        break;
                                }
                            } catch (error) {
                                console.error(error);
                            }
                        } else {
                            agregarError(document.getElementById('practiceMonths_edit'), 'Debes poner un número entre 0 y 12');
                        }
                    } else {
                        agregarError(document.getElementById('practiceMonths_edit'), 'Debes llenar este campo');
                    }
                } else {
                    agregarError(document.getElementById('electiveMonths_edit'), 'Debes poner un número entre 0 y 12');
                }
            } else {
                agregarError(document.getElementById('electiveMonths_edit'), 'Debes llenar este campo');

            }
        } else {
            agregarError(document.getElementById('name_edit'), 'Debes llenar este campo');
        }

        this.setState({
            showSpinner: false
        });
    }

    render() {
        return (
            <div className="modal fade" id="editar" data-backdrop="static" role="dialog" aria-labelledby="editarLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editarLabel">Editar tipo de programa de formación</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group" id="name_edit">
                                <label htmlFor="name">Nombre</label>
                                <input name="name" type="text" className="form-control" placeholder="Nombre del tipo programa"
                                    value={this.props.datos.name}
                                    onChange={(e) => this.props.handleChange(e)}

                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="electiveMonths_edit">
                                <label htmlFor="electiveMonths">Meses lectivos</label>
                                <input type="number" name="electiveMonths" className="form-control"
                                    value={this.props.datos.electiveMonths}
                                    step="1"
                                    max="12"
                                    onChange={(e) => this.props.handleChangeNumber(e)}
                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="practiceMonths_edit">
                                <label htmlFor="practiceMonths">Meses electivos</label>
                                <input type="number" name="practiceMonths" className="form-control"
                                    value={this.props.datos.practiceMonths}
                                    step="1"
                                    max="12"
                                    onChange={(e) => this.props.handleChangeNumber(e)}
                                />
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-outline-success"
                                onClick={() => this.update()}
                            >
                                Actualizar <i className="fas fa-save"></i>
                                <Spinner show={this.state.showSpinner} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Editar;