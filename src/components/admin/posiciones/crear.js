import React, { useState } from "react";
import Spinner from "./../../spinner";
import handleMayus from "../../../helpers/handleMayus";
import validator from "../../../helpers/validator";
import consumidor from "../../../helpers/consumidor";
import $ from "jquery";
import handleError from "../../../helpers/handleError";
import Select from "react-select";

const tipos = [
  {
    label: "Instructor",
    value: "Instructor",
  },
  {
    label: "Administrativo",
    value: "Administrativo",
  },
  {
    label: "Apoyo",
    value: "Apoyo",
  },
  {
    label: "Subdirector",
    value: "Subdirector",
  },
];

const Crear = ({ alerta, update }) => {
  const [spinner, setSpinner] = useState(false);
  const [datos, setDatos] = useState({
    name: "",
    type: {
      label: "Selecciona un tipo de posición",
      value: "",
    },
  });

  const save = async () => {
    setSpinner(true);
    if (validator.validarDatos(datos)) {
      let res = await consumidor.post("positions", {
        name: datos.name,
        type: datos.type.value,
      });

      if (res === "Nuevo cargo creado") {
        await update();
        $("#crear").modal("hide");
        alerta(res, "success");
      } else if (res === "Cargo ya existente") {
        handleError.inputMsj("name", res);
      } else if (res.message) {
        $("#crear").modal("hide");
        alerta(res, "danger");
      }
    }
    setSpinner(false);
  };

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: handleMayus(e.target.value),
    });
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
              Crear posición
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
              <i className="text-danger">* </i>
              son obligatorios
            </span>
            <div className="form-group mt-1" id="name">
              <label htmlFor="name">
                Name
                <span className="text-danger">*</span>
              </label>
              <input
                name="name"
                type="text"
                className="form-control"
                placeholder="Nombre de la posición"
                onChange={(e) => handleChange(e)}
                value={datos.name}
              />
              <span className="text-danger" />
            </div>
            <div className="form-group mt-1" id="type">
              <label htmlFor="type">
                Tipo
                <span className="text-danger">*</span>
              </label>
              <Select
                options={tipos}
                value={datos.type}
                onChange={(e) =>
                  setDatos({
                    ...datos,
                    type: e,
                  })
                }
              />
              <span className="text-danger" />
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
              onClick={() => save()}
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
