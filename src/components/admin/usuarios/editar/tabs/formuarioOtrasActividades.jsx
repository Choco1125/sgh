import React, { useEffect, useState } from 'react';
import {ModalCrear} from './otrasActividades/CrearActividadModal';
import consumidor from './../../../../../helpers/consumidor';


const manejarFecha = (fecha) => {
  let arregloFechas = fecha.split("T");
  return arregloFechas[0];
};

const CardActividad = ({ actividad }) => (
  <div className="card card-body mt-2 mb-2">
    <h5 className="card-title">{actividad.name}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{actividad.day}</h6>
    <p className="card-text">Fecha inicio: {manejarFecha(actividad.startDate)}</p>
    <p className="card-text">Fecha fin: {manejarFecha(actividad.endDate)}</p>
  </div>
);

function FormuarioOtrasActividades({ actividades,alerta,setOtrasActividades }) {

	const [typeActivities, setTypeActivities] = useState([{label:'Selecciona un tipo de actividad', value:''}]);
	
	useEffect(() => {
		const getActivies = async () => {
			let response = await consumidor.get('typeActivities');
			if(response){
				let datos = [];
				response.map(actividad => datos.push({label: actividad.name, value: actividad.id}));
				setTypeActivities(datos);
			}
		}
		getActivies();
	},[actividades])

  return (
    <div className="card-body">
      <div className="row justify-content-end">
        <button className="btn btn-outline-success btn-sm mr-3" data-toggle="modal" data-target="#crearActividad">Agregar</button>
      </div>
      <div className="col-12">
        {actividades.map(actividad => <CardActividad key={actividad.id} actividad={actividad} />)}
      </div>
			<ModalCrear
				activitiesTypes={typeActivities}	
				alerta ={alerta}
				setOtrasActividades = {setOtrasActividades} 
			/>
    </div>
  );
} 
export default FormuarioOtrasActividades;
