import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader';
import Tabla from '../../components/admin/horarios/tabla';
import Navbar from '../../components/admin/Navbar';
import Alerta from '../../components/Alert';
import ModalAmbiente from '../../components/admin/horarioAmbientes/modalAmbiente'
import consumidor from '../../helpers/consumidor';
import $ from 'jquery';
import ModalProgramar from '../../components/admin/horarioAmbientes/modalProgramar';
import manejarFechas from '../../helpers/manejarFechas';

export default function Horarioambiente() {

  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    tipo: '',
    msj: ''
  });

  const [ambients, setAmbients] = useState([]);
  const [temporraryUsers, setTemporraryUsers] = useState([]);
  const [day, setDay] = useState("");
  const [fecha, setFecha] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [selectedAmbient, setSelectedAmbient] = useState([]);

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


  const getAmbients = async () => {
    let res = await consumidor.get('ambients');
    if (res) {
      let datos = res.map(ambient => {
        return {
          label: ambient.name,
          value: ambient.id
        }
      });
      setAmbients(datos);
    }
  }

  const getTemporalyUsers = async () => {
    let res = await consumidor.get('temporaryUserActivities');
    if (res) {
      let datos = res.map(user => {
        return {
          label: user.name,
          value: user.id
        }
      });
      setTemporraryUsers(datos);
    }
  }

  const getPeriodicities = async () => {
    let res = await consumidor.get('periodicities');
    console.log(res);
    if (res) {
      let datos = res.map(user => {
        return {
          label: user.name,
          value: user.id
        }
      });
      setTemporraryUsers(datos);
    }
  }

  const handleChangeSalect = e => {
    setSelectedAmbient(e);
  }

  useEffect(() => {
    getTemporalyUsers();
    getAmbients();
    getPeriodicities();
    setLoader(false);
  }, []);

  if (loader) {
    return <Loader />
  } else {
    return (
      <div>
        <Navbar active="programacion" />
        <div className="col-12 mb-3 mt-3">
          <ModalAmbiente
            ambients={ambients}
            selected={selectedAmbient}
            handler={handleChangeSalect}
          />
          <ModalProgramar
            learningResults={learningResultsofActiveTrimester}
            ambients={ambients}
            temporalyUsers={temporraryUsers}
            users={users}
            day={day}
            fechaTrimestre={fechaTrimestre}
            groupInfo={group}
            elementoInicio={elementoInicio}
          />
          <Tabla
            alerta={handleAlerta}
            groupInfo={group}
            day={day}
            setDay={setDay}
            elementoInicio={elementoInicio}
            setElementoInicio={setElementoInicio}
          />
        </div>
        <Alerta {...alert} />
      </div>
    );
  }
}
