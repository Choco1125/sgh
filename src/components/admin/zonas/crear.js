import React from 'react';
import handleMayus from './../../../helpers/handleMayus'
import Spinner from './../../spinner';
import consumidor from '../../../helpers/consumidor';
import handleError from './../../../helpers/handleError';
import $ from 'jquery';


class Crear extends React.Component {

    constructor(props){
        super(props);

        this.state={
            datos:{
                name: ''
            },
            spinner:{
                show: false
            }
        }
    }   

    handleChange(e){
        this.setState({
            datos:{
                [e.target.name]: handleMayus(e.target.value)
            }
        });
    }

    async save(){
        this.setState({
            spinner:{
                show: true
            }
        });


        let res = await consumidor.post('zones',this.state.datos);

        if(res === "Nueva zona creado"){
            await this.props.update();
            $('#crear').modal('hide');
            this.props.alerta(res,'success');
        }else if(res === "Zona ya existente"){
            handleError.inputMsj('name',res);
        }else if(res.message){
            $('#crear').modal('hide');
            this.props.alerta(res.message,'danger');
        }else{
            $('#crear').modal('hide');
            console.log(res);
        }

        this.setState({
            spinner:{
                show: false
            }
        });
    }

    render() {
        return (
            <div className="modal fade" id="crear" data-backdrop="static" role="dialog"
                aria-labelledby="crearLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="crearLabel">
                                Crear zona
                                </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group" id="name">
                                <label htmlFor="name">Nombre</label>
                                <input name="name"
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre la zonas"
                                    value={this.state.datos.name}
                                    onChange={(e) => this.handleChange(e)}

                                />
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" 
                                className="btn btn-outline-secondary" 
                                data-dismiss="modal"
                            >
                                Cerrar
                            </button>
                            <button type="button"
                                className="btn btn-outline-success" 
                                onClick={() => this.save()} 
                            >
                                Crear <i className="fas fa-save"></i> <Spinner show={this.state.spinner.show} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Crear;