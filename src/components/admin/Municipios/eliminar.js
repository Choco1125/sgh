import React,{useState} from 'react';
import Spinner from './../../spinner';
import consumidor from '../../../helpers/consumidor';
import $ from 'jquery';


const Eliminar = ({id,alerta,update})=>{

    const [showSpinner, setShowSpinner] = useState(false);

    const del = async()=>{

        setShowSpinner(true);

        let res = await consumidor.delete('municipalities',id);
        if(res === "Municipio eliminado"){
            await update();
            $('#eliminar').modal('hide');
            alerta('success',res);
        }else if(res.message){
            $('#eliminar').modal('hide');
            alerta('danger',res);
        }else{
            $('#eliminar').modal('hide');
            alerta('danger',res);
            console.log(res);
        }

        setShowSpinner(false);

    }

    return(
        <div className="modal fade" id="eliminar" role="dialog" aria-labelledby="eliminarLabel" 
            aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="eliminarLabel">Eliminar Municipio</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ¿Deseas eliminar el municipio?
                    </div>
                        <div className="modal-footer">
                            <button type="button" 
                                className="btn btn-outline-secondary" 
                                data-dismiss="modal">
                                    Cancelar
                            </button>
                            <button type="button" 
                                className="btn btn-outline-danger" 
                                onClick={() => del()}
                            >
                                Sí, eliminar <Spinner show={showSpinner} /> 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Eliminar;