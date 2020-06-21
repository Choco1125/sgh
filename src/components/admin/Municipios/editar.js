import React from 'react';
import Select from 'react-select';
import Spinner from './../../spinner';
import validator from '../../../helpers/validator';
import consumidor from '../../../helpers/consumidor';
import $ from 'jquery';
import handleError from '../../../helpers/handleError';

class Editar extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            spinner:{
                show: false
            }
        }
    }

    async update(){
        this.setState({
            spinner:{
                show: true
            }
        });
        if(validator.validarDatosEdit(this.props.datos)){
            let datos = {
                name: this.props.datos.name,
                zoneId: this.props.datos.zone_id.value
            }

            let res = await consumidor.put('municipalities',this.props.datos.id,datos);

            if(res === "Municipio actualizado"){
                await this.props.update();
                $('#editar').modal('hide');
                this.props.alerta('success',res);
            }else if(res.message){
                $('#editar').modal('hide');
                this.props.alerta('danger',res.message);
            }else if(res === "Muncipio ya existente"){
                handleError.inputMsj('name_edit',res);
            }else{
                $('#editar').modal('hide');
                this.props.alerta('danger',res);
                console.log(res);
            }
        }
        this.setState({
            spinner:{
                show: false
            }
        });
    }

    render(){
        return(
            <div className="modal fade" id="editar" data-backdrop="static" role="dialog" 
                aria-labelledby="editarLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editarLabel">
                                Editar Municipio
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
                            <div className="form-group mt-1" id="name_edit">
                                <label htmlFor="name">
                                    Nombre <span className="text-danger">*</span>
                                </label>
                                <input name="name" type="text" 
                                    className="form-control" 
                                    placeholder="Nombre del municipio"
                                    value = { this.props.datos.name}
                                    onChange = {(e)=> this.props.handleChange(e)}
                                />
                                <span className="text-danger"></span>
                            </div>

                            <div className="form-group" id="zone_id_edit">
                                <label htmlFor="zone_id">
                                    Zona <span className="text-danger">*</span>
                                </label>
                                <Select 
                                    value = { this.props.datos.zone_id }
                                    options = { this.props.zonas } 
                                    onChange = {e => this.props.handleChangeSelect(e)}
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
                                Actualizar <i className="mr-1 fas fa-save"></i> 
                                <Spinner show={this.state.spinner.show} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Editar