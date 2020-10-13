import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader';
import Tabla from '../../components/admin/horarios/tabla';
import Navbar from '../../components/admin/Navbar';
import Alerta from '../../components/Alert';
import ModalGrupo from '../../components/admin/horarios/modalGrupo';
import consumidor from '../../helpers/consumidor';
import $ from 'jquery';

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



  const handleChangeSalect = e => {
    setGroupSelected(e);
    let actualroup = groups.filter(group => group.id === e.value);
    setGroup(actualroup[0]);
  }

  useEffect(() => {
    $('#programa').modal('show');
    const init = async () => {
      await getGroups();
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
          {group.id ?
            <Tabla alerta={handleAlerta} groupInfo={group} />
            :
            <div></div>
          }
        </div>
        <Alerta {...alert} />
      </div>
    );
  }
}
