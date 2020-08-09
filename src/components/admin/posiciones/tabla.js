import React from "react";
import Eliminar from "./eliminar";
import handleMayus from "./../../../helpers/handleMayus";
import Editar from "./editar";

class Tabla extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eliminar: {
        id: "",
      },
      editar: {
        id: "",
        name: "",
        type: {
          label: "Selecciona un tipo de posición",
          value: "",
        },
      },
    };
  }

  handleChange = (e) => {
    this.setState({
      editar: {
        ...this.state.editar,
        [e.target.name]: handleMayus(e.target.value),
      },
    });
  };

  handleChangeType = (e) =>
    this.setState({
      editar: {
        ...this.state.editar,
        type: e,
      },
    });

  render() {
    return (
      <div>
        <table className="table table-sm text-center" id="tbl">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {this.props.datos.map((posicion, i) => {
              return (
                <tr key={posicion.id} id={i}>
                  <td>{posicion.name}</td>
                  <td>{posicion.type}</td>
                  <td className="align-items-center">
                    <span
                      className="d-lg-inline btn btn-outline-success btn-sm mt-1 col-6 col-md-6 btn-middle"
                      data-target="#editar"
                      data-toggle="modal"
                      onClick={() =>
                        this.setState({
                          editar: {
                            id: posicion.id,
                            name: posicion.name,
                            type: {
                              label: posicion.type,
                              value: posicion.type,
                            },
                          },
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
                      onClick={() =>
                        this.setState({
                          eliminar: {
                            id: posicion.id,
                          },
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
        <Eliminar
          datos={this.state.eliminar}
          alerta={this.props.alerta}
          update={this.props.update}
        />
        <Editar
          datos={this.state.editar}
          alerta={this.props.alerta}
          actualizar={this.props.update}
          handleChange={this.handleChange}
          handleChangeType={this.handleChangeType}
        />
      </div>
    );
  }
}

export default Tabla;
