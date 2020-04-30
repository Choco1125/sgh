import React, { useState } from 'react';
import Spinner from '../../spinner';
import validator from '../../../helpers/validator';
import consumidor from '../../../helpers/consumidor';
import $ from 'jquery';
import handleError from '../../../helpers/handleError';


const Editar = ({datos,handleChange,alerta,update})=>{

    const [spinner, setSpinner] = useState(false);

    const hide = ()=>$('#editar').modal('hide');


    const updat = async ()=>{
        setSpinner(true);
        if(validator.validarDatosEdit(datos)){
            let res = await consumidor.put('modalities',datos.id,datos);
            switch (res) {
                case 'Modalidad actualizada':
                    await update();
                    hide();
                    alerta(res,'success');
                    break;
                case 'Modalidad ya existente':
                    handleError.inputMsj('name',res);
                    break;
                case res.message:
                    hide();
                    alerta(res.message,'danger');
                    break;
                default:
                    hide();
                    alerta(JSON.stringify(res),'danger');
                    break;
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
                            Editar modalidad
                            </h5>
                        <button type="button" className="close" data-dismiss="modal"
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <span className="font-weight-lighter">
                            Los campos con
                                <i className="text-danger">* </i>
                                son obligatorios
                            </span>
                        <div className="form-group mt-1" id="name_edit">
                            <label htmlFor="name">
                                Nombre
                                <span className="text-danger">*</span>
                            </label>
                            <input name="name" type="text"
                                className="form-control"
                                placeholder="Nombre de la posición"
                                onChange={e => handleChange(e)}
                                value={datos.name}
                            />
                            <span className="text-danger" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary"
                            data-dismiss="modal">
                            Cerrar
                            </button>
                        <button type="button" className="btn btn-outline-success"
                            onClick={() => updat()}
                        >
                            Actualizar <i className="mr-1 fas fa-save"></i>
                            <Spinner show={spinner} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Editar;