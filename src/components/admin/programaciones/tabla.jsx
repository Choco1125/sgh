import React from 'react';
import manejarFecha from './../../../helpers/manejarFechas';

export default function Tabla({ programations, setProgramation }) {
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
            <th>Estado</th>
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
                <td>{programation.isActive === true ? 'Activo' : 'Inactivo'}</td>
                <td className="align-items-center">
                  <span
                    className="d-lg-inline btn btn-outline-success btn-sm mt-1 col-6 col-md-6 btn-middle"
                    data-target="#editar"
                    data-toggle="modal"
                    onClick={
                      () => setProgramation({
                        id: programation.id,
                        startDate: manejarFecha(programation.startDate),
                        endDate: manejarFecha(programation.endDate),
                        trimester: programation.trimester,
                        groupId: programation.groupId,
                        municipalityId: programation.municipalityId,
                        isActive: programation.isActive
                      })
                    }
                  >
                    <i className="fas fa-edit"></i>
                  </span>
                  <span> </span>
                  <span
                    className="d-lg-inline btn btn-outline-danger btn-sm mt-1 col-6 col-md-6 btn-middle"
                    data-target="#eliminar"
                    data-toggle="modal"
                    onClick={
                      () => setProgramation({
                        id: programation.id
                      })
                    }
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
