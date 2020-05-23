import React, { useState } from 'react';
import Spinner from '../../spinner';
import handleMayus from '../../../helpers/handleMayus';
import validator from '../../../helpers/validator';
import consumidor from '../../../helpers/consumidor';
import $ from 'jquery';
import handleError from '../../../helpers/handleError';

const Crear = ({alerta,actualizar}) => {

    const [spinner, setSpinner] = useState(false);
    const [name, setName] = useState('');
    const [observations, setObservations] = useState('');
    const [type, setType] = useState('');

    const save = async ()=>{
        setSpinner(true);
        if(validator.validarDatos({name})){
            let datos = {
                name,
                observations,
                type
            }
            console.log(datos);
            let res = await consumidor.post('temporaryUserActivities',datos);
            if(res === 'Usuario/Actividad creada(o)'){
                await actualizar();
                $('#crear').modal('hide');
                alerta(res,'success');
                setName('');
                setObservations('');
                setType('');
            }else if(res === 'Usuario/Actividad ya existente'){
                handleError.inputMsj('name',res);
            }else{
                console.log(res);
            }
        }
        setSpinner(false);
    }

    return (
        <div className="modal fade" id="crear" data-backdrop="static" role="dialog"
            aria-labelledby="crearLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="crearLabel">
                            Crear usuario temporal
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

                        <div className="form-group" id="name">
                            <label htmlFor="name">
                                Nombre <span className="text-danger">*</span>
                            </label>
                            <input name="name" type="text"
                                className="form-control"
                                placeholder="Nombre de la razón de desprogramación"
                                onChange={e => setName(handleMayus(e.target.value))}
                                value={name}
                                maxLength="255"
                            />
                            <span className="text-danger"></span>
                        </div>

                        <div className="form-group" id="observations">
                            <label htmlFor="observations">
                                Observación
                            </label>
                            <input name="observations" type="text"
                                className="form-control"
                                placeholder="Observación de la razón de desprogramación"
                                onChange={e => setObservations(handleMayus(e.target.value))}
                                value={observations}
                                maxLength="255"
                            />
                            <span className="text-danger"></span>
                        </div>

                        <div className="form-group" id="type">
                            <label htmlFor="type">
                                Tipo
                            </label>
                            <input name="type" type="text"
                                className="form-control"
                                placeholder="Tipo de razón de desprogramación"
                                onChange={e => setType(handleMayus(e.target.value))}
                                value={type}
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
                            Crear <i className="ml-1 mr-1 fas fa-save"></i>
                            <Spinner show={spinner} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Crear;