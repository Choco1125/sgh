import React, { useState } from 'react';
import Spinner from '../../spinner';
import validator from '../../../helpers/validator';
import consumidor from '../../../helpers/consumidor';
import $ from 'jquery';
import handleError from '../../../helpers/handleError';

const Editar = ({datos,handleChange,update,alerta}) =>{
    const [spinner, setSpinner] = useState(false);

    const save = async ()=>{
        setSpinner(true);
        if(validator.validarDatosEdit({name: datos.name})){

            let data = {
                name: datos.name,
                observations: datos.observations,
                type: datos.type
            }

            let res = await consumidor.put('temporaryUserActivities',datos.id,data);

            if(res === 'Usuario/Actividad actualizada(o)'){
                await update();
                $('#editar').modal('hide');
                alerta(res,'success');
            }else if(res.message){
                $('#editar').modal('hide');
                alerta(res.danger,'danger');
            }else if(res === 'Usuario/Actividad ya existente'){
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
                            Editar usuario temporal
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
                                Nombre <span className="text-danger">*</span>
                            </label>
                            <input name="name" type="text"
                                className="form-control"
                                placeholder="Nombre de la razón de desprogramación"
                                onChange={e => handleChange(e)}
                                value={datos.name}
                                maxLength="255"
                            />
                            <span className="text-danger"></span>
                        </div>

                        <div className="form-group" id="observations_edit">
                            <label htmlFor="observations">
                                Observación
                            </label>
                            <input name="observations" type="text"
                                className="form-control"
                                placeholder="Observación de la razón de desprogramación"
                                onChange={e => handleChange(e)}
                                value={datos.observations}
                                maxLength="255"
                            />
                            <span className="text-danger"></span>
                        </div>

                        <div className="form-group" id="type_edit">
                            <label htmlFor="type">
                                Tipo
                            </label>
                            <input name="type" type="text"
                                className="form-control"
                                placeholder="Tipo de razón de desprogramación"
                                onChange={e => handleChange(e)}
                                value={datos.type}
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
                            onClick={() => save()}>
                            Actualizar <i className="ml-1 mr-1 fas fa-save"></i>
                            <Spinner show={spinner} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Editar;