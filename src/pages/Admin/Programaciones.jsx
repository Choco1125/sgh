import React, { useState, useEffect } from 'react';
import Loader from './../../components/Loader';
import Navbar from './../../components/admin/Navbar';
import { Breadcrumb } from './../../components/Breadcrumb';
import consumidor from './../../helpers/consumidor';
import Tabla from './../../components/admin/programaciones/tabla';
import handleTabla from './../../helpers/handleTabla';
import Crear from "./../../components/admin/programaciones/crear";
import Alerta from './../../components/Alert';
import Editar from '../../components/admin/programaciones/editar';

export default function Programaciones() {
  const [loader, setLoader] = useState(true);
  const [programtions, setProgramtions] = useState([]);
  const [alerta, setAlerta] = useState({
    show: true,
    msj: '',
    tipo: ''
  });
  const [programation, setProgramation] = useState({
    startDate: "",
    endDate: "",
    trimester: "",
    groupId: "",
    municipalityId: "",
    isActive: false
  });

  const routes = [
    {
      name: 'Inicio',
      link: '/coordinador/',
      isLink: true
    },
    {
      name: 'Programaciones',
      link: '/coordinador/programaciones',
      isLink: true
    },
    {
      name: 'Programaciones',
      link: '',
      isLink: false
    },
  ];

  const getProgramations = async () => {
    let res = await consumidor.get('/programations');
    if (res) {
      handleTabla.destroy('tbl');
      setProgramtions(res);
      setLoader(false);
      handleTabla.create('tbl');
    }
  }

  const handleAlert = (msj, tipo) => {
    setAlerta({
      show: true,
      msj,
      tipo
    });

    setTimeout(() => {
      setAlerta({
        show: false,
        msj: '',
        tipo: ''
      });
    }, 2000);
  }

  const iniciar = async () => {
    await getProgramations();
  }

  useEffect(() => {
    iniciar();
  }, []);

  if (loader) {
    return <Loader />
  } else {
    return (
      <div>
        <Navbar active="programacion" />
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
          <div>
            <Tabla
              programations={programtions}
              setProgramation={setProgramation}
            />
          </div>
        </div>
        <Crear
          alerta={handleAlert}
          actualizar={iniciar}
        />
        <Editar
          alerta={handleAlert}
          programation={programation}
          actualizar={iniciar}
        />
        <Alerta {...alerta} />
      </div>
    );
  }
}
