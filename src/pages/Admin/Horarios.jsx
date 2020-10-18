import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader';
import Tabla from '../../components/admin/horarios/tabla';
import Navbar from '../../components/admin/Navbar';
import Alerta from '../../components/Alert';
import ModalGrupo from '../../components/admin/horarios/modalGrupo';
import consumidor from '../../helpers/consumidor';
import $ from 'jquery';
import ModalProgramar from '../../components/admin/horarios/modalProgramar';
import manejarFechas from '../../helpers/manejarFechas';

export default function Horarios() {

  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    tipo: '',
    msj: ''
  });
  const [group, setGroup] = useState({});
  const [groups, setGroups] = useState([]);
  const [groupsToSelect, setGroupsToSelect] = useState([]);
  const [groupSelected, setGroupSelected] = useState({
    label: 'Selecciona un grupo',
    value: ''
  });
  const [learningResults, setLearningResults] = useState([]);
  const [learningResultsofActiveTrimester, setLearningResultsofActiveTrimester] = useState([]);
  const [ambients, setAmbients] = useState([]);
  const [users, setUsers] = useState([]);
  const [temporraryUsers, setTemporraryUsers] = useState([]);
  const [day, setDay] = useState("");
  const [fechaTrimestre, setFechaTrimestre] = useState("");


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

  const getGroups = async () => {
    let res = await consumidor.get('groups');
    if (res.groups) {
      let datos = [];
      res.groups.map(group => datos.push({
        value: group.id,
        label: `${group.codeTab} - ${group.formationProgram.name}`
      }));
      setGroupsToSelect(datos);
      setGroups(res.groups);
      setLoader(false);
    }
  }

  const getLearningResults = async () => {
    let res = await consumidor.get('learningResults');
    if (res) {
      setLearningResults(res.learningResults);
    }
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

  const getUsers = async () => {
    let res = await consumidor.get('users');
    if (res) {
      let datos = res.users.map(user => {
        return {
          value: user.id,
          label: `(${user.document}) ${user.username}`
        }
      });
      setUsers(datos);
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

  const handleChangeSalect = e => {
    setGroupSelected(e);
    let actualroup = groups.filter(group => group.id === e.value);
    let resultsOfGroups = learningResults.filter(learResult => learResult.competence.formationProgramId === actualroup[0].formationProgramId);
    let datos = resultsOfGroups.map(result => {
      return {
        value: result.id,
        label: result.description
      }
    });
    setLearningResultsofActiveTrimester(datos);
    setGroup(actualroup[0]);
    setFechaTrimestre(manejarFechas(actualroup[0].programation[0].startDate));
  }

  useEffect(() => {
    $('#programa').modal('show');
    const init = async () => {
      await getGroups();
      await getLearningResults();
      await getAmbients();
      await getUsers();
      await getTemporalyUsers();
    }
    init();
  }, []);

  if (loader) {
    return <Loader />
  } else {
    return (
      <div>
        <Navbar active="programacion" />
        <div className="col-12 mb-3 mt-3">
          <ModalGrupo
            groups={groupsToSelect}
            selected={groupSelected}
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
          />
          {group.id ?
            <Tabla
              alerta={handleAlerta}
              groupInfo={group}
              day={day}
              setDay={setDay}
            />
            :
            <div></div>
          }
        </div>
        <Alerta {...alert} />
      </div>
    );
  }
}
