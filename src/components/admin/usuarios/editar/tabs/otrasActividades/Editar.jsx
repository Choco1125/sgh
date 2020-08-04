import React from 'react';
import Spinner from './../../../../../spinner';
import { useState } from 'react';
import TagObligatorio from '../../../../../tagObligatorio';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import handleMayus from '../../../../../../helpers/handleMayus';
import DisableButton from '../../../../../../helpers/DisableButton';
import $ from 'jquery';
import { validateInForm } from '../../../../../../helpers/validateInForm';
import consumidor from '../../../../../../helpers/consumidor';
import { useEffect } from 'react';

const dias = [
  { label: 'Lunes', value: 'Lunes' },
  { label: 'Martes', value: 'Martes' },
  { label: 'Miércoles', value: 'Miércoles' },
  { label: 'Jueves', value: 'Jueves' },
  { label: 'Viernes', value: 'Viernes' },
  { label: 'Sábado', value: 'Sábado' }
];

const manejarFecha = (fecha) => {
  let arregloFechas = fecha.split("T");
  return arregloFechas[0];
};

export const ModalEditar = ({ activitiesTypes, activity, setOtrasActividades, alerta }) => {

  const [spinner, setSpinner] = useState(false);
  const { id } = useParams();
  const [datos, setDatos] = useState({
    id: '',
    name: '',
    typeActivityId: '',
    day: '',
    startDate: '',
    endDate: '',
    userId: id
  });
  const [typeActivity, setTypeActivity] = useState({
    label: 'Selecciona un tipo de actividad',
    value: ''
  });
  const [day, setDay] = useState({
    label: 'Selecciona un tipo de actividad',
    value: ''
  });

  useEffect(() => {
    setDatos({
      id: activity.id || '',
      name: activity.name || '',
      typeActivityId: activity.typeActivityId || '',
      day: activity.day || '',
      startDate: manejarFecha(activity.startDate) || '',
      endDate: manejarFecha(activity.endDate) || '',
      userId: activity.userId || ''
    });
    let typeActivity = activitiesTypes.filter(actividad => actividad.value === activity.typeActivityId);
    setTypeActivity(typeActivity[0]);
    setDay({
      label: activity.day,
      value: activity.day
    });
  }, [activity, activitiesTypes]);



  const handleChange = e => setDatos({
    ...datos,
    [e.target.name]: handleMayus(e.target.value)
  });

  const save = async () => {
    DisableButton.setId('update-zone');
    DisableButton.disable();
    setSpinner(true);
    validateInForm.setId('formNewOtherActivity');
    validateInForm.validLength(datos.name, 'name', 4, 255);
    validateInForm.validate(datos);

    if (validateInForm.isValid) {
      let response = await consumidor.put('otherActivities', datos.id, datos);
      if (response) {
        if (response === 'Actividad actualizada') {
          let datos = await consumidor.get(`users/${id}`);
          await setOtrasActividades(datos.otherActivity);
          alerta('success', response);
          $('#editarActividad').modal('hide');
          setDatos({
            name: '',
            typeActivityId: '',
            day: '',
            startDate: '',
            endDate: '',
            userId: id
          });
        } else {
          alerta('danger', response.message || response);
          $('#editarActividad').modal('hide');
        }
      } else {
        alerta('danger', 'Error al intentar enviar la información');
        $('#editarActividad').modal('hide');
      }
    }
    DisableButton.enable();
    setSpinner(false);
  }

  return (
    <div
      className="modal fade"
      id="editarActividad"
      data-backdrop="static"
      data-keyboard="false"
      tabIndex="-1" role="dialog"
      aria-labelledby="editarActividadLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editarActividadLabel">Editar otra actividad</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" id="formNewOtherActivity">
            <div className="form-group" data-name="name">
              <label htmlFor="name">Nombre <TagObligatorio /></label>
              <input type="text" name="name" className="form-control" placeholder="Nombre" onChange={e => handleChange(e)} value={datos.name} />
              <span className="text-danger"></span>
            </div>
            <div className="form-group" data-name="typeActiviyId" >
              <label htmlFor="typeActiviyId">Tipo de actividad <TagObligatorio /></label>
              <Select
                options={activitiesTypes}
                value={typeActivity}
                onChange={e => {
                  setTypeActivity(e);
                  setDatos({ ...datos, typeActivityId: e.value });
                }}
              />
              <span className="text-danger"></span>
            </div>
            <div className="form-group" data-name="day">
              <label htmlFor="day">Día <TagObligatorio /></label>
              <Select
                options={dias}
                value={day}
                onChange={e => {
                  setDay(e);
                  setDatos({ ...datos, day: e.value });
                }}
              />
              <span className="text-danger"></span>
            </div>
            <div className="form-group" data-name="startDate">
              <label htmlFor="startDate">Fecha Inicio <TagObligatorio /></label>
              <input type="date" name="startDate" className="form-control" placeholder="Fecha inicio" onChange={e => handleChange(e)} value={datos.startDate} />
              <span className="text-danger"></span>
            </div>
            <div className="form-group" data-name="endDate">
              <label htmlFor="endDate">Fecha Fin <TagObligatorio /></label>
              <input type="date" name="endDate" className="form-control" placeholder="Fecha fin" onChange={e => handleChange(e)} value={datos.endDate} />
              <span className="text-danger"></span>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cerrar</button>
            <button
              type="button"
              className="btn btn-outline-success"
              id="update-zone"
              onClick={() => save()}
            >
              Guardar <i className="ml-1 mr-1 fas fa-save mr-1"></i>
              <Spinner show={spinner} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}