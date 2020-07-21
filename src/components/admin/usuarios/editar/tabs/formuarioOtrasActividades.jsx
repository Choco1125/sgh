import React from 'react';

const manejarFecha = (fecha) => {
  let arregloFechas = fecha.split("T");
  return arregloFechas[0];
};

const CardActividad = ({ actividad }) => (
  <div className="card card-body mt-2 mb-2">
    <h5 className="card-title">{actividad.name}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{actividad.day}</h6>
    <p className="card-text">Fecha inicio: {manejarFecha(actividad.startDate)}</p>
    <p className="card-text">Fecha fin: {manejarFecha(actividad.endDate)}</p>
  </div>
);

function FormuarioOtrasActividades({ actividades }) {
  return (
    <div className="col-12">
      {actividades.map(actividad => <CardActividad key={actividad.id} actividad={actividad} />)}
    </div>
  );
}

export default FormuarioOtrasActividades;
