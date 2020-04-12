import React from 'react';
import Api from './../../Api';
import $ from 'jquery';
import Spinner from './../../spinner';

class Edit extends React.Component {
  
    constructor(props){
        super(props);
        this.state={
            showSpinner: false
        }
    }

    save = async id => {

        this.setState({showSpinner: true});

        if (this.props.description !== '') {
            if (this.props.summary !== '') {
                let datos = {
                    code: this.props.code,
                    description: this.props.description,
                    summary: this.props.summary,
                    hours: this.props.hours
                }

                let res = await Api(`competences/${this.props.id}`, 'PUT', sessionStorage.getItem('token'), datos);
                if (res === "Competencia actualizada") {
                    $('#tbl').DataTable().destroy();
                    await this.props.pedirDatos();
                    $('#editar').modal('hide');
                    this.props.alert('success','Competencia actualizada');
                } else {
                    console.log(res);
                    this.props.alert('danger',res);
                }
            } else {
                this.addErrorResumen('Debes añadir un resúmen');
            }
        } else {
            this.addErrorDescripcion('Debes añadir una descripción.');
        }
        this.setState({showSpinner: false});
    }

    render() {       
        return (
            <div className="modal fade" id="editar" data-backdrop="static" role="dialog" aria-labelledby="editarLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editarLabel">Editar Competencia</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <span className="font-weight-lighter">Los campos con <i className="text-danger">*</i> son obligatorios</span>
                            <div className="form-group mt-1">
                                <label htmlFor="code">Código</label> <button  className="btn btn-sm" data-toggle="tooltip" data-placement="right" title="Corresponde al código de la competencia que se encuentra en el programa de formación"><i className="fas fa-question-circle"></i></button>
                                <input name="code" type="text" className="form-control" placeholder="Código de la competencia"
                                    onChange={
                                        (e) => this.props.setCode(e.target.value)
                                    }
                                    value={this.props.code}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Descripción <span className="text-danger">*</span> </label>
                                <input name="description" type="text" className={`form-control ${this.props.erroDescrip}`} placeholder="Competencia"
                                    onChange={(e) => {
                                        this.props.setDescription(e.target.value);
                                        this.props.removeErrorDescripcion();
                                    }}
                                    value={this.props.description}
                                />
                                <span className="text-danger">{this.props.msjDes}</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="summary">Resumen <span className="text-danger">*</span></label>
                                <input name="summary" type="text" className={`form-control ${this.props.erroResu}`} placeholder="Descripción de la competencia"
                                    onChange={(e) => {
                                        this.props.setSummary(e.target.value);
                                        this.props.removeErrorResumen();
                                    }}
                                    value={this.props.summary}
                                />
                                <span className="text-danger">{this.props.msjResu}</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="hours">Horas</label>
                                <input name="hours" type="number" className="form-control" min="0" step="1" placeholder="0"
                                    onChange={
                                        (e) => this.props.setHours(e.target.value)
                                    }
                                    value={this.props.hours}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-outline-success" onClick={() => this.save(this.props.id)}>Actualizar <i className="fas fa-save"></i> <Spinner show={this.state.showSpinner} /></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;   