import React, { useEffect, useState } from 'react';
import { ModalCrear } from './otrasActividades/CrearActividadModal';
import consumidor from './../../../../../helpers/consumidor';
import { ModalEliminar } from './otrasActividades/eliminar';
import { ModalEditar } from "./otrasActividades/Editar";

const manejarFecha = (fecha) => {
  let arregloFechas = fecha.split("T");
  return arregloFechas[0];
};

const CardActividad = ({ actividad, setActivityId, setActivity }) => (
  <div className="card card-body mt-2 mb-2">
    <h5 className="card-title">{actividad.name}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{actividad.day}</h6>
    <p className="card-text">Fecha inicio: {manejarFecha(actividad.startDate)}</p>
    <p className="card-text">Fecha fin: {manejarFecha(actividad.endDate)}</p>
    <div className="row">
      <button
        className="ml-2 btn btn-link btn-sm"
        onClick={() => setActivity(actividad)}
        data-target="#editarActividad"
        data-toggle="modal"
      >
        Editar
      </button>
      <button
        className="btn btn-link btn-sm text-danger"
        data-target="#eliminarActividad"
        data-toggle="modal"
        onClick={() => setActivityId(actividad.id)}
      >
        Eliminar
      </button>
    </div>
  </div>
);

function FormuarioOtrasActividades({ actividades, alerta, setOtrasActividades }) {

  const [typeActivities, setTypeActivities] = useState([{ label: 'Selecciona un tipo de actividad', value: '' }]);
  const [activityId, setActivityId] = useState('');
  const [activity, setActivity] = useState({
    id: '',
    name: '',
    typeActivityId: '',
    day: '',
    startDate: '',
    endDate: '',
    userId: ''
  });

  useEffect(() => {
    const getActivies = async () => {
      let response = await consumidor.get('typeActivities');
      if (response) {
        let datos = [];
        response.map(actividad => datos.push({ label: actividad.name, value: actividad.id }));
        setTypeActivities(datos);
      }
    }
    getActivies();
  }, [actividades])

  return (
    <div className="card-body">
      <div className="row justify-content-end">
        <button className="btn btn-outline-success btn-sm mr-3" data-toggle="modal" data-target="#crearActividad">Agregar</button>
      </div>
      <div className="col-12">
        {actividades.map(actividad => <CardActividad key={actividad.id} actividad={actividad} setActivityId={setActivityId} setActivity={setActivity} />)}
      </div>
      <ModalCrear
        activitiesTypes={typeActivities}
        alerta={alerta}
        setOtrasActividades={setOtrasActividades}
      />
      <ModalEliminar
        idActivy={activityId}
        alerta={alerta}
        update={setOtrasActividades}
      />
      <ModalEditar
        activitiesTypes={typeActivities}
        alerta={alerta}
        setOtrasActividades={setOtrasActividades}
        activity={activity}
      />
    </div>
  );
}
export default FormuarioOtrasActividades;
