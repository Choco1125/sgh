import React, { useState, useEffect } from 'react';
import {CrearZonaModal} from './zonas/CrearZonaModal';
import consumidor from './../../../../../helpers/consumidor';
import {EliminarZonaModal} from './zonas/EliminarZonaModal';

const CardZona = ({ name,setZoneId, id }) => (
  <div className="card card-body col-12 mt-2 mb-2">
    <h5 className="card-title">{name}</h5>
    <div className="row">
      <button 
  	className="btn btn-link btn-sm text-danger ml-2"
  	onClick={()=>setZoneId(id)} 
  	data-target="#eliminarZona"
  	data-toggle="modal"
      >Eliminar </button> 
    </div>
  </div>
);

export const FormularioZonas = ({ zones, setZones, alerta }) => {

  const [zonas,setZonas] = useState([{label: '', value: ''}]);
  const [myzonas, setMyZonas] = useState([]);
  const [zoneId, setZoneId] = useState(0);
  
  useEffect(()=>{
	 const setMyIdZones = () => {
     let myZones = [];
     zones.map(zone => myZones.push(zone.id)); 
     setMyZonas(myZones);
   }	

   const fetchDatos = async () => {
     const datos = await consumidor.get('zones'); 
     if(datos){
       let toState = [];
       datos.map(zone => toState.push({label: zone.name, value: zone.id})); 
       setZonas(toState);
     }
     setMyIdZones();
   }
  fetchDatos();
  },[zones]);

  return (
    <div className="card-body">
      <div className="row justify-content-end">
        <button className="btn btn-outline-success btn-sm mr-3" data-toggle="modal" data-target="#crearZona">Agregar</button>
      </div>
      <div className="justify-content-around mt-3">
        {
          zones.map(zone => <CardZona name={zone.name} key={zone.id} setZoneId={setZoneId} id={zone.id}/>)
        }
      </div>
      <CrearZonaModal 
        zonas={zonas} 
        myZones={myzonas}
        setZones={setZones}
        alerta={alerta}
      /> 
     <EliminarZonaModal 
    	idzone={zoneId}
    	myZones={myzonas}
      setZones={setZones}
    	alerta={alerta}
     />
    </div>
  )
}
