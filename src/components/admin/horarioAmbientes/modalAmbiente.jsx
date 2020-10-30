import React from 'react';
import Select from 'react-select';
import handleError from '../../../helpers/handleError';
import $ from 'jquery';

export default function ModalAmbiente({ ambients, selected, handler }) {

  const save = async () => {
    if (selected.value !== '') {
      $('#programa').modal('hide');
    } else {
      handleError.select('group');
    }
  }
  return (
    <div
      className="modal fade"
      id="ambiente"
      data-backdrop="static"
      role="dialog"
      aria-labelledby="ambienteLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="ambienteLabel">
              Selecciona un ambiente
            </h5>
          </div>
          <div className="modal-body" id="form-grupo">
            <span className="font-weight-lighter">
              Los campos con
              <i className="text-danger">*</i>
              son obligatorios
            </span>
            <div className="form-group mt-1" id="group">
              <label htmlFor="group">
                Ambiente
                <span className="text-danger">*</span>
              </label>
              <Select
                options={ambients}
                value={selected}
                onChange={e => handler(e)}
              />
              <span className="text-danger" />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-success"
              id="btn-select-group"
              onClick={() => save()}
            >
              Seleccionar <i className="fas fa-check"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
