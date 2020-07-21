import React, { useState } from 'react';
import CrearContratoModal from './crearContratoModal';
import EliminarContratoModal from './eliminarContratoModal'

const manejarFecha = (fecha) => {
  let arregloFechas = fecha.split("T");
  return arregloFechas[0];
};

const CardContrato = ({ contrato, setContrato }) => (
  <div className="card card-body col-12 mt-2 mb-2">
    <h5 className="card-title">{contrato.name}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{contrato.description}</h6>
    <p className="card-text">Inicio: {manejarFecha(contrato.startDate)}</p>
    <p className="card-text">Fin: {manejarFecha(contrato.endDate)}</p>
    <div className="row">
      <button className="btn btn-link btn-sm col-md-2"> Editar</button>
      <button className="btn btn-link btn-sm text-danger col-md-2" data-target="#eliminarContrato" data-toggle="modal" onClick={() => setContrato({ id: contrato.id })}> Eliminar</button>
    </div>
  </div>
);

const FormularioContratros = ({ contratos, handleAlert, setContracts }) => {

  const [contrato, setContrato] = useState({});
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
        {contratos.map(contrato => <CardContrato key={contrato.id} contrato={contrato} setContrato={setContrato} />)}
      </div>
      <CrearContratoModal handleAlert={handleAlert} setContracts={setContracts} />
      <EliminarContratoModal idContract={contrato.id} handleAlert={handleAlert} setContrato={setContracts} />
    </div>
  );
}

export default FormularioContratros;