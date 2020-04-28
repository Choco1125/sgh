import React,{useState} from 'react';
import Spinner from './../../spinner';
import handleMayus from '../../../helpers/handleMayus';
import validator from '../../../helpers/validator';
import consumidor from '../../../helpers/consumidor';
import $ from 'jquery';
import handleError from '../../../helpers/handleError';

const Crear = ({alerta, update})=>{

    const [spinner, setSpinner] = useState(false);
    const [datos, setDatos] = useState({
        name: ''
    });

    const handleChange = e => setDatos({
        ...datos,
        [e.target.name]: handleMayus(e.target.value)
    });

    const save = async ()=>{
        setSpinner(true);
        if(validator.validarDatos(datos)){
            let res = await consumidor.post('rols',datos);

            if(res === 'Nuevo rol creado'){
                await update();
                $('#crear').modal('hide');
                alerta(res,'success');
            }else if(res === 'Rol ya existente'){
                handleError.inputMsj('name',res);
            }else if(res.message){
                $('#crear').modal('hide');
                alerta(res.message,'danger');
            }else{
                $('#crear').modal('hide');
                alerta(JSON.stringify(res),'danger');
                console.log(res);
            }
        }
        setSpinner(false);
    }

    return(
        <div className="modal fade" id="crear" data-backdrop="static" role="dialog" 
                aria-labelledby="crearLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="crearLabel">
                                Crear Rol
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" 
                            aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <span className="font-weight-lighter">
                                Los campos con
                                <i className="text-danger">* </i>
                                son obligatorios
                            </span>
                            <div className="form-group mt-1" id="name">
                                <label htmlFor="name">
                                    Nombre
                                <span className="text-danger">*</span>
                                </label>
                                <input name="name" type="text"
                                    className="form-control"
                                    placeholder="Nombre de la posición"
                                    onChange={e => handleChange(e)}
                                    value={datos.name}
                                />
                                <span className="text-danger" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" 
                                data-dismiss="modal">
                                    Cerrar
                            </button>
                            <button type="button" className="btn btn-outline-success" 
                                onClick = {()=> save()}
                            >
                                Crear <i className="mr-1 fas fa-save"></i> 
                                <Spinner show={spinner} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Crear;