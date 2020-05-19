import React, { useState } from 'react';
import Spinner from '../../spinner';
import consumidor from '../../../helpers/consumidor';
import $ from 'jquery';


const Eliminar = ({id,alerta})=>{

    const [spinner, setSpinner] = useState(false);

    const remove = async ()=>{
        setSpinner(true);
        let res = await consumidor.delete('periodicities',id);
        if(res.message){
            $('#eliminar').modal('hide');
            alerta(res.message,'danger');
        }
        console.log(res);
        setSpinner(false);
    }

    return(
        <div className="modal fade" id="eliminar" role="dialog" aria-labelledby="eliminarLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="eliminarLabel">¿Deseas eliminar usuario temporal?</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-outline-danger" onClick={() => remove()}>
                            Sí, eliminar <Spinner show={spinner} /> 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Eliminar;