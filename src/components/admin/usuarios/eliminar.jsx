import React, { useState } from 'react'
import Spinner from '../../spinner';
import DisableButton from './../../../helpers/DisableButton';
import consumidor from '../../../helpers/consumidor';
import $ from 'jquery';

const Eliminar = ({id, alerta, update}) => {

    const [spinner, setSpinner] = useState(false);

    const remove = async () => {
        DisableButton.setId('btn-eliminar')
        DisableButton.disable();
        setSpinner(true);
        
        let response = await consumidor.delete('users',id);

        if(response === "Usuario eliminado"){
            await update();
            $('#eliminar').modal('hide');
            alerta('success',response);
        }else{
            console.log(response);
            $('#eliminar').modal('hide');
            alerta('danger','Error del servidor');
        }
        
        DisableButton.enable();
        setSpinner(false);
    }

    return (
        <div className="modal fade" id="eliminar" role="dialog" aria-labelledby="eliminarLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="eliminarLabel">¿Deseas eliminar el usuario?</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cancelar</button>
                        <button 
                            type="button" className="btn btn-outline-danger" 
                            onClick={() => remove()}
                            id="btn-eliminar"
                        >
                            Sí, eliminar <Spinner show={spinner}/> 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Eliminar
