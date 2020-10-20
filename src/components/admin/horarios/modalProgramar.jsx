import React, { useState } from 'react';
import Select from 'react-select';
import Spinner from '../../spinner';
import handleMayus from '../../../helpers/handleMayus';
import {validateInForm} from '../../../helpers/validateInForm';
import $ from 'jquery';
import consumidor from '../../../helpers/consumidor';

export default function ModalProgramar({ learningResults, ambients, users, temporalyUsers, day,fechaTrimestre, groupInfo, elementoInicio }) {

  const [spinner, setSpinner] = useState(false);
  const [learnerResult, setLearnerResult] = useState({
    value: '',
    label: 'Selecciona un resultado de aprendizaje'
  });
  const [ambient, setAmbient] = useState({
    value: '',
    label: 'Selecciona un ambiente'
  });
  const [isTemporal, setIsTemporal] = useState(false);
  const [constantUser, setConstantUser] = useState({
    value: '',
    label: 'Selecciona un usuario'
  });
  const [tempralUser, setTempralUser] = useState({
    value: '',
    label: 'Selecciona un usuario temporal'
  });
  const [summary, setSummary] = useState("");

  const validateForm = () => {
    validateInForm.isValid = true;
    validateInForm.setId('form-programar');
    let valuesToEvaluate = {
      ambientId: ambient.value,
      summary
    }
    if (isTemporal) {
      valuesToEvaluate = {
        ...valuesToEvaluate,
        temporaryUserId: tempralUser.value
      }
    }else{
      valuesToEvaluate = {
        ...valuesToEvaluate,
        constantUserId: constantUser.value
      }
    }
    validateInForm.validate(valuesToEvaluate);
    return validateInForm.isValid;
  }

	const setValuesToProgramation = () => {
		console.log(elementoInicio);
		let info = `
			<p class="bolder">${ambient.label}</p>
			<p>${isTemporal ? tempralUser.label  : constantUser.label}</p>
			<p>${learnerResult.label}</p>
		`;
		elementoInicio.innerHTML = info;
	}

  const save = async () => {
		setSpinner(true);
    let datosToSend = {
      day,
      startDate: fechaTrimestre + " " + localStorage.getItem('hi') + ":00",
      endDate: fechaTrimestre + " " + localStorage.getItem('hf') + ":00",
      ambientId: ambient.value,
      programationId: groupInfo.programation[0].id,
      summary,
    }
    if (isTemporal) {
      datosToSend = {...datosToSend, temporaryUserId: tempralUser.value }
    }else{
      datosToSend = {...datosToSend, constantUserId : constantUser.value }
    }

    if (learnerResult.value !== '') {
      datosToSend = {
        ...datosToSend,
        learningResultId: learnerResult.value
      }
    }
    if (validateForm()) {
      let res = await consumidor.post('schedules',datosToSend);
      console.log(res);
      if(res.message === "Nuevo horario programado"){
				$('#programarClase').modal('hide');
				setValuesToProgramation();
      }

    }
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
            {/* <button
              type="button"
              className="close" data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button> */}
          </div>
          <div className="modal-body" id="form-programar">
            <span className="font-weight-lighter">
              Los campos con
              <i className="text-danger">*</i>
              son obligatorios
            </span>
            <div className="form-group mt-1" data-name="learningResultId">
              <label htmlFor="resultadoAprendizaje">
                Resultado de Aprendizaje
                <span className="text-danger">*</span>
              </label>
              <Select
                options={learningResults}
                value={learnerResult}
                onChange={e => setLearnerResult(e)}
              />
              <span className="text-danger" />
            </div>
            <div className="form-group mt-1" data-name="ambientId">
              <label htmlFor="ambiente">
                Ambiente
                <span className="text-danger">*</span>
              </label>
              <Select
                options={ambients}
                value={ambient}
                onChange={e => setAmbient(e)}
              />
              <span className="text-danger" />
            </div>
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch1"
                onChange={() => setIsTemporal(!isTemporal)} />
              <label
                className="custom-control-label"
                for="customSwitch1"
              >
                Usuario temporal
              </label>
            </div>
            {
              !isTemporal ?
                <div className="form-group mt-1" data-name="constantUserId">
                  <label htmlFor="constantUser">
                    Usuario
                    <span className="text-danger">*</span>
                  </label>
                  <Select
                    options={users}
                    value={constantUser}
                    onChange={e => setConstantUser(e)}
                  />
                  <span className="text-danger" />
                </div>
                :
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
            }
            <div className="form-group mt-1" data-name="summary">
              <label htmlFor="summary">
                Resumen
                <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="summary"
                value={summary}
                onChange={e => setSummary(handleMayus(e.target.value))}
              />
              <span className="text-danger" />
            </div>
          </div>
          <div className="modal-footer">
            {/* <button
              type="button"
              className="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              Cerrar
            </button> */}
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
