import React, { useState } from 'react';
import './tabla.css';
import manejarFecha from '../../../helpers/manejarFechas';


function Tr({ horaInicio, horaFin, valor, evento }) {
  return (
    <tr>
      <td className="amarillo" style={{ width: '100px' }}>{horaInicio} {horaFin}</td>
      <td data-horai={horaInicio} data-horaf={horaFin} onClick={e => evento(e)} className="Lunes" data-valor={valor}></td>
      <td data-horai={horaInicio} data-horaf={horaFin} onClick={e => evento(e)} className="Martes" data-valor={valor}></td>
      <td data-horai={horaInicio} data-horaf={horaFin} onClick={e => evento(e)} className="Miercoles" data-valor={valor}></td>
      <td data-horai={horaInicio} data-horaf={horaFin} onClick={e => evento(e)} className="Jueves" data-valor={valor}></td>
      <td data-horai={horaInicio} data-horaf={horaFin} onClick={e => evento(e)} className="Viernes" data-valor={valor}></td>
      <td data-horai={horaInicio} data-horaf={horaFin} onClick={e => evento(e)} className="Sabado" data-valor={valor}> </td>
    </tr>
  );
}

function Data({ title, text }) {
  return (
    <>
      <p className="bolder" style={{ margin: 0 }}>{title}</p>
      <span className="texto">{text}</span>
      <br />
      <br />
    </>
  );
}

function Barra({ groupInfo }) {
  if (groupInfo.id) {
    return (
      <th rowSpan="31" scope="col" className="text-center green p-2" style={{ maxWidth: "70px" }}
      >
        <Data title="ID" text={groupInfo.codeTab} />
        <Data title="Programa de formación" text={groupInfo.formationProgram.name} />
        <Data title="Gestor de grupo" text={groupInfo.manager.username} />
        <Data title="Trimestre" text={groupInfo.programation[0].trimester} />
        <Data title="Fecha Inicio" text={manejarFecha(groupInfo.electiveEndDate)} />
        <Data title="Fecha Fin" text={manejarFecha(groupInfo.practiceEndDate)} />
        <Data title="Nro. Aprendices" text={`${groupInfo.activeLearners}/${groupInfo.quantityLearners}`} />
        <Data title="Fecha inicio trimestre" text={manejarFecha(groupInfo.programation[0].startDate)} />
        <Data title="Fecha fin trimestre" text={manejarFecha(groupInfo.programation[0].endDate)} />

      </th>
    );
  } else {
    return (
      <th rowSpan="31" scope="col" className="text-center green p-1" data-toggle="modal"
        data-target="#programa" id="ambiente-name" style={{ maxWidth: "70px" }}
      >
        Selecciona un programa de formación
      </th>
    );
  }

}

