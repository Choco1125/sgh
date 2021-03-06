import React from "react";
import Loader from "./../../components/Loader";
import Alert from "./../../components/Alert";
import Navbar from "./../../components/admin/Navbar";
import Api from "./../../components/Api";
import $ from "jquery";
import Tabla from "./../../components/admin/resultados/tabla";
import Crear from "../../components/admin/resultados/crear";
import { Breadcrumb } from "../../components/Breadcrumb";

const routes = [
  {
    name: "Inicio",
    link: "/coordinador/",
    isLink: true,
  },
  {
    name: "Programas de formación",
    link: "/coordinador/resultados",
    isLink: true,
  },
  {
    name: "Resultados de aprednizaje",
    link: "/coordinador/resultados",
    isLink: false,
  },
];

class Resultados extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: true,
      alert: {
        show: false,
        msj: "",
        type: "",
      },
      resultados: [],
      competencias: [],
    };
  }

  async getCompetencias() {
    let datos = await Api(
      "competences",
      "GET",
      sessionStorage.getItem("token"),
      ""
    );
    const options = [];

    datos.map((competencia) =>
      options.push({
        value: competencia.id,
        label: competencia.description,
        programaFormacion: competencia.formationProgram.id,
      })
    );

    this.setState({
      competencias: options,
    });
  }

  getResultados = async () => {
    try {
      let datos = await Api(
        "learningResults",
        "GET",
        sessionStorage.getItem("token"),
        ""
      );
      if (datos === "jwt expired") {
        sessionStorage.removeItem("token");
        window.location.href = "/";
      } else if (datos === "jwt malformed") {
        sessionStorage.removeItem("token");
        window.location.href = "/";
      } else {
        $("#tbl").DataTable().destroy();
        this.setState({
          loader: false,
          resultados: datos.learningResults,
        });
        $("#tbl").DataTable({
          language: {
            lengthMenu: "Mostrar _MENU_ registros",
            zeroRecords: "No se encontraron resultados",
            info: "",
            infoEmpty: "",
            infoFiltered: "",
            sSearch: "Buscar:",
            oPaginate: {
              sFirst: "Primero",
              sLast: "Último",
              sNext: "Siguiente",
              sPrevious: "Anterior",
            },
            sProcessing: "",
          },
        });
      }
      await this.getCompetencias();
    } catch (err) {
      console.log(err);
    }
  };

  async componentDidMount() {
    await this.getResultados();
  }

  handleAlert = (msj, tipo) => {
    this.setState({
      alert: {
        show: true,
        msj: msj,
        tipo: tipo,
      },
    });

    setTimeout(
      () =>
        this.setState({
          alert: {
            show: false,
          },
        }),
      2000
    );
  };

  render() {
    if (this.state.loader) {
      return <Loader />;
    } else {
      return (
        <div>
          <Navbar active="programas" />
          <div className="container">
            <div className="row justify-content-between mt-3">
              <div>
                <Breadcrumb routes={routes} />
              </div>
              <div>
                <button
                  className="btn btn-success border mr-3"
                  data-target="#crear"
                  data-toggle="modal"
                >
                  Crear <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
            <div className="mt-2 mb-3">
              <Tabla
                datos={this.state.resultados}
                update={this.getResultados}
                alerta={this.handleAlert}
                competencias={this.state.competencias}
              />
            </div>
          </div>
          <Crear
            competencias={this.state.competencias}
            update={this.getResultados}
            alerta={this.handleAlert}
          />
          <Alert
            show={this.state.alert.show}
            msj={this.state.alert.msj}
            tipo={this.state.alert.tipo}
            update={this.getPrograms}
          />
        </div>
      );
    }
  }
}

export default Resultados;
