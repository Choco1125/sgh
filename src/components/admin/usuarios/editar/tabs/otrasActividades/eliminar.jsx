import React, { useState } from 'react';
import Spinner from './../../../../../spinner';
import DisableButton from './../../../../../../helpers/DisableButton';
import consumidor from '../../../../../../helpers/consumidor';
import $ from 'jquery';
import { useParams } from 'react-router-dom';


export const ModalEliminar = ({ idActivy, alerta, update }) => {

  const [showSpinner, setshowSpinner] = useState(false);
  const { id } = useParams();

  const eliminar = async () => {
    DisableButton.setId('btn-elimnar');
    setshowSpinner(true);
    DisableButton.disable();
    let response = await consumidor.delete('otherActivities', idActivy);
    if (response) {
      if (response === 'Actividad eliminado') {
        let datos = await consumidor.get(`users/${id}`);
        await update(datos.otherActivity);
        alerta('success', response);
        $('#eliminarActividad').modal('hide');
      } else {
        alerta('danger', response.message || response);
        $('#eliminarActividad').modal('hide');
      }
    }
    setshowSpinner(false);
    DisableButton.enable();
  }

  return (
    <div>
      <div
        className="modal fade"
        id="eliminarActividad"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="eliminarActividadLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="eliminarActividadLabel"
              >
                ¿Deseas eliminar la actividad del usuario?
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
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
                onClick={() => eliminar()}
                id="btn-elimnar"
              >
                Sí, eliminar <Spinner show={showSpinner} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}