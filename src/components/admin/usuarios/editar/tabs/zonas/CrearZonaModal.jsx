import React,{useState} from 'react';
import Spinner from './../../../../../spinner';
import Select from 'react-select';
import DisableButton from './../../../../../../helpers/DisableButton';
import TagObligatorio from './../../../../../tagObligatorio';
import handleError from './../../../../../../helpers/handleError';
import consumidor from './../../../../../../helpers/consumidor';
import {useParams} from 'react-router-dom';
import $ from 'jquery';


export const CrearZonaModal = ({zonas,myZones,setZones,alerta}) => {
  const [spinner, setSpinner] = useState(false);
  const [zone, setZonse] = useState({label: 'Selecciona una zona', value:''});

  const {id} = useParams();

  const save = async ()=>{
    DisableButton.setId('save-zone');
    DisableButton.disable();
    setSpinner(true);
    
    if(zone.value === ''){
      handleError.input('zone');
    }else{
      if(myZones.indexOf(zone.value) ===  -1){
	let dataToUpdate = [...myZones, zone.value];
	let respuesta = await consumidor.put('users',id,{zones: dataToUpdate});
	if(respuesta === 'Usuario actualizado'){
	  let res = await consumidor.get(`users/${id}`);
	  if(res){
	    setZones(res.zones);
	    $('#crearZona').modal('hide');
	    alerta('success','Zona agregada');
	  }else{
	    console.log(res);
	    $('#crearZona').modal('hide');
	    alerta('danger','No se puede agregar la zona');
	 }
	}
      }else{
	handleError.inputMsj('zone','Esta zona ya se encuentra asignada al usuario');
      }
    }
    
    setSpinner(false);
    DisableButton.enable();
  }

    
  return (
    <div className="modal fade" id="crearZona" data-backdrop="static" data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="crearZonaLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="crearContratoLabel">Crear contrato</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
    	    <div className="form-contol" id="zone">
    		<label>Zona <TagObligatorio/></label>
    		<Select
    		  options={zonas}
    		  value={zone}
    		  onChange={e =>{
		    setZonse(e);
		    handleError.inputMsj('zone','');
		  }}
    		/>
    		<span className="text-danger"></span>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cerrar</button>
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={() => save()}
              id="save-zone"
            >
              Crear <i className="ml-1 mr-1 fas fa-save mr-1"></i>
              <Spinner show={spinner} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}
