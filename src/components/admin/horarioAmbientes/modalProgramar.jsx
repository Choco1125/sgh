import React, { useState } from 'react';
import Select from 'react-select';
import Spinner from '../../spinner';
import handleMayus from '../../../helpers/handleMayus';
import { validateInForm } from '../../../helpers/validateInForm';
import $ from 'jquery';
import consumidor from '../../../helpers/consumidor';

export default function ModalProgramar({
  temporalyUsers,
  day,
  fechaTrimestre,
  groupInfo,
  elementoInicio,
  periodicities,
  fechaInicio,
  fechaFin,
  setFechaInicio,
  setFechaFin
}) {

  const [spinner, setSpinner] = useState(false);
  const [periodicity, setPeriodicity] = useState({
    value: '',
    label: 'Selecciona una periodicidad'
  });
  const [tempralUser, setTempralUser] = useState({
    value: '',
    label: 'Selecciona un usuario temporal'
  });

  // const validateForm = () => {
  //   validateInForm.isValid = true;
  //   validateInForm.setId('form-programar');
  //   let valuesToEvaluate = {
  //     summary
  //   }
  //   if (isTemporal) {
  //     valuesToEvaluate = {
  //       ...valuesToEvaluate,
  //       temporaryUserId: tempralUser.value
  //     }
  //   } else {
  //     valuesToEvaluate = {
  //       ...valuesToEvaluate,
  //       constantUserId: constantUser.value
  //     }
  //   }
  //   validateInForm.validate(valuesToEvaluate);
  //   return validateInForm.isValid;
  // }

  // const setValuesToProgramation = () => {
  //   console.log(elementoInicio);
  //   let info = `
  // 		<p class="bolder">${ambient.label}</p>
  // 		<p>${isTemporal ? tempralUser.label : constantUser.label}</p>
  // 		<p>${learnerResult.label}</p>
  // 	`;
  //   elementoInicio.innerHTML = info;
  // }

  const save = async () => {
    setSpinner(true);
    // let datosToSend = {
    //   day,
    //   startDate: fechaTrimestre + " " + localStorage.getItem('hi') + ":00",
    //   endDate: fechaTrimestre + " " + localStorage.getItem('hf') + ":00",
    //   ambientId: ambient.value,
    //   programationId: groupInfo.programation[0].id,
    //   summary,
    // }
    // if (isTemporal) {
    //   datosToSend = { ...datosToSend, temporaryUserId: tempralUser.value }
    // } else {
    //   datosToSend = { ...datosToSend, constantUserId: constantUser.value }
    // }

    // if (learnerResult.value !== '') {
    //   datosToSend = {
    //     ...datosToSend,
    //     learningResultId: learnerResult.value
    //   }
    // }
    // if (validateForm()) {
    //   let res = await consumidor.post('schedules', datosToSend);
    //   console.log(res);
    //   if (res.message === "Nuevo horario programado") {
    //     $('#programarClase').modal('hide');
    //     setValuesToProgramation();
    //   }

    // }
    setSpinner(false);
  }

  return (
    <div
      className="modal fade"
      id="programarClase"
      data-backdrop="static"
      role="dialog"
      aria-labelledby="programarClaseLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="programarClaseLabel">
              Programar clase
            </h5>
          </div>
          <div className="modal-body" id="form-programar">
            <span className="font-weight-lighter">
              Los campos con
              <i className="text-danger">*</i>
              son obligatorios
            </span>
            <div className="form-group mt-1" data-name="temporaryUserId">
              <label htmlFor="temporaryUser">
                Usuario temporal
                <span className="text-danger">*</span>
              </label>
              <Select
                options={temporalyUsers}
                value={tempralUser}
                onChange={e => setTempralUser(e)}
              />
              <span className="text-danger" />
            </div>
            <div className="form-group mt-1" data-name="periodicityId">
              <label htmlFor="periodicity">
                Periodicidad
                <span className="text-danger">*</span>
              </label>
              <Select
                options={periodicities}
                value={periodicity}
                onChange={e => setPeriodicity(e)}
              />
              <span className="text-danger" />
            </div>
            <div className="form-group mt-1" data-name="startDate">
              <label htmlFor="startDate">
                Fecha Inicio
                <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                type="date"
                value={fechaInicio}
                onChange={e => setFechaInicio(e.target.value)}
              />
              <span className="text-danger" />
            </div>
            <div className="form-group mt-1" data-name="endDate">
              <label htmlFor="endDate">
                Fecha Fin
                <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                type="date"
                value={fechaFin}
                onChange={e => setFechaFin(e.target.value)}
              />
              <span className="text-danger" />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-success"
              id="btn-save"
              onClick={() => save()}
            >
              Crear <i className="fas fa-save"></i> <Spinner show={spinner} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
