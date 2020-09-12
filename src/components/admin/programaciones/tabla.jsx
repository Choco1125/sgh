import React from 'react';
import manejarFecha from './../../../helpers/manejarFechas';

export default function Tabla({ programations }) {
  return (
    <div>
      <table className="table table-sm text-center" id="tbl">
        <thead>
          <tr>
            <th>ID grupo</th>
            <th>Municipio</th>
            <th>Trimestre</th>
            <th>Fecha inicio</th>
            <th>Fecha fin</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {programations.map(programation => {
            return (
              <tr key={programation.id} id={programation.id}>
                <td>{programation.group.codeTab}</td>
                <td>{programation.municipality.name}</td>
                <td>{programation.trimester}</td>
                <td>{manejarFecha(programation.startDate)}</td>
                <td>{manejarFecha(programation.endDate)}</td>
                <td className="align-items-center">
                  <span
                    className="d-lg-inline btn btn-outline-success btn-sm mt-1 col-6 col-md-6 btn-middle"
                    data-target="#editar"
                    data-toggle="modal"
                  >
                    <i className="fas fa-edit"></i>
                  </span>
                  <span> </span>
                  <span
                    className="d-lg-inline btn btn-outline-danger btn-sm mt-1 col-6 col-md-6 btn-middle"
                    data-target="#eliminar"
                    data-toggle="modal"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </span>
                  <span> </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
