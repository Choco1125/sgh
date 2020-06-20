import React from 'react';
import Api from './../../Api';
import $ from 'jquery';
import Spinner from './../../spinner';
import Select from 'react-select';
import agregarError from './../../../helpers/agregarError';


class Edit extends React.Component {
  
    constructor(props){
        super(props);
        this.state={
            showSpinner: false
        }
    }

    save = async () => {

        this.setState({showSpinner: true});
        if (this.props.datos.description !== '') {
            if (this.props.datos.summary !== '') {
                if(this.props.datos.formationProgramId.value !== ''){
                    let datos = {
                        code: this.props.datos.code,
                        description: this.props.datos.description,
                        summary: this.props.datos.summary,
                        hours: this.props.datos.hours,
                        formationProgramId: this.props.datos.formationProgramId.value
                    }
                       
                    let res = await Api(`competences/${this.props.datos.id}`, 'PUT', sessionStorage.getItem('token'),datos);
                   
                    
                    if (res === "Competencia actualizada") {
                        $('#tbl').DataTable().destroy();
                        await this.props.pedirDatos();
                        $('#editar').modal('hide');
                        this.props.alert('success','Competencia creada');                       
                    } else {
                        console.log(res);
                        $('#editar').modal('hide');
                        this.props.alert('danger',JSON.stringify(res));
    
                    }
                }else{
                    agregarError(document.getElementById('formationProgramId_edit'),'Debes seleccionar un programa de formación');
                }
            } else {
                agregarError(document.getElementById('summary_edit'),'Debes ingresar un resumen');
            }
        } else {
            agregarError(document.getElementById('description_edit'),'Debes añadir una descripción');
        }
        this.setState({showSpinner: false});
    }

    render() {       
        return (
            <div className="modal fade" id="editar" data-backdrop="static" role="dialog" 
                aria-labelledby="editarLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editarLabel">
                                Editar Competencia
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" 
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <span className="font-weight-lighter">
                                    Los campos con 
                                    <i className="text-danger">*</i> 
                                    son obligatorios
                            </span>
                            <div className="form-group mt-1" id="code_edit">
                                <label htmlFor="code">
                                    Código
                                    <button  className="btn btn-sm" 
                                        data-toggle="tooltip" 
                                        data-placement="right" 
                                        title="Corresponde al código de la competencia que &nbsp; 
                                        se encuentra en el programa de formación"
                                    >
                                        <i className="fas fa-question-circle"></i>
                                    </button>
                                </label> 
                                <input name="code" type="text" 
                                    className="form-control" 
                                    placeholder="Código de la competencia"
                                    onChange={e => this.props.handleChange(e)}
                                    value = {this.props.datos.code}
                                    maxLength="20"
                                />
                                <span className="text-danger"/>
                            </div>
                            <div className="form-group" id="description_edit">
                                <label htmlFor="description">
                                        Descripción 
                                        <span className="text-danger">*</span>
                                </label>
                                <input name="description" type="text" 
                                    className="form-control" 
                                    placeholder="Descripción de la competencia"
                                    onChange = {e => this.props.handleChange(e)}
                                    value = {this.props.datos.description}
                                    maxLength="255"
                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="summary_edit">
                                <label htmlFor="summary">
                                    Resumen 
                                    <span className="text-danger">*</span>
                                </label>
                                <input name="summary" type="text" 
                                    className="form-control" 
                                    placeholder="Resumen de la competencia"
                                    onChange={e=>this.props.handleChange(e)}
                                    value={this.props.datos.summary}
                                    maxLength="255"
                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="hours_edit">
                                <label htmlFor="hours">
                                    Horas
                                </label>
                                <input name="hours" 
                                    type="number" 
                                    className="form-control" 
                                    min="0" step="1" placeholder="0" max="500"
                                    onChange={e=>this.props.handleChangeHours(e)}
                                    value={this.props.datos.hours}
                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="formationProgramId_edit">
                                <label htmlFor="summary">
                                    Programa de formación 
                                    <span className="text-danger">*</span>
                                </label>
                                <Select
                                    onChange ={e=>this.props.handleChangeSelect(e)}
                                    options = {this.props.programas}
                                    value = {this.props.datos.formationProgramId}
                                />
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" className="btn btn-outline-secondary" 
                                data-dismiss="modal"
                            >
                                    Cerrar
                            </button>
                            <button type="button" 
                                className="btn btn-outline-success" 
                                onClick={() => this.save()}>
                                    Actualizar 
                                    <i className="ml-1 mr-1 fas fa-save"></i> 
                                    <Spinner show={this.state.showSpinner} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;   