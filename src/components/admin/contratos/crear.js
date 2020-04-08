import React from 'react';

import Spinner from './../../spinner';
import Api from './../../Api';
import $ from 'jquery';

class Crear extends React.Component {

    constructor(porps) {
        super(porps);

        this.state = {
            showSpinner: false,
            datos: {
                name: ''
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

    agregarError(elemento, msj) {
        elemento.children[1].classList.add('is-invalid');
        elemento.children[2].innerHTML = msj;
        elemento.children[1].focus();

        elemento.addEventListener('keypress', () => {
            elemento.children[1].classList.remove('is-invalid');
            elemento.children[2].innerHTML = '';
        });
    }

    async save() {
        this.setState({showSpinner:true});
        if (this.state.datos.name !== '') {
            try {
                let datos = await Api('contractTypes','POST',sessionStorage.getItem('token'),this.state.datos);
                if(datos === 'Nuevo tipo de contrato creado'){
                    await this.props.update();
                    $('#crear').modal('hide');
                    this.props.alerta(datos,'success');
                }else if(datos === 'Tipo de contrato ya existente'){
                    this.agregarError(document.getElementById('name'), datos);
                }else{
                    console.log(datos);
                }
            } catch (error) {
                console.error(error);
                this.props.alerta(error,'danger');
            }
        } else {
            this.agregarError(document.getElementById('name'), 'Debes ingresar un nombre');
        }
        this.setState({showSpinner:false});

    }

    render() {
        return (
            <div className="modal fade" id="crear" data-backdrop="static" role="dialog" aria-labelledby="crearLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="crearLabel">Crear tipo contrato</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group" id="name">
                                <label htmlFor="name">Nombre</label>
                                <input name="name" type="text" className="form-control" placeholder="Nombre del contrato"
                                    value={this.state.datos.name}
                                    onChange={(e) => this.handleChange(e)}
                                />
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
        )
    }

}

export default Crear;