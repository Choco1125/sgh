import React, { useState } from 'react'
import DisableButton from '../../../helpers/DisableButton';
import Spinner from '../../spinner'

export default function Eliminar({ alerta, actualizar, programacion }) {
  const [spinner, setSpinner] = useState(false);

  const save = async () => {
    DisableButton.setId('btn-eliminar');
    DisableButton.disable();
    setSpinner(true);
  }

  return (
    <div
      className="modal fade"
      id="eliminar"
      data-backdrop="static"
      role="dialog"
      aria-labelledby="eliminarLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="eliminarLabel">
              ¿Deseas eliminar esta programación?
            </h5>
            <button
              type="button"
              className="close" data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              id="btn-eliminar"
              onClick={() => save()}
            >
              Sí, eliminar <Spinner show={spinner} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
