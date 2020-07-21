import React, { useState } from 'react';
import handleMayus from './../../../../../helpers/handleMayus';
import TagObligatorio from '../../../../tagObligatorio';
import Spinner from './../../../../spinner';
import DisableButton from './../../../../../helpers/DisableButton';
import validator from './../../../../../helpers/validator';
import consumidor from './../../../../../helpers/consumidor';
import { useParams } from 'react-router-dom';
import $ from 'jquery';

function CrearContratoModal({ handleAlert, setContracts }) {

  const [data, setData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: ''
  });
  const [spinner, setSpinner] = useState(false);

  const handleChange = e => setData({
    ...data,
    [e.target.name]: handleMayus(e.target.value)
  });

  const { id } = useParams();

  const save = async () => {
    DisableButton.setId('save-contract');
    DisableButton.disable();
    setSpinner(true);
    if (validator.validarDatos({
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate
    })) {
      let response = await consumidor.post('contracts', { ...data, userId: id });
      if (response.message) {
        $('#crearContrato').modal('hide');
        handleAlert('success', response.message);
      } else if (response === 'Nuevo contrato creado') {
        $('#crearContrato').modal('hide');
        handleAlert('danger', response);
        setData({
          name: '',
          description: '',
          startDate: '',
          endDate: ''
        });

      } else {
        $('#crearContrato').modal('hide');
        handleAlert('danger', 'Ha ocurrido un error, vuelve a intentarlo más tarde.');
        console.log(response);
      }
    }
    DisableButton.enable();
    setSpinner(false);
  }
  return (
    <div className="modal fade" id="crearContrato" data-backdrop="static" data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="crearContratoLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="crearContratoLabel">Crear contrato</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group" id="name">
              <label htmlFor="name">Nombre <TagObligatorio /></label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Nombre del contrato"
                value={data.name}
                onChange={e => handleChange(e)}
              />
              <span className="text-danger"></span>
            </div>
            <div className="form-group" id="description">
              <label htmlFor="description">Descripción</label>
              <input
                type="text"
                className="form-control"
                name="description"
                placeholder="Descripción del contrato"
                value={data.description}
                onChange={e => handleChange(e)}
              />
              <span className="text-danger"></span>
            </div>
            <div className="form-group" id="startDate">
              <label htmlFor="startDate">Fecha inicio <TagObligatorio /></label>
              <input
                type="date"
                className="form-control"
                name="startDate"
                value={data.startDate}
                onChange={e => handleChange(e)}
              />
              <span className="text-danger"></span>
            </div>
            <div className="form-group" id="endDate">
              <label htmlFor="endDate">Fecha fin <TagObligatorio /></label>
              <input
                type="date"
                className="form-control"
                name="endDate"
                value={data.endDate}
                onChange={e => handleChange(e)}
              />
              <span className="text-danger"></span>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cerrar</button>
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={() => save()}
              id="save-contract"
            >
              Crear <i className="ml-1 mr-1 fas fa-save mr-1"></i>
              <Spinner show={spinner} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearContratoModal;
