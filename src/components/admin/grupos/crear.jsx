import React, { useState } from "react";
import handleMayus from "./../../../helpers/handleMayus";
import Spinner from "../../spinner";
import Select from "react-select";
import DisableButton from "../../../helpers/DisableButton";
import validator from "../../../helpers/validator";
import consumidor from "../../../helpers/consumidor";
import $ from "jquery";
import handleError from "../../../helpers/handleError";

const tiposDeOferta = [
  {
    label: "Abierta",
    value: "Abierta",
  },
  {
    label: "Cerrada (especial)",
    value: "Cerrada (especial)",
  }
];

const Crear = ({
  alerta,
  actualizar,
  modalidades,
  usuarios,
  programasFromacion,
  aprendices,
}) => {
  //States-----------------------------------------------------------
  const [spinner, setSpinner] = useState(false);
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
  const [offer, setOffer] = useState({
    label: "Selecciona un tipo de oferta",
    value: "",
  });
  const [formationProgramId, setFormationProgramId] = useState({
    label: "",
    value: "",
  });
  const [groupState, setGroupState] = useState("Activo");
  const [learnerId, setLearnerId] = useState({
    label: "",
    value: "",
  });
  //---------------------------------------------------------------

  const handleChangeSelect = ({ label, value }) => {
    setModalidad({
      label,
      value,
    });
  };

  const guradar = async () => {
    DisableButton.setId("btn-guardar");
    DisableButton.disable();
    setSpinner(true);

    let datos = {
      codeTab,
      modalityId: modalidad,
      quantityLearners,
      activeLearners,
      electiveStartDate,
      electiveEndDate,
      practiceStartDate,
      practiceEndDate,
      managerId: managerId,
      offer: offer,
      formationProgramId: formationProgramId,
      groupState,
    };

    if (quantityLearners <= 0 || quantityLearners > 150) {
      handleError.inputMsj('quantityLearners', 'Debes ingresar valores entre 1 y 150');
    } else if (activeLearners > 150 || activeLearners < 0) {
      handleError.inputMsj('activeLearners', 'Debes ingresar valores entre 1 y 150');
    } else if (validator.validarDatos(datos)) {
      datos = {
        codeTab,
        modalityId: modalidad.value,
        quantityLearners,
        activeLearners,
        electiveStartDate,
        electiveEndDate,
        practiceStartDate,
        practiceEndDate,
        managerId: managerId.value,
        offer: offer.value,
        formationProgramId: formationProgramId.value,
        groupState,
      };


      if (learnerId.value !== "") {
        datos = {
          ...datos,
          learnerId: learnerId.value,
        };
      }

      let res = await consumidor.post("groups", datos);

      if (res === "Nuevo grupo creado") {
        await actualizar();
        $("#crear").modal("hide");
        alerta(res, "success");
      } else if (res.message) {
        $("#crear").modal("hide");
        alerta(res.message, "danger");
      } else {
        $("#crear").modal("hide");
        alerta(
          "Ha ocurrido un error en el servidor, vuelve a intentarlo",
          "danger"
        );
        console.error(res);
      }
      setCodeTab("");
      setModalidad("");
      setQuantityLearners("");
      setActiveLearners("");
      setElectiveStartDate("");
      setElectiveEndDate("");
      setPracticeStartDate("");
      setPracticeEndDate("");
      setManagerId({
        label: "",
        value: "",
      });
      setOffer({
        label: "Selecciona un tipo de oferta",
        value: "",
      });
      setFormationProgramId({
        label: "",
        value: "",
      });
      setGroupState("");
      setLearnerId({
        label: "",
        value: "",
      });
    }

    setSpinner(false);
    DisableButton.enable();
  };

  return (
    <div
      className="modal fade"
      id="crear"
      data-backdrop="static"
      role="dialog"
      aria-labelledby="crearLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="crearLabel">
              Crear grupo
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <span className="font-weight-lighter">
              Los campos con
              <i className="text-danger">*</i>
              son obligatorios
            </span>
            <div className="form-group mt-1" id="codeTab">
              <label htmlFor="codeTab">
                ID <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Id del programa"
                name="codeTab"
                value={codeTab}
                onChange={(e) => setCodeTab(handleMayus(e.target.value))}
              />
              <span className="text-danger"></span>
            </div>
            <div className="form-group" id="modalityId">
              <label htmlFor="modalityId">
                Modalidad <span className="text-danger">*</span>
              </label>
              <Select
                value={modalidad}
                onChange={(e) => handleChangeSelect(e)}
                options={modalidades}
              />
              <span className="text-danger"></span>
            </div>
            <div className="form-group" id="quantityLearners">
              <label htmlFor="quantityLearners">
                Número de aprendices <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Cantidad de aprendices"
                min="0"
                max="100"
                name="quantityLearners"
                value={quantityLearners}
                onChange={(e) => setQuantityLearners(e.target.value)}
              />
              <span className="text-danger"></span>
            </div>
            <div className="form-group" id="activeLearners">
              <label htmlFor="activeLearners">
                Número de aprendices activos
                <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Cantidad de aprendices activos"
                min="0"
                max="100"
                name="activeLearners"
                value={activeLearners}
                onChange={(e) => setActiveLearners(e.target.value)}
              />
              <span className="text-danger"></span>
            </div>
            <div className="form-group" id="electiveStartDate">
              <label htmlFor="electiveStartDate">
                Feha inicio etapa electiva<span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Feha inicio etapa electiva"
                name="electiveStartDate"
                value={electiveStartDate}
                onChange={(e) => setElectiveStartDate(e.target.value)}
              />
              <span className="text-danger"></span>
            </div>
            <div className="form-group" id="electiveEndDate">
              <label htmlFor="electiveEndDate">
                Feha fin etapa electiva<span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Feha fin etapa electiva"
                name="electiveEndDate"
                value={electiveEndDate}
                onChange={(e) => setElectiveEndDate(e.target.value)}
              />
              <span className="text-danger"></span>
            </div>
            <div className="form-group" id="practiceStartDate">
              <label htmlFor="practiceStartDate">
                Feha inicio etapa práctica<span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Feha inicio etapa práctica"
                name="practiceStartDate"
                value={practiceStartDate}
                onChange={(e) => setPracticeStartDate(e.target.value)}
              />
              <span className="text-danger"></span>
            </div>
            <div className="form-group" id="practiceEndDate">
              <label htmlFor="practiceEndDate">
                Feha fin etapa práctica<span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Feha fin etapa práctica"
                name="practiceEndDate"
                value={practiceEndDate}
                onChange={(e) => setPracticeEndDate(e.target.value)}
              />
              <span className="text-danger"></span>
            </div>
            <div className="form-group" id="managerId">
              <label htmlFor="managerId">
                Jefe de grupo <span className="text-danger">*</span>
              </label>
              <Select
                value={managerId}
                onChange={({ label, value }) => setManagerId({ label, value })}
                options={usuarios}
              />
              <span className="text-danger"></span>
            </div>
            <div className="form-group" id="offer">
              <label htmlFor="offer">
                Oferta <span className="text-danger">*</span>
              </label>
              <Select
                value={offer}
                onChange={(e) => setOffer(e)}
                options={tiposDeOferta}
              />
              <span className="text-danger"></span>
            </div>
            <div className="form-group" id="formationProgramId">
              <label htmlFor="formationProgramId">
                Programa de formación <span className="text-danger">*</span>
              </label>
              <Select
                value={formationProgramId}
                onChange={({ label, value }) =>
                  setFormationProgramId({ label, value })
                }
                options={programasFromacion}
              />
              <span className="text-danger"></span>
            </div>
            <div className="form-group" id="groupState">
              <label htmlFor="groupState">
                Estado <span className="text-danger">*</span>
              </label>
              <select
                name="groupState"
                className="custom-select"
                onChange={(e) => setGroupState(e.target.value)}
                value={groupState}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
              <span className="text-danger"></span>
            </div>
            <div className="form-group" id="learnerId">
              <label htmlFor="learnerId">Aprendiz</label>
              <Select
                value={learnerId}
                onChange={({ label, value }) => setLearnerId({ label, value })}
                options={aprendices}
              />
              <span className="text-danger"></span>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-outline-success"
              id="btn-guardar"
              onClick={() => guradar()}
            >
              Crear <i className="fas fa-save"></i> <Spinner show={spinner} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crear;
