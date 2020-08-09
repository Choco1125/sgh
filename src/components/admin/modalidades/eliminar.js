import React, { useState } from "react";
import Spinner from "../../spinner";
import consumidor from "../../../helpers/consumidor";
import $ from "jquery";

const Eliminar = ({ datos, alerta, update }) => {
  const [spinner, setSpinner] = useState(false);

  const del = async () => {
    setSpinner(true);

    let res = await consumidor.delete("modalities", datos.id);
    if (res === "Modalidad eliminada") {
      await update();
      alerta(res, "success");
    } else if (res.message) {
      alerta(res.message, "danger");
    } else {
      alerta(JSON.stringify(res), "danger");

      console.log(res);
    }

    $("#eliminar").modal("hide");

    setSpinner(false);
  };

  return (
    <div
      className="modal fade"
      id="eliminar"
      role="dialog"
      aria-labelledby="eliminarLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="eliminarLabel">
              Eliminar Modalidad
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
          <div className="modal-body">¿Deseas eliminar la modalidad?</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => del()}
            >
              Sí, eliminar <Spinner show={spinner} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eliminar;