export default function Tabla({ alerta, groupInfo }) {

  const [inicio, setInico] = useState(0);
  const [elementoInicio, setElementoInicio] = useState("");
  const [day, setDay] = useState("");

  const calculateRowSpan = (inicio, fin, elementoInicio) => {
    let rowSpan = (fin - inicio) + 1;
    elementoInicio.setAttribute('rowspan', rowSpan);
    elementoInicio.classList.add('acua');
    hideElements(inicio, fin);
  }

  const hideElements = (inicio, fin) => {
    let tds = document.getElementsByClassName(day);

    for (let i = 0; i < tds.length; i++) {
      let td = tds.item(i);
      let valor = parseInt(td.dataset.valor);
      if (valor > inicio && valor < (fin + 1)) {
        td.classList.add('hide');
      }
    }
    setInico(0);
  }

  const handlerClick = async (e) => {
    if (inicio === 0) {
      e.target.classList.add('blue');
      setInico(parseInt(e.target.dataset.valor));
      setElementoInicio(e.target);
      setDay(e.target.classList[0]);
    } else {
      if (e.target.classList[0] === day) {
        if (inicio > parseInt(e.target.dataset.valor)) {
          elementoInicio.classList.add('hide');
          console.log(elementoInicio);
          calculateRowSpan(parseInt(e.target.dataset.valor), inicio, e.target);
        } else {
          calculateRowSpan(inicio, parseInt(e.target.dataset.valor), elementoInicio);
        }
        e.target.classList.add('blue');
      } else {
        alerta('warning', 'Debes seleccionar un hora en el mismos día');
      }
    }
  }

  return (
    <table className="col-12 text-center" style={{ fontSize: "11.5px" }} border="1">
      <thead style={{ textTransform: "uppercase" }}>
        <tr>
          <th></th>
          <th>hora</th>
          <th className="colum">lunes</th>
          <th className="colum">martes</th>
          <th className="colum">miércoles</th>
          <th className="colum">jueves</th>
          <th className="colum">viernes</th>
          <th className="colum">sábado</th>
        </tr>
      </thead>
      <tbody>
        <Barra groupInfo={groupInfo} />
        <Tr horaInicio="7:00" horaFin="7:30" evento={handlerClick} valor="2" />
        <Tr horaInicio="7:30" horaFin="8:00" evento={handlerClick} valor="3" />
        <Tr horaInicio="8:00" horaFin="8:30" evento={handlerClick} valor="4" />
        <Tr horaInicio="8:30" horaFin="9:00" evento={handlerClick} valor="5" />
        <Tr horaInicio="9:00" horaFin="9:30" evento={handlerClick} valor="6" />
        <Tr horaInicio="9:30" horaFin="10:00" evento={handlerClick} valor="7" />
        <Tr horaInicio="10:00" horaFin="10:30" evento={handlerClick} valor="8" />
        <Tr horaInicio="10:30" horaFin="11:00" evento={handlerClick} valor="9" />
        <Tr horaInicio="11:00" horaFin="11:30" evento={handlerClick} valor="10" />
        <Tr horaInicio="11:30" horaFin="12:00" evento={handlerClick} valor="11" />
        <Tr horaInicio="12:00" horaFin="12:30" evento={handlerClick} valor="12" />
        <Tr horaInicio="12:30" horaFin="1:00" evento={handlerClick} valor="13" />
        <Tr horaInicio="1:00" horaFin="1:30" evento={handlerClick} valor="14" />
        <Tr horaInicio="1:30" horaFin="2:00" evento={handlerClick} valor="15" />
        <Tr horaInicio="2:00" horaFin="2:30" evento={handlerClick} valor="16" />
        <Tr horaInicio="2:30" horaFin="3:00" evento={handlerClick} valor="17" />
        <Tr horaInicio="3:00" horaFin="3:30" evento={handlerClick} valor="18" />
        <Tr horaInicio="3:30" horaFin="4:00" evento={handlerClick} valor="19" />
        <Tr horaInicio="4:00" horaFin="4:30" evento={handlerClick} valor="20" />
        <Tr horaInicio="4:30" horaFin="5:00" evento={handlerClick} valor="21" />
        <Tr horaInicio="5:00" horaFin="5:30" evento={handlerClick} valor="22" />
        <Tr horaInicio="5:30" horaFin="6:00" evento={handlerClick} valor="23" />
        <Tr horaInicio="6:00" horaFin="6:30" evento={handlerClick} valor="24" />
        <Tr horaInicio="6:30" horaFin="7:00" evento={handlerClick} valor="25" />
        <Tr horaInicio="7:00" horaFin="7:30" evento={handlerClick} valor="26" />
        <Tr horaInicio="7:30" horaFin="8:00" evento={handlerClick} valor="27" />
        <Tr horaInicio="8:00" horaFin="8:30" evento={handlerClick} valor="28" />
        <Tr horaInicio="8:30" horaFin="9:00" evento={handlerClick} valor="29" />
        <Tr horaInicio="9:00" horaFin="9:30" evento={handlerClick} valor="30" />
        <Tr horaInicio="9:30" horaFin="10:00" evento={handlerClick} valor="31" />
      </tbody>
    </table>
  )
}
