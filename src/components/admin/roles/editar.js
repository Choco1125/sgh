import React,{useState} from 'react';
import Spinner from './../../spinner';
import validator from '../../../helpers/validator';
import consumidor from '../../../helpers/consumidor';
import $ from 'jquery';
import handleError from '../../../helpers/handleError';


const Editar = ({datos,handleChange,actualizar,alerta}) =>{

    const [spinner, setSpinner] = useState(false);

    const update = async () => {
        setSpinner(true);

        if(validator.validarDatosEdit(datos)){
            let res = await consumidor.put('rols',datos.id,datos);

            if(res === 'Rol actualizado'){
                await actualizar();
                $('#editar').modal('hide');
                alerta(res,'success');
            }else if(res === 'Rol ya existente'){
                handleError.inputMsj('name_edit',res);
            }else if(res.message){
                $('#editar').modal('hide');
                alerta(res.message,'danger');
            }else{
                $('#editar').modal('hide');
                alerta(JSON.stringify(res),'danger');
                console.log(res);
            }
        }

        setSpinner(false);
    }

    return (
        <div
            className="modal fade" id="editar" data-backdrop="static" role="dialog"
            aria-labelledby="editarLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editarLabel">Editar rol</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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
                        <button type="button"
                            className="btn btn-outline-secondary"
                            data-dismiss="modal"
                        >
                            Cerrar
                    </button>
                        <button type="button"
                            className="btn btn-outline-success"
                            onClick={() => update()}
                        >
                            Actualizar <i className="fas fa-save"></i> <Spinner show={spinner} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Editar;