import React, { useState } from 'react';
import handleMayus from '../../../../../../helpers/handleMayus';
import TagObligatorio from '../../../../../tagObligatorio';
import Spinner from '../../../../../spinner';
import DisableButton from '../../../../../../helpers/DisableButton';
import validator from '../../../../../../helpers/validator';
import consumidor from '../../../../../../helpers/consumidor';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import { useEffect } from 'react';

function EditarContratoModal({ handleAlert, setContracts, contrato }) {

  const manejarFecha = (fecha) => {
    let arregloFechas = fecha.split("T");
    return arregloFechas[0];
  };

  const [data, setData] = useState({
    id: 0,
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

  useEffect(() => {
    setData({
      id: contrato.id || '',
      name: contrato.name || '',
      description: contrato.description || '',
      startDate: manejarFecha(contrato.startDate || ''),
      endDate: manejarFecha(contrato.endDate || '')
    });
  }, [contrato]);

  const save = async () => {
    DisableButton.setId('update-contract');
    DisableButton.disable();
    setSpinner(true);
    if (validator.validarDatosEdit({
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate
    })) {
      let response = await consumidor.put('contracts', data.id, { ...data, userId: id });
      if (response === 'Contrato actualizado') {
        $('#EditarContrato').modal('hide');
        handleAlert('success', response);
        let datos = await consumidor.get(`users/${id}`);
        setContracts(datos.contract);
        setData({
          name: '',
          description: '',
          startDate: '',
          endDate: ''
        });
      } else {
        $('#EditarContrato').modal('hide');
        handleAlert('danger', 'Ha ocurrido un error, vuelve a intentarlo más tarde.');
        console.log(response);
      }
    }
    DisableButton.enable();
    setSpinner(false);
  }
  return (
    <div className="modal fade" id="EditarContrato" data-backdrop="static" data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="EditarContratoLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="EditarContratoLabel">Editar contrato</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group" id="name_edit">
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
            <div className="form-group" id="description_edit">
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
            <div className="form-group" id="startDate_edit">
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
            <div className="form-group" id="endDate_edit">
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
              id="update-contract"
            >
              Actualizar <i className="ml-1 mr-1 fas fa-save mr-1"></i>
              <Spinner show={spinner} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarContratoModal;
