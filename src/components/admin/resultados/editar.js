import React from 'react';
import Spinner from './../../spinner';
import $ from 'jquery';
import Select from 'react-select';
import agregarError from './../../../helpers/agregarError';
import Api from './../../Api';

class Editar extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            showSpinner: false,
        }
    }


    asociatedValid(){
        let valores = this.props.datos.associatedTrimesters.split(',');

        for(let i = 0; i < valores.length; i++){
            let valor = parseInt(valores[i]);
            if(isNaN(valor)){
                return false;
            }
        }
        return true;
    }

    async update(){
        this.setState({
            showSpinner: true
        });


        if(this.props.datos.description !== ''){
            if(this.props.datos.hours !== ''){
                if(this.props.datos.projectPhase !== ''){
                    if(this.props.datos.trimesterEvaluate !== ''){
                        if(this.props.datos.associatedTrimesters !== ''){
                            if(this.props.datos.competenceId.value !== ''){

                                if(this.asociatedValid()){
                                    let datos ={
                                        summary: this.props.datos.summary,
                                        description:this.props.datos.description,
                                        hours:this.props.datos.hours,
                                        projectPhase:this.props.datos.projectPhase,
                                        competenceId: this.props.datos.competenceId.value,
                                        associatedTrimesters:this.props.datos.associatedTrimesters,
                                        trimesterEvaluate:this.props.datos.trimesterEvaluate
                                    }
    
                                    let res = await Api(`learningResults/${this.props.datos.id}`,'PUT',sessionStorage.getItem('token'),datos);
    
                                    switch (res) {
                                        case 'Resultado de aprendizaje actualizado':
                                            await this.props.update();
                                            $('#editar').modal('hide');
                                            this.props.alerta(res,'success');
                                            break;
                                    
                                        default:
                                            $('#editar').modal('hide');
                                            this.props.alerta(res,'danger');
                                            console.log(res)
                                            break;
                                    }
                                    console.log(res);
                                }else{
                                    agregarError(document.getElementById('associatedTrimesters_edit'),'Debes ingresar únicamente números');

                                }                                
                            }else{
                                agregarError(document.getElementById('competenceId_edit'),'Debes llenar este campo');
                            }
                        }else{
                            agregarError(document.getElementById('associatedTrimesters_edit'),'Debes llenar este campo');
                        }
                    }else{
                        agregarError(document.getElementById('trimesterEvaluate_edit'),'Debes llenar este campo');
                    }
                }else{
                    agregarError(document.getElementById('projectPhase_edit'),'Debes llenar este campo');
                }
            }else{
                agregarError(document.getElementById('hours_edit'),'Debes llenar este campo');
            }
        }else{
            agregarError(document.getElementById('description_edit'),'Debes llenar este campo');
        }

        this.setState({
            showSpinner: false
        });
    }
    

    componentDidMount(){
        $('[data-toggle="tooltip"]').tooltip();
    }

    render() {
        return (
            <div className="modal fade" id="editar" data-backdrop="static" role="dialog" 
                aria-labelledby="editarLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editarLabel">
                                Editar resultado de aprendizaje
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
                            
                            <div className="form-group mt-1" id="summary_edit">
                                <label htmlFor="summary">
                                    Resumen
                                </label>
                                <input name="summary" type="text" 
                                    className="form-control" 
                                    placeholder="Descripción del resultado de aprendizaje"
                                    value = { this.props.datos.summary}
                                    onChange = {(e)=> this.props.handleChange(e)}
                                />
                                <span className="text-danger"></span>
                            </div>

                            <div className="form-group" id="description_edit">
                                <label htmlFor="description">Descripción
                                    <span className="text-danger">*</span>
                                </label>
                                <input name="description" type="text" 
                                    className="form-control" 
                                    placeholder="Descripción del resultado de apredizaje"
                                    value = {this.props.datos.description}
                                    onChange = {e => this.props.handleChange(e)}
                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="hours_edit">
                                <label htmlFor="hours">Horas
                                    <span className="text-danger">*</span>
                                </label>
                                <input name="hours" type="number"
                                    min="0"
                                    step="1" 
                                    placeholder="0"
                                    className="form-control"
                                    value = {this.props.datos.hours}
                                    onChange = {e => this.props.handleChange(e)} 
                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="projectPhase_edit">
                                <label htmlFor="projectPhase">Fase del proyecto
                                    <span className="text-danger">*</span>
                                </label>
                                <input name="projectPhase" type="text" 
                                    className="form-control" 
                                    placeholder="Fase del proyecto"
                                    value = {this.props.datos.projectPhase}
                                    onChange = {e => this.props.handleChange(e)}
                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="competenceId_edit">
                                <label htmlFor="competenceId">Competencia
                                    <span className="text-danger">*</span>
                                </label>

                                <Select value = {this.props.datos.competenceId}
                                        onChange = {e => this.props.handleChange2(e)}
                                        options = {this.props.competencias}
                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="trimesterEvaluate_edit">
                                <label htmlFor="trimesterEvaluate">
                                    Trimestre evaluado
                                    <span className="text-danger">*</span>
                                </label>
                                <input name="trimesterEvaluate" type="number" 
                                    className="form-control" 
                                    placeholder="Trimestre evaludado"
                                    value = {this.props.datos.trimesterEvaluate}
                                    onChange = {e => this.props.handleChange(e)}
                                    maxLength = "1"
                                    min="1"
                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="associatedTrimesters_edit">
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
                                    value = {this.props.datos.associatedTrimesters}
                                    onChange = {e => this.props.handleChange(e)}
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
                                onClick = {()=> this.update()}
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

export default Editar;