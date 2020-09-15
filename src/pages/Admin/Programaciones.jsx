import React, { useState, useEffect } from 'react';
import Loader from './../../components/Loader';
import Navbar from './../../components/admin/Navbar';
import { Breadcrumb } from './../../components/Breadcrumb';
import consumidor from './../../helpers/consumidor';
import Tabla from './../../components/admin/programaciones/tabla';
import handleTabla from './../../helpers/handleTabla';
import Crear from "./../../components/admin/programaciones/crear";

export default function Programaciones() {
  const [loader, setLoader] = useState(true);
  const [programtions, setProgramtions] = useState([]);

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

  useEffect(() => {
    const iniciar = async () => {
      await getProgramations();
    }
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
            <Tabla programations={programtions} />
          </div>
        </div>
        <Crear />
      </div>
    );
  }
}
