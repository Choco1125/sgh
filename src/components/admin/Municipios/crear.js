import React from 'react';
import handleMayus from './../../../helpers/handleMayus';
import Spinner from "./../../spinner";
import Select from "react-select";
import validator from '../../../helpers/validator';
import handleError from '../../../helpers/handleError';
import consumidor from './../../../helpers/consumidor';
import $ from 'jquery';

class Crear extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            datos:{
                name: '',
                zone_id: {
                    value: '',
                    label: ''
                }
            },
            spinner:{
                show: false
            }
        }
    }

    handleChange(e){
        this.setState({
            datos:{
                ...this.state.datos,
                [e.target.name] : handleMayus(e.target.value)
            }
        });
    }

    handleChangeSelect(e){
        this.setState({
            datos:{
                ...this.state.datos,
                zone_id: e
            }
        });
        handleError.removeErrorSelect('zone_id');
    }

    async save(){
        this.setState({
            spinner:{
                show: true
            }
        });

        if(validator.validarDatos(this.state.datos)){
            let datos = {
                name: this.state.datos.name,
                zoneId: this.state.datos.zone_id.value
            }

            let res = await consumidor.post('municipalities',datos);

            if(res === "Nuevo municipio creado"){
                await this.props.update();
                this.props.alerta('success',res);
                $('#crear').modal('hide');
                this.setState({
                    datos:{
                        name: '',
                        zone_id: {
                            value: '',
                            label: ''
                        } 
                    }
                });
            }else if(res.message){
                console.log(res.message);
            }else if(res === "Muncipio ya existente"){
                handleError.inputMsj('name',res);
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
            <div className="modal fade" id="crear" data-backdrop="static" role="dialog" 
                aria-labelledby="crearLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="crearLabel">
                                Crear Municipio
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
                            <div className="form-group mt-1" id="name">
                                <label htmlFor="name">
                                    Nombre <span className="text-danger">*</span>
                                </label>
                                <input name="name" type="text" 
                                    className="form-control" 
                                    placeholder="Nombre del municipio"
                                    value = { this.state.datos.name}
                                    onChange = {(e)=> this.handleChange(e)}
                                />
                                <span className="text-danger"></span>
                            </div>

                            <div className="form-group" id="zone_id">
                                <label htmlFor="zone_id">
                                    Zona <span className="text-danger">*</span>
                                </label>
                                <Select 
                                    value = { this.state.datos.zone_id }
                                    options = { this.props.zonas } 
                                    onChange = {e => this.handleChangeSelect(e)}
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
                                Crear <i className="mr-1 fas fa-save"></i> 
                                <Spinner show={this.state.spinner.show} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Crear;