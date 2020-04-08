import React from 'react';

import Spinner from './../../spinner';
import Api from './../../Api';
import 'select2/dist/js/select2';
import 'select2/dist/css/select2.css';
import '@ttskch/select2-bootstrap4-theme/dist/select2-bootstrap4.css'
import $ from 'jquery';

class Crear extends React.Component{

    constructor(porps){
        super(porps);

        this.state = {
            showSpinner: false,
            instructores: [],
            datos:{
                name: '',
                description: '',
                userId: '',
                start_date: '',
                end_date: ''
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

    async getInstructores(){
        let datos = await Api('userSchedules', 'GET', sessionStorage.getItem('token'), '');
        this.setState({instructores: datos});
    }


    async componentDidMount(){
        await this.getInstructores();
        $('.custom-select').select2({
            theme: 'bootstrap4',
            language: 'es'
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

    async save(){
        if(this.state.datos.name !== ''){
            console.log('Gei'); 
        }else{
            this.agregarError(document.getElementById('name'),'Debes ingresar un nombre');
        }
    }
    
    render(){
        return(
            <div className="modal fade" id="crear" data-backdrop="static" role="dialog" aria-labelledby="crearLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="crearLabel">Crear contrato</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <span className="font-weight-lighter">Los campos con <i className="text-danger">*</i> son obligatorios</span>
                            
                            <div className="form-group mt-1" id="name">
                                <label htmlFor="name">Nombre <span className="text-danger">*</span></label>
                                <input name="name" type="text" className="form-control" placeholder="Nombre del contrato"
                                    value = {this.state.datos.name} 
                                    onChange = {(e)=> this.handleChange(e)}
                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Descripción</label>
                                <input name="description" type="text" className="form-control" placeholder="Descripción del contrato"
                                    value = {this.state.datos.description} 
                                    onChange = {(e)=> this.handleChange(e)}
                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group mt-1" id="userId">
                                <label htmlFor="userId">Instructor <span className="text-danger">*</span></label>
                                <select name="userId" className="custom-select"
                                    value = {this.state.datos.userId} 
                                    onChange = {(e)=> this.handleChange(e)}
                                >
                                    {
                                        this.state.instructores.map(instructor => <option key={instructor.id} value={instructor.id}>{instructor.username} - {instructor.document}</option>)
                                    }
                                </select>
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group mt-1" id="start_date">
                                <label htmlFor="start_date">Fecha inicio <span className="text-danger">*</span></label>
                                <input name="start_date" type="date" className="form-control" placeholder="Nombre del contrato"
                                    value = {this.state.datos.start_date} 
                                    onChange = {(e)=> this.handleChange(e)}
                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group mt-1" id="end_date">
                                <label htmlFor="end_date">Fecha fin <span className="text-danger">*</span></label>
                                <input name="end_date" type="date" className="form-control" placeholder="Nombre del contrato"
                                    value = {this.state.datos.end_date} 
                                    onChange = {(e)=> this.handleChange(e)}
                                />
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-outline-success" onClick={()=>this.save()}>Crear <i className="fas fa-save"></i> <Spinner show={this.state.showSpinner}/></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Crear;