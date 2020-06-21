import React from "react";

import Spinner from './../../spinner';
import Api from './../../Api';
import $ from 'jquery';


class Editar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showSpinner: false
        }
    }



    // handleChange(e) {
    //     this.setState({
    //         datos: {
    //             ...this.state.datos,
    //             [e.target.name]: e.target.value.toLowerCase().charAt(0).toUpperCase() + e.target.value.slice(1)
    //         }
    //     });
    // }

    agregarError(elemento, msj) {
        elemento.children[1].classList.add('is-invalid');
        elemento.children[2].innerHTML = msj;
        elemento.children[1].focus();

        elemento.addEventListener('keypress', () => {
            elemento.children[1].classList.remove('is-invalid');
            elemento.children[2].innerHTML = '';
        });
    }

    async update() {
        this.setState({ 
            showSpinner: true, 
        });
        try {
            if (this.props.datos.name !== "") {

                if (this.props.datos.usability !== "") {
                    let res = await Api(`ambients/${this.props.datos.id}`, 'PUT', sessionStorage.getItem('token'), this.props.datos);

                    switch (res) {
                        case 'Ambiente ya existente':
                            this.agregarError(document.getElementById('name'), res);
                            break;
                        case 'Ambiente actualizado':
                            this.props.update();
                          
                            $('#editar').modal('hide');
                            this.props.alerta(res, 'success');
                            break;
                        default:
                            console.error(res);
                            this.props.alerta(res, 'danger');
                            break;
                    }

                } else {
                    this.agregarError(document.getElementById('usability_editar'), 'Debes llenar este campo');
                }

            } else {
                this.agregarError(document.getElementById('name_editar'), 'Debes llenar este campo');
            }


        } catch (error) {
            console.error(error);
        }
        this.setState({ showSpinner: false });

    }

    render() {
        return (
            <div className="modal fade" id="editar" data-backdrop="static" role="dialog" aria-labelledby="editarLabel" aria-hidden="true" >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editarLabel">Editar Ambiente</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <span className="font-weight-lighter">
                                Los campos con 
                                <i className="text-danger">*</i> 
                                son obligatorios
                            </span>
                            <div className="form-group mt-1" id="name_editar">
                                <label htmlFor="name">Nombre <span className="text-danger">*</span></label>
                                <input type="text" className="form-control" placeholder="Ambiente SENA" name="name" value={this.props.datos.name} onChange={(e) => this.props.handleChange(e)} />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="state_editar">
                                <label htmlFor="state">Estado</label>
                                <select className="custom-select" name="state" value={this.props.datos.state} onChange={(e) => this.props.handleChange(e)} >
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                </select>
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="usability_editar">
                                <label htmlFor="usability">Usabilidad <span className="text-danger">*</span></label>
                                <input type="text" className="form-control" placeholder="Usabilidad del ambiente" name="usability" value={this.props.datos.usability} onChange={(e) => this.props.handleChange(e)} />
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-outline-success" onClick={() => this.update()}>Editar <i className="fas fa-save"></i> <Spinner show={this.state.showSpinner} /></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default Editar;