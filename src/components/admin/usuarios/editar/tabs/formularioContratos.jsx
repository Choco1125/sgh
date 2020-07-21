import React from 'react';
import CrearContratoModal from './crearContratoModal';


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
    <div className="row">
      <button className="btn btn-link btn-sm col-md-2"> Editar</button>
      <button className="btn btn-link btn-sm text-danger col-md-2"> Eliminar</button>
    </div>
  </div>
);

const FormularioContratros = ({ contratos, handleAlert, setContracts }) => {
  return (
    <div className="card-body">
      <div className="row justify-content-end mr-1">
        <button className="btn btn-outline-success btn-sm" data-toggle="modal" data-target="#crearContrato">Agregar</button>
      </div>
      <div className="row" style={
        {
          maxHeight: '70vh',
          overflow: 'auto'
        }
      }>
        {contratos.map(contrato => <CardContrato key={contrato.id} contrato={contrato} />)}
      </div>
      <CrearContratoModal handleAlert={handleAlert} setContracts={setContracts} />
    </div>
  );
}

export default FormularioContratros;