import React from 'react';
import Spinner from './../../spinner';
import $ from 'jquery';
import agregarError from './../../../helpers/agregarError';
import Api from './../../Api';

import Select from "react-select";



class Crear extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            showSpinner: false,
            datos:{
                summary: "",
                description:"",
                hours:"",
                projectPhase:"",
                competenceId:{
                    value: '',
                    label: ''
                },
                associatedTrimesters:"",
                trimesterEvaluate:""
            }
        }
    }

    handleChange(e) {

        if(e.target.name === 'trimesterEvaluate'){
            if(e.target.value.length > 1){
                e.target.value = e.target.value[0]
            }
        }

        this.setState({
            datos: {
                ...this.state.datos,
                [e.target.name]: e.target.value.toLowerCase().charAt(0).toUpperCase() + e.target.value.slice(1)
            }
        });
    }

    handleChange2(e) {
        this.setState({
            datos: {
                ...this.state.datos,
                competenceId: e
            }
        });
    }

    asociatedValid(){
        let valores = this.state.datos.associatedTrimesters.split(',');

        for(let i = 0; i < valores.length; i++){
            let valor = parseInt(valores[i]);
            if(isNaN(valor)){
                return false;
            }
        }
        return true;
    }
   

    async componentDidMount(){
        $('[data-toggle="tooltip"]').tooltip();
    }

    async save(){
        this.setState({
            showSpinner: true
        });


        if(this.state.datos.description !== ''){
            if(this.state.datos.hours !== ''){
                if(this.state.datos.projectPhase !== ''){
                    if(this.state.datos.trimesterEvaluate !== ''){
                        if(this.state.datos.associatedTrimesters !== ''){
                            if(this.state.datos.competenceId.value !== ''){

                                if(this.asociatedValid()){
                                    let datos ={
                                        summary: this.state.datos.summary,
                                        description:this.state.datos.description,
                                        hours:this.state.datos.hours,
                                        projectPhase:this.state.datos.projectPhase,
                                        competenceId: this.state.datos.competenceId.value,
                                        associatedTrimesters:this.state.datos.associatedTrimesters,
                                        trimesterEvaluate:this.state.datos.trimesterEvaluate
                                    }
    
                                    let res = await Api('learningResults','POST',sessionStorage.getItem('token'),datos);
    
                                    switch (res) {
                                        case 'Nuevo resultado de aprendizaje creado':
                                            await this.props.update();
                                            $('#crear').modal('hide');
                                            this.props.alerta(res,'success');
                                            break;
                                    
                                        default:
                                            console.log(res)
                                            break;
                                    }
                                    console.log(res);
                                }else{
                                    agregarError(document.getElementById('associatedTrimesters'),'Debes ingresar únicamente números');

                                }                                
                            }else{
                                agregarError(document.getElementById('competenceId'),'Debes llenar este campo');
                            }
                        }else{
                            agregarError(document.getElementById('associatedTrimesters'),'Debes llenar este campo');
                        }
                    }else{
                        agregarError(document.getElementById('trimesterEvaluate'),'Debes llenar este campo');
                    }
                }else{
                    agregarError(document.getElementById('projectPhase'),'Debes llenar este campo');
                }
            }else{
                agregarError(document.getElementById('hours'),'Debes llenar este campo');
            }
        }else{
            agregarError(document.getElementById('description'),'Debes llenar este campo');
        }

        this.setState({
            showSpinner: false
        });
    }

    render() {
        return (
            <div className="modal fade" id="crear" data-backdrop="static" role="dialog" 
                aria-labelledby="crearLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="crearLabel">
                                Crear resultado de aprendizaje
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" 
                            aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <span className="font-weight-lighter">
                                Los campos con <i className="text-danger">*</i> son obligatorios
                            </span>
                            
                            <div className="form-group mt-1" id="summary">
                                <label htmlFor="summary">
                                    Resumen
                                </label>
                                <input name="summary" type="text" 
                                    className="form-control" 
                                    placeholder="Descripción del resultado de aprendizaje"
                                    value = { this.state.datos.summary}
                                    onChange = {(e)=> this.handleChange(e)}
                                />
                                <span className="text-danger"></span>
                            </div>

                            <div className="form-group" id="description">
                                <label htmlFor="description">Descripción
                                    <span className="text-danger">*</span>
                                </label>
                                <input name="description" type="text" 
                                    className="form-control" 
                                    placeholder="Descripción del resultado de apredizaje"
                                    value = {this.state.datos.description}
                                    onChange = {e => this.handleChange(e)}
                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="hours">
                                <label htmlFor="hours">Horas
                                    <span className="text-danger">*</span>
                                </label>
                                <input name="hours" type="number"
                                    min="0"
                                    step="1" 
                                    placeholder="0"
                                    className="form-control"
                                    value = {this.state.datos.hours}
                                    onChange = {e => this.handleChange(e)} 
                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="projectPhase">
                                <label htmlFor="projectPhase">Fase del proyecto
                                    <span className="text-danger">*</span>
                                </label>
                                <input name="projectPhase" type="text" 
                                    className="form-control" 
                                    placeholder="Fase del proyecto"
                                    value = {this.state.datos.projectPhase}
                                    onChange = {e => this.handleChange(e)}
                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="competenceId">
                                <label htmlFor="competenceId">Competencia
                                    <span className="text-danger">*</span>
                                </label>

                                <Select value = {this.state.datos.competenceId}
                                        onChange = {e => this.handleChange2(e)}
                                        options = {this.props.competencias}
                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="trimesterEvaluate">
                                <label htmlFor="trimesterEvaluate">
                                    Trimestre evaluado
                                    <span className="text-danger">*</span>
                                </label>
                                <input name="trimesterEvaluate" type="number" 
                                    className="form-control" 
                                    placeholder="Trimestre evaludado"
                                    value = {this.state.datos.trimesterEvaluate}
                                    onChange = {e => this.handleChange(e)}
                                    maxLength = "1"
                                    min="1"
                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="associatedTrimesters">
                                <label htmlFor="associatedTrimesters">Trimestres asociados
                                    <span className="text-danger">*</span>
                                    <button className="btn btn-sm" data-toggle="tooltip" 
                                        data-placement="right" 
                                        title="Los trimestres se deben separar por comas">
                                            <i className="fas fa-question-circle"></i>
                                    </button>
                                </label>
                                <input name="associatedTrimesters" type="text" 
                                    className="form-control" 
                                    placeholder="Trimestre evaludado"
                                    value = {this.state.datos.associatedTrimesters}
                                    onChange = {e => this.handleChange(e)}
                                />
                                <span className="text-danger"></span>
                            </div>  
                         
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" 
                                data-dismiss="modal">
                                    Cerrar
                            </button>
                            <button type="button" className="btn btn-outline-success" 
                                onClick = {()=> this.save()}
                            >
                                Crear <i className="fas fa-save"></i> 
                                <Spinner show={this.state.showSpinner} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Crear;