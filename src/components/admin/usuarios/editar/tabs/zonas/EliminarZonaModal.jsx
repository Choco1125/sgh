import React, { useState } from 'react';
import Spinner from './../../../../../spinner';
import disableButton from './../../../../../../helpers/DisableButton';
import { useParams } from 'react-router-dom';
import consumidor from '../../../../../../helpers/consumidor';
import $ from 'jquery';


export const EliminarZonaModal = ({idzone,myZones,setZones, alerta}) => { 
  const [spinner, setSpinner] = useState(false);
  const {id} = useParams();

  const eliminar = async () => {
    disableButton.setId('btn-elimnar-zona');
    disableButton.disable();
    setSpinner(true);
    let newZones = myZones.filter(zone => zone !== idzone);
    let response = await consumidor.put('users',id,{zones: newZones });
    if(response === 'Usuario actualizado'){
      let datos = await consumidor.get(`users/${id}`);
      if(datos){
	setZones(datos.zones);
        $('#eliminarZona').modal('hide');
        alerta('success','Zona eliminada');
      }
    }else{
      	console.log(response);
        $('#eliminarZona').modal('hide');
        alerta('danger','No se pudo eliminar la zona');
    }
    setSpinner(false);
    disableButton.enable();
  }

  return(
    <div>
      <div className="modal fade" id="eliminarZona" data-backdrop="static" data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="eliminarZona" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="eliminarContratoLabel">¿Deseas eliminar el zona del usuario?</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cerrar</button>
              <button 
    		type="button"
    		className="btn btn-outline-danger"
    		onClick = {() => eliminar()}
                id="btn-elimnar-zona">Sí, eliminar <Spinner show={spinner} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
