import React from 'react';

const manejarFecha = (fecha) => {
  let arregloFechas = fecha.split("T");
  return arregloFechas[0];
};

const CardContrato = ({ contrato }) => (
  <div className="card card-body col-12 mt-2 mb-2">
    <h5 className="card-title">{contrato.name}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{contrato.description}</h6>
    <p className="card-text">Inicio: {manejarFecha(contrato.startDate)}</p>
    <p className="card-text">Fin: {manejarFecha(contrato.endDate)}</p>
  </div>
);

const FormularioContratros = ({ contratos }) => {
  return (
    <div className="card-body jut">
      {contratos.map(contrato => <CardContrato contrato={contrato} key={contrato.id} />)}
    </div>
  );
}

export default FormularioContratros;