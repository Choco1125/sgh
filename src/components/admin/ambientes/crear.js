import React from "react";

import Spinner from './../../spinner';
import Api from './../../Api';
import $ from 'jquery';


class Crear extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            datos: {
                name: '',
                state: 'Activo',
                usability: ''
            },
            showSpinner: false
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

    agregarError(elemento, msj) {
        console.log(elemento)
        elemento.children[1].classList.add('is-invalid');
        elemento.children[2].innerHTML = msj;
        elemento.children[1].focus();

        elemento.addEventListener('keypress', () => {
            elemento.children[1].classList.remove('is-invalid');
            elemento.children[2].innerHTML = '';
        });
    }

    async save() {
        this.setState({ showSpinner: true });
        try {
            console.log(this.state.datos.name !== '');
            if (this.state.datos.name !== "") {

                if (this.state.datos.usability !== "") {
                    let res = await Api('ambients', 'POST', sessionStorage.getItem('token'), this.state.datos);

                    switch (res) {
                        case 'Ambiente ya existente':
                            this.agregarError(document.getElementById('name'), res);
                            break;
                        case 'Nuevo ambiente creado':
                            this.props.update();
                            this.setState({
                                datos: {
                                    name: '',
                                    state: 'Activo',
                                    usability: ''
                                }
                            });
                            $('#crear').modal('hide');
                            this.props.alerta(res, 'success');
                            break;
                        default:
                            console.error(res);
                            this.props.alerta(res, 'danger');
                            break;
                    }

                } else {
                    this.agregarError(document.getElementById('usability'), 'Debes llenar este campo');
                }

            } else {
                this.agregarError(document.getElementById('name'), 'Debes llenar este campo');
            }


        } catch (error) {
            console.error(error);
        }
        this.setState({ showSpinner: false });

    }

    render() {
        return (
            <div className="modal fade" id="crear" data-backdrop="static" role="dialog" aria-labelledby="crearLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="crearLabel">Crear Ambiente</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group" id="name">
                                <label htmlFor="name">Nombre</label>
                                <input type="text" className="form-control" placeholder="Ambiente SENA" name="name" value={this.state.datos.name} onChange={(e) => this.handleChange(e)} />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="state">
                                <label htmlFor="state">Estado</label>
                                <select className="custom-select" name="state" value={this.state.datos.state} onChange={(e) => this.handleChange(e)} >
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                </select>
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="usability">
                                <label htmlFor="usability">Usabilidad</label>
                                <input type="text" className="form-control" placeholder="Usabilidad del ambiente" name="usability" value={this.state.datos.usability} onChange={(e) => this.handleChange(e)} />
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-outline-success" onClick={() => this.save()}>Crear <i className="fas fa-save"></i> <Spinner show={this.state.showSpinner} /></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default Crear;