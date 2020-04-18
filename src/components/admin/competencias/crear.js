import React from 'react';
import Api from './../../Api';
import $ from 'jquery';
import Spinner from '../../spinner';
import Select from 'react-select';
import agregarError from "./../../../helpers/agregarError";


class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datos :{
                code: '',
                description: '',
                summary: '',
                hours: '',
                formationProgramId:{
                    value: '',
                    label: ''
                }
            }, 
            erroDescrip: '',
            msjDes: '',
            erroResu: '',
            msjResu: '',
            msjFormation: '',
            showSpinner: false
        };
    }
    componentDidMount(){
        $('[data-toggle="tooltip"]').tooltip();
    }

    handleChange(e) {
        this.setState({
            datos: {
                ...this.state.datos,
                [e.target.name]: e.target.value.toLowerCase().charAt(0).toUpperCase() + e.target.value.slice(1)
            }
        });
    }

    handleChangeSelect(e) {
        this.setState({
            datos: {
                ...this.state.datos,
                formationProgramId:{
                    value: e.value,
                    label: e.label
                }
            }
        });
        document.getElementById('formationProgramId').children[2].innerHTML = '';
    }

    save = async () => {

        this.setState({showSpinner: true});
        if (this.state.datos.description !== '') {
            if (this.state.datos.summary !== '') {
                if(this.state.datos.formationProgramId.value !== ''){
                   
                    let datos = {
                        code: this.state.datos.code,
                        description: this.state.datos.description,
                        summary: this.state.datos.summary,
                        hours: this.state.datos.hours,
                        formationProgramId: this.state.datos.formationProgramId.value
                    }
    
                    let res = await Api('competences', 'POST', sessionStorage.getItem('token'), datos);
                    
                    if (res === "Nueva competencia creada") {
                        $('#tbl').DataTable().destroy();
                        await this.props.pedirDatos();
                        $('#crear').modal('hide');
                        this.props.alert('success','Competencia creada');
                        this.setState({
                            datos :{
                                code: '',
                                description: '',
                                summary: '',
                                hours: '',
                                formationProgramId:{
                                    value: '',
                                    label: ''
                                }
                            }
                        });
                        
    
                    } else {
                        console.log(res);
                        this.props.alert('danger',JSON.stringify(res));
    
                    }
                }else{
                    agregarError(document.getElementById('formationProgramId'),'Debes seleccionar un programa de formación');
                }
            } else {
                agregarError(document.getElementById('summary'),'Debes ingresar un resumen');
            }
        } else {
            agregarError(document.getElementById('description'),'Debes añadir una descripción');
        }
        this.setState({showSpinner: false});

    }

    render() {
        
        return (
            <div className="modal fade" id="crear" data-backdrop="static" role="dialog" 
                aria-labelledby="crearLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="crearLabel">
                                Crear Competencia
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
                            <div className="form-group mt-1" id="code">
                                <label htmlFor="code">
                                    Código
                                    <button  className="btn btn-sm" 
                                        data-toggle="tooltip" 
                                        data-placement="right" 
                                        title="Corresponde al código de la competencia que 
                                        se encuentra en el programa de formación"
                                    >
                                        <i className="fas fa-question-circle"></i>
                                    </button>
                                </label> 
                                <input name="code" type="text" 
                                    className="form-control" 
                                    placeholder="Código de la competencia"
                                    onChange={e => this.handleChange(e)}
                                    value = {this.state.datos.code}
                                    maxLength="20"
                                />
                                <span className="text-danger"/>
                            </div>
                            <div className="form-group" id="description">
                                <label htmlFor="description">
                                        Descripción 
                                        <span className="text-danger">*</span>
                                </label>
                                <input name="description" type="text" 
                                    className="form-control" 
                                    placeholder="Descripción de la competencia"
                                    onChange = {e => this.handleChange(e)}
                                    value = {this.state.datos.description}
                                    maxLength="255"
                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="summary">
                                <label htmlFor="summary">
                                    Resumen 
                                    <span className="text-danger">*</span>
                                </label>
                                <input name="summary" type="text" 
                                    className="form-control" 
                                    placeholder="Resumen de la competencia"
                                    onChange={e=>this.handleChange(e)}
                                    value={this.state.datos.summary}
                                    maxLength="255"
                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="hours">
                                <label htmlFor="hours">
                                    Horas
                                </label>
                                <input name="hours" 
                                    type="number" 
                                    className="form-control" 
                                    min="0" step="1" placeholder="0" max="500"
                                    onChange={e=>this.handleChange(e)}
                                    value={this.state.datos.hours}
                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="formationProgramId">
                                <label htmlFor="summary">
                                    Programa de formación 
                                    <span className="text-danger">*</span>
                                </label>
                                <Select
                                    onChange ={e=>this.handleChangeSelect(e)}
                                    options = {this.props.programas}
                                    value = {this.state.datos.formationProgramId}
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
                                    Crear 
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

export default Crear;