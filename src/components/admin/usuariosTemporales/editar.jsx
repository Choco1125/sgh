import React, { useState } from 'react';
import Spinner from '../../spinner';

const Editar = ({datos,periocidades,handleChange,handleChangeSelect}) =>{
    const [spinner, setSpinner] = useState(false);

    const save = ()=>{
        setSpinner(true);
        console.log(datos);
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
                                Nombre <span className="text-danger">*</span>
                            </label>
                            <input name="name" type="text"
                                className="form-control"
                                placeholder="Nombre de la razón de desprogramación"
                                onChange={e => handleChange(e.target.value)}
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
                                onChange={e => handleChange(e.target.value)}
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
                                onChange={e => handleChange(e.target.value)}
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