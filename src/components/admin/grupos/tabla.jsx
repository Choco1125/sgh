import React, { useState } from "react";
import Eliminar from "./eliminar";
import Editar from "./editar";

const Tabla = ({
  grupos,
  update,
  alerta,
  modalidades,
  usuarios,
  programasFromacion,
  aprendices
}) => {
  //States--------------------------------------------------------
  const [id, setId] = useState("");
  const [codeTab, setCodeTab] = useState("");
  const [modalidad, setModalidad] = useState({
    label: "",
    value: "",
  });
  const [quantityLearners, setQuantityLearners] = useState(0);
  const [activeLearners, setActiveLearners] = useState(0);
  const [electiveStartDate, setElectiveStartDate] = useState("");
  const [electiveEndDate, setElectiveEndDate] = useState("");
  const [practiceStartDate, setPracticeStartDate] = useState("");
  const [practiceEndDate, setPracticeEndDate] = useState("");
  const [managerId, setManagerId] = useState({
    label: "",
    value: "",
  });
  const [offer, setOffer] = useState("");
  const [formationProgramId, setFormationProgramId] = useState({
    label: "",
    value: "",
  });
  const [groupState, setGroupState] = useState("Active");
  const [learnerId, setLearnerId] = useState({
    label: "",
    value: "",
  });
  //---------------------------------------------------------------

  const manejarFecha = (fecha) => {
    let arregloFechas = fecha.split("T");
    return arregloFechas[0];
  };

  const setValores = (grupo) => {
    setId(grupo.id);
    setCodeTab(grupo.codeTab);
    setModalidad({
      value: grupo.modality.id,
      label: grupo.modality.name,
    });
    setQuantityLearners(grupo.quantityLearners);
    setActiveLearners(grupo.activeLearners);
    setElectiveStartDate(manejarFecha(grupo.practiceEndDate));
    setElectiveEndDate(manejarFecha(grupo.practiceEndDate));
    setPracticeStartDate(manejarFecha(grupo.practiceStartDate));
    setPracticeEndDate(manejarFecha(grupo.practiceEndDate));
    setManagerId({
      label: grupo.manager.username,
      value: grupo.manager.id,
    });
    setOffer({
      label: grupo.offer,
      value: grupo.offer
    });
    setFormationProgramId({
      label: grupo.formationProgram.name,
      value: grupo.formationProgram.id,
    });
    setGroupState(grupo.groupState);
    if (grupo.learnerId !== null) {
      setLearnerId({
        label: grupo.learnerId.name,
        value: grupo.learnerId.id,
      });
    }
  };

  return (
    <>
      <table className="table table-sm text-center" id="tbl">
        <thead>
          <tr>
            <th data-priority="1">ID</th>
            <th>Programa de formación</th>
            <th>Jefe de grupo</th>
            <th>Número de aprendices</th>
            <th>Estado</th>
            <th>Modalidad</th>
            <th data-priority="1">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {grupos.map((grupo) => (
            <tr key={grupo.id}>
              <td>{grupo.codeTab}</td>
              <td>{grupo.formationProgram.name}</td>
              <td>{grupo.manager.username}</td>
              <td>
                {grupo.activeLearners}/{grupo.quantityLearners}
              </td>
              <td>{grupo.groupState}</td>
              <td>{grupo.modality.name}</td>
              <td className="align-items-center">
                <span
                  className="d-lg-inline btn btn-outline-success btn-sm mt-1 col-6 col-md-6 btn-middle"
                  data-target="#editar"
                  data-toggle="modal"
                  onClick={() => setValores(grupo)}
                >
                  <i className="fas fa-edit"></i>
                </span>
                <span> </span>
                <span
                  className="d-lg-inline btn btn-outline-danger btn-sm mt-1 col-6 col-md-6 btn-middle"
                  data-target="#eliminar"
                  data-toggle="modal"
                  onClick={() => setId(grupo.id)}
                >
                  <i className="fas fa-trash-alt"></i>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Editar
        grupoId={id}
        codeTab={codeTab}
        setCodeTab={setCodeTab}
        modalidad={modalidad}
        setModalidad={setModalidad}
        quantityLearners={quantityLearners}
        setQuantityLearners={setQuantityLearners}
        activeLearners={activeLearners}
        setActiveLearners={setActiveLearners}
        electiveStartDate={electiveStartDate}
        setElectiveStartDate={setElectiveStartDate}
        electiveEndDate={electiveEndDate}
        setElectiveEndDate={setElectiveEndDate}
        practiceStartDate={practiceStartDate}
        setPracticeStartDate={setPracticeStartDate}
        practiceEndDate={practiceEndDate}
        setPracticeEndDate={setPracticeEndDate}
        managerId={managerId}
        setManagerId={setManagerId}
        offer={offer}
        setOffer={setOffer}
        formationProgramId={formationProgramId}
        setFormationProgramId={setFormationProgramId}
        groupState={groupState}
        setGroupState={setGroupState}
        learnerId={learnerId}
        setLearnerId={setLearnerId}
        modalidades={modalidades}
        usuarios={usuarios}
        programasFromacion={programasFromacion}
        aprendices={aprendices}
        alerta={alerta}
        actualizar={update}
      />
      <Eliminar id={id} update={update} alerta={alerta} />
    </>
  );
};

export default Tabla;
