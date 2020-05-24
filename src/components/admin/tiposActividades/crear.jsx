import React, { useState } from 'react';
import Spinner from '../../spinner';
import handleMayus from '../../../helpers/handleMayus';
import validator from '../../../helpers/validator';
import consumidor from '../../../helpers/consumidor';
import $ from 'jquery';
import handleError from '../../../helpers/handleError';

const Crear = ({update,alerta}) => {

    const [spinner, setSpinner] = useState(false);
    const [name, setName] = useState('');
    const [color, setColor] = useState('#000000');

    const save = async ()=>{
        setSpinner(true);
        if(validator.validarDatos({name,color})){
            let res = await consumidor.post('typeActivities',{name,color});
            if(res === 'Nuevo tipo de actividad creado'){
                await update();
                $('#crear').modal('hide');
                alerta(res,'success');
                setName('');
                setColor('#000000');
            }else if(res === 'Tipo de actividad ya existente'){
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
                            Crear razón de desprogramación
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
                                placeholder="Nombre de la actividad"
                                onChange={e => setName(handleMayus(e.target.value))}
                                value={name}
                                maxLength="255"
                            />
                            <span className="text-danger"></span>
                        </div>
                        <div className="form-group" id="color">
                            <label htmlFor="color">
                                Color <span className="text-danger">*</span>
                            </label>
                            <input name="color" type="color"
                                className="form-control"
                                placeholder="Color de la actividad"
                                onChange={e => setColor(e.target.value)}
                                value={color}
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
                            Crear
                                     <i className="ml-1 mr-1 fas fa-save"></i>
                            <Spinner show={spinner} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Crear;