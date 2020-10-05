import React, { useState } from 'react';
import Loader from '../../components/Loader';
import Tabla from '../../components/admin/horarios/tabla';
import Navbar from '../../components/admin/Navbar';
import Alerta from '../../components/Alert';

export default function Horarios() {

  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    tipo: '',
    msj: ''
  });

  const handleAlerta = (tipo, msj) => {
    setAlert({
      show: true,
      tipo,
      msj
    });
    setTimeout(() => setAlert({
      show: false,
      tipo: '',
      msj: ''
    }), 2000);
  }

  if (loader) {
    return <Loader />
  } else {
    return (
      <div>
        {/* <ModalProgramacion
          programacion={programacion}
          setProgramacion={setProgramacion}
        /> */}
        <Navbar active="programacion" />
        <div className="col-12 mb-3 mt-3">
          <Tabla alerta={handleAlerta} />
        </div>
        <Alerta {...alert} />
      </div>
    );
  }
}
