import React, { useState } from 'react'
import consumidor from '../../../../../helpers/consumidor';
import $ from 'jquery';
import { useParams } from 'react-router-dom';
import Spinner from '../../../../spinner';
import DisableButton from '../../../../../helpers/DisableButton';

export default function EliminarContratoModal({ handleAlert, idContract, setContrato }) {

  const { id } = useParams()
  const [showSpinner, setShowSpinner] = useState(false);

  const eliminar = async () => {
    DisableButton.setId('btn-elimnar-contrato');
    DisableButton.disable();
    setShowSpinner(true);
    let response = await consumidor.delete('contracts', idContract);
    if (response === 'Contrato eliminado') {
      let datos = await consumidor.get(`users/${id}`);
      setContrato(datos.contract);
      $('#eliminarContrato').modal('hide');
      handleAlert('success', response);
    } else {
      console.log(response);
      $('#eliminarContrato').modal('hide');
      handleAlert('danger', response);
    }
    DisableButton.enable()
    setShowSpinner(false);
  }

  return (
    <div>
      <div className="modal fade" id="eliminarContrato" data-backdrop="static" data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="eliminarContratoLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="eliminarContratoLabel">¿Deseas eliminar el contrato?</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cerrar</button>
              <button type="button" className="btn btn-outline-danger" onClick={() => eliminar()} id="btn-elimnar-contrato">Sí, eliminar <Spinner show={showSpinner} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
