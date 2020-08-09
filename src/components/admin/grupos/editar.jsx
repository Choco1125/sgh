import React, { useState } from "react";
import handleMayus from "./../../../helpers/handleMayus";
import Spinner from "../../spinner";
import Select from "react-select";
import DisableButton from "../../../helpers/DisableButton";
import validator from "../../../helpers/validator";
import consumidor from "../../../helpers/consumidor";
import $ from "jquery";

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

const Editar = ({
  alerta,
  actualizar,
  modalidades,
  usuarios,
  programasFromacion,
  aprendices,
  codeTab,
  setCodeTab,
  modalidad,
  setModalidad,
  quantityLearners,
  setQuantityLearners,
  activeLearners,
  setActiveLearners,
  electiveStartDate,
  setElectiveStartDate,
  electiveEndDate,
  setElectiveEndDate,
  practiceStartDate,
  setPracticeStartDate,
  practiceEndDate,
  setPracticeEndDate,
  managerId,
  setManagerId,
  offer,
  setOffer,
  formationProgramId,
  setFormationProgramId,
  groupState,
  setGroupState,
  learnerId,
  setLearnerId,
  grupoId
}) => {
  //States-----------------------------------------------------------
  const [spinner, setSpinner] = useState(false);
  //---------------------------------------------------------------

  const guradar = async () => {
    DisableButton.setId("btn-actualizar");
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

    if (validator.validarDatosEdit(datos)) {
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

      let res = await consumidor.put("groups", grupoId, datos);
      if (res === "Grupo actualizado") {
        await actualizar();
        $("#editar").modal("hide");
        alerta(res, "success");
      } else if (res.message) {
        $("#editar").modal("hide");
        alerta(res.message, "danger");
      } else {
        $("#editar").modal("hide");
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
        value: ""
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
      id="editar"
      data-backdrop="static"
      role="dialog"
      aria-labelledby="editarLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editarLabel">
              Editar grupo
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
            <div className="form-group mt-1" id="codeTab_edit">
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
            <div className="form-group" id="modalityId_edit">
              <label htmlFor="modalityId">
                Modalidad <span className="text-danger">*</span>
              </label>
              <Select
                value={modalidad}
                onChange={({ value, label }) => setModalidad({ value, label })}
                options={modalidades}
              />
              <span className="text-danger"></span>
            </div>
            <div className="form-group" id="quantityLearners_edit">
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
            <div className="form-group" id="activeLearners_edit">
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
            <div className="form-group" id="electiveStartDate_edit">
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
            <div className="form-group" id="electiveEndDate_edit">
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
            <div className="form-group" id="practiceStartDate_edit">
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
            <div className="form-group" id="practiceEndDate_edit">
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
            <div className="form-group" id="managerId_edit">
              <label htmlFor="managerId">
                Gefe de grupo <span className="text-danger">*</span>
              </label>
              <Select
                value={managerId}
                onChange={({ label, value }) => setManagerId({ label, value })}
                options={usuarios}
              />
              <span className="text-danger"></span>
            </div>
            <div className="form-group" id="offer_edit">
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
            <div className="form-group" id="formationProgramId_edit">
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
            <div className="form-group" id="groupState_edit">
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
            <div className="form-group" id="learnerId_edit">
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
              id="btn-actualizar"
              onClick={() => guradar()}
            >
              Actualizar <i className="fas fa-save"></i>{" "}
              <Spinner show={spinner} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editar;
