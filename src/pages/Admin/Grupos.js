import React from "react";
import Loader from "./../../components/Loader";
import Alert from "./../../components/Alert";
import Navbar from "./../../components/admin/Navbar";
import consumidor from "./../../helpers/consumidor";
import Tabla from "../../components/admin/grupos/tabla";
import Crear from "../../components/admin/grupos/crear";
import handleTabla from "../../helpers/handleTabla";

class Grupos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: true,
      alert: {
        show: false,
        msj: "",
        type: "",
      },
      modalidades: [],
      usuarios: [],
      aprendices: [],
      programasFormacion: [],
      grupos: [],
    };
  }

  getGrupos = async () => {
    handleTabla.destroy('tbl');
    let res = await consumidor.get("groups");
    if (res.groups) {
      this.setState({
        grupos: res.groups,
        loader: false,
      });
    }
    handleTabla.create('tbl');
  };

  getModalidades = async () => {
    let res = await consumidor.get("modalities");
    let modalidades = [];
    res.forEach(({ id, name }) => {
      modalidades.push({
        value: id,
        label: name,
      });
    });

    this.setState({
      modalidades,
    });
  };

  getUsers = async () => {
    let res = await consumidor.get("users");
    let usuarios = [];
    let aprendices = [];
    res.users.forEach(({ id, username, document }) => {
      usuarios.push({
        value: id,
        label: `(${document}) ${username}`,
      });
    });
    res.learners.forEach(({ id, username, document }) => {
      aprendices.push({
        value: id,
        label: `(${document}) ${username}`,
      });
    });

    this.setState({
      usuarios,
      aprendices,
    });
  };

  getProgramasFormacion = async () => {
    let res = await consumidor.get("formationPrograms");
    let programasFormacion = [];
    res.forEach(({ id, name }) => {
      programasFormacion.push({
        value: id,
        label: name,
      });
    });

    this.setState({
      programasFormacion,
    });
  };

  handleAlert = (msj, type) => {
    this.setState({
      alert: {
        show: true,
        msj,
        type,
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

  async componentDidMount() {
    await this.getGrupos();
    await this.getModalidades();
    await this.getUsers();
    await this.getProgramasFormacion();
  }

  render() {
    if (this.state.loader) {
      return <Loader />;
    } else {
      return (
        <div>
          <Navbar active="grupos" />
          <div className="container">
            <div className="row justify-content-end mt-3">
              <button
                className="btn btn-success border mr-3"
                data-target="#crear"
                data-toggle="modal"
              >
                Crear <i className="fas fa-plus"></i>
              </button>
            </div>
            <div className="mt-2 mb-3">
              <Tabla
                grupos={this.state.grupos}
                update={this.getGrupos}
                alerta={this.handleAlert}
                modalidades={this.state.modalidades}
                usuarios={this.state.usuarios}
                programasFromacion={this.state.programasFormacion}
                aprendices={this.state.aprendices}
              />
            </div>
          </div>
          <Crear
            alerta={this.handleAlert}
            actualizar={this.getGrupos}
            modalidades={this.state.modalidades}
            usuarios={this.state.usuarios}
            programasFromacion={this.state.programasFormacion}
            aprendices={this.state.aprendices}
          />
          <Alert
            show={this.state.alert.show}
            msj={this.state.alert.msj}
            tipo={this.state.alert.type}
          />
        </div>
      );
    }
  }
}

export default Grupos;
