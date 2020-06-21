import React from 'react';
import Spinner from './../../spinner';
import $ from 'jquery';
import Api from './../../Api';


class Editar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showSpinner: false,
            formationType:[]
        }
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

    

    async getformationType(){
        let datos = await Api('/formationProgramTypes','GET',sessionStorage.getItem('token'),'');

        this.setState({
            formationType: datos
        });

    }

    async update(){
        this.setState({showSpinner: true});
        
        if(this.props.datos.code !== ''){
            if(this.props.datos.name !== ''){
                if(this.props.datos.formationTypeId !== ''){
                    try{
                        let datos = await Api(`formationPrograms/${this.props.datos.id}`,'PUT',sessionStorage.getItem('token'),this.props.datos);
                        if(datos === 'Programa de formacion actualizado'){
                            await this.props.update();
                            $('#editar').modal('hide');
                            this.props.alerta(datos,'success');
                        }else if(datos.message === 'Este programa de formacion ya existe'){
                            $('#editar').modal('hide');
                            this.props.alerta(datos.message,'danger');
                        }else if(datos === 'Programa de formacion ya existente'){
                            this.agregarError(document.getElementById('name_edit'),datos);
                        }else{
                            console.log(datos)
                        }
                    }catch(err){
                        this.props.alerta(err,'danger');
                    }
                }else{
                    this.agregarError(document.getElementById('formationTypeId_edit'),'Debes llenar este campo');
                }
            }else{
                this.agregarError(document.getElementById('name_edit'),'Debes llenar este campo');
            }
        }else{
            this.agregarError(document.getElementById('code_edit'),'Debes llenar este campo');
        }
        this.setState({showSpinner: false});
    }


    async componentDidMount() { 
        $('[data-toggle="tooltip"]').tooltip();
        await this.getformationType();
    }

    render() {
        return (
            <div className="modal fade" id="editar" data-backdrop="static" role="dialog" aria-labelledby="editarLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editarLabel">Crear programa de formación</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <span className="font-weight-lighter">Los campos con <i className="text-danger">*</i> son obligatorios</span>
                            <div className="form-group mt-1" id="code_edit">
                                <label htmlFor="code">Código
                                    <span className="text-danger">*</span>
                                    <button className="btn btn-sm" data-toggle="tooltip" data-placement="right" title="Corresponde al código y la versión del programa de formación"><i className="fas fa-question-circle"></i></button>
                                </label>
                                <input name="code" type="text" className="form-control" placeholder="Código del programa" 
                                    value={this.props.datos.code}
                                    onChange={(e)=> this.props.handleChange(e)}    
                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="name_id">
                                <label htmlFor="name">Name
                                    <span className="text-danger">*</span>
                                </label>
                                <input name="name" type="text" className="form-control" placeholder="Nombre del programa" 
                                    value={this.props.datos.name}
                                    onChange={(e)=> this.props.handleChange(e)}
                                />
                                <span className="text-danger"></span>

                            </div>
                            <div className="form-group" id="formationTypeId_edit">
                                <label htmlFor="formationTypeId">Tipo de formación
                                    <span className="text-danger">*</span>
                                </label>
                                <select className="custom-select" name="formationTypeId" 
                                    value={this.props.datos.formationTypeId}
                                    onChange={(e)=> this.props.handleChange(e)}
                                >
                                    <option>Selecciona un tipo de formación</option>
                                    {
                                        this.state.formationType.map(opcion =>
                                            <option key ={opcion.id} value={opcion.id}>{opcion.name}</option>    
                                        )
                                    }
                                </select>
                                <span className="text-danger"></span>

                            </div>
                            <div className="form-group" id="isRegisterQualified_edit">
                                <div className="custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input" id="switch1" checked={this.props.datos.isRegisterQualified} onChange={() => this.props.changeQualifiqued()} />
                                    <label className="custom-control-label" htmlFor="switch1">Registro calificado</label>
                                </div>
                            </div>
                            {
                                this.props.datos.isRegisterQualified ?
                                    <div className="form-group" id="isRegisterQualifiedDate_edit">
                                        <label htmlFor="isRegisterQualifiedDate">Fecha registro calificado</label>
                                        <input name="isRegisterQualifiedDate" type="date" className="form-control" placeholder="Código del programa" 
                                            value={this.props.datos.isRegisterQualifiedDate}
                                            onChange={(e)=> this.props.handleChange(e)}    
                                        />
                                    </div>
                                    :
                                    <></>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-outline-success" onClick={()=> this.update() } >Actualizar <i className="fas fa-save"></i> <Spinner show={this.state.showSpinner} /></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Editar;