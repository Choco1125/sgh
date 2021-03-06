import React from "react";
import Eliminar from "./eliminar";
import Editar from "./editar";
import Ver from "./ver";
import "./hider.css";

class Tabla extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      delete: {
        id: "",
      },
      datos: {
        id: "",
        summary: "",
        description: "",
        hours: "",
        projectPhase: "",
        competenceId: {
          value: "",
          label: "",
        },
        associatedTrimesters: "",
        trimesterEvaluate: "",
      },
      ver: {
        summary: "",
        description: "",
        hours: "",
        projectPhase: "",
        competence: "",
        associatedTrimesters: "",
        trimesterEvaluate: "",
      },
    };
  }

  handleChange = (e) => {
    if (e.target.name === "trimesterEvaluate") {
      if (e.target.value.length > 1) {
        e.target.value = e.target.value[0];
      }
    }

    this.setState({
      datos: {
        ...this.state.datos,
        [e.target.name]:
          e.target.value.toLowerCase().charAt(0).toUpperCase() +
          e.target.value.slice(1),
      },
    });
  };

  handleChange2 = (e) => {
    this.setState({
      datos: {
        ...this.state.datos,
        competenceId: e,
      },
    });
  };

  getCompetence(id) {
    console.log(id);
  }

  render() {
    return (
      <div>
        <table className="table table-sm text-center" id="tbl">
          <thead>
            <tr>
              <th>Descripción</th>
              <th className="hiden">Resumen</th>
              <th className="hiden">Comptencia asociada</th>
              <th className="hiden">Programa de formación</th>
              <th>Trimestre a evaluar</th>
              <th className="hiden">horas</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {this.props.datos.map((resultado, i) => {
              return (
                <tr key={resultado.id} id={i}>
                  <td>{resultado.description}</td>
                  <td className="hiden">{resultado.summary}</td>
                  <td className="hiden">{resultado.competence.description}</td>
                  <td className="hiden">Programa de formación</td>
                  <td>{resultado.trimesterEvaluate}</td>
                  <td className="hiden">{resultado.hours}</td>
                  <td className="align-items-center">
                    <span
                      className="d-lg-inline btn btn-outline-success btn-sm mt-1 col-6 col-md-12 btn-middle"
                      data-target="#editar"
                      data-toggle="modal"
                      onClick={() =>
                        this.setState({
                          datos: {
                            id: resultado.id,
                            summary: resultado.summary,
                            description: resultado.description,
                            hours: resultado.hours,
                            projectPhase: resultado.projectPhase,
                            competenceId: {
                              value: resultado.competence.id,
                              label: resultado.competence.description,
                            },
                            associatedTrimesters:
                              resultado.associatedTrimesters,
                            trimesterEvaluate: resultado.trimesterEvaluate,
                          },
                        })
                      }
                    >
                      <i className="fas fa-edit"></i>
                    </span>
                    <span> </span>
                    <span
                      className="d-lg-inline btn btn-outline-danger btn-sm mt-1 col-6 col-md-12 btn-middle"
                      data-target="#eliminar"
                      data-toggle="modal"
                      onClick={() =>
                        this.setState({
                          delete: {
                            id: resultado.id,
                          },
                        })
                      }
                    >
                      <i className="fas fa-trash-alt"></i>
                    </span>
                    <span> </span>
                    <span
                      className="d-lg-none d-md-inline-block btn btn-outline-primary btn-sm mt-1 col-6 col-md-12 btn-middle"
                      data-target="#ver"
                      data-toggle="modal"
                      onClick={() =>
                        this.setState({
                          ver: {
                            summary: resultado.summary,
                            description: resultado.description,
                            hours: resultado.hours,
                            projectPhase: resultado.projectPhase,
                            competence: resultado.competence.description,
                            associatedTrimesters:
                              resultado.associatedTrimesters,
                            trimesterEvaluate: resultado.trimesterEvaluate,
                          },
                        })
                      }
                    >
                      <i className="fas fa-eye"></i>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Eliminar
          id={this.state.delete.id}
          alerta={this.props.alerta}
          update={this.props.update}
        />
        <Editar
          datos={this.state.datos}
          alerta={this.props.alerta}
          update={this.props.update}
          competencias={this.props.competencias}
          handleChange={this.handleChange}
          handleChange2={this.handleChange2}
        />
        <Ver datos={this.state.ver} />
      </div>
    );
  }
}

export default Tabla;
