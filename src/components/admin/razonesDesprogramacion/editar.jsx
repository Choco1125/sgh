import React, { useState } from 'react';
import Spinner from '../../spinner';
import handleMayus from '../../../helpers/handleMayus';
import validator from '../../../helpers/validator';
import consumidor from '../../../helpers/consumidor';
import $ from 'jquery';
import handleError from '../../../helpers/handleError';



const Editar = ({name,id,setName,update,alerta})=>{

    const [spinner, setSpinner] = useState(false)

    const actualizar = async()=>{
        setSpinner(true);
        let datos = {
            name
        }
        if(validator.validarDatosEdit(datos)){


            let res = await consumidor.put('deprogrammingReasons',id,datos);

            if(res === 'Razon de desprogramacion actualizada'){
                await update();
                $('#editar').modal('hide');
                alerta(res,'success');
            }else if(res === 'Razon de desprogramacion ya existente'){
                handleError.inputMsj('name_edit',res);
            }else{
                console.log(res);
            }
        }


        setSpinner(false);
    }

    return(
        <div className="modal fade" id="editar" data-backdrop="static" role="dialog" 
                aria-labelledby="editarLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editarLabel">
                                Editar razón de desprogramación
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
                          
                            <div className="form-group" id="name_edit">
                                <label htmlFor="name">
                                        Nombre 
                                        <span className="text-danger">*</span>
                                </label>
                                <input name="name" type="text" 
                                    className="form-control" 
                                    placeholder="Nombre de la razón de desprogramación"
                                    onChange = {e =>setName(handleMayus(e.target.value))}
                                    value = {name}
                                    maxLength="255"
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
                                onClick={() => actualizar()}>
                                    Actualizar <i className="ml-1 mr-1 fas fa-save"></i> <Spinner show={spinner} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Editar;