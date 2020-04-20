import React from 'react';
import Spinner from './../../spinner';
import validator from '../../../helpers/validator';
import consumidor from '../../../helpers/consumidor';
import $ from 'jquery';



class Editar extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            spinner:{
                show: false
            }
        }
    }

    async update(){
        this.setState({
            spinner:{
                show: true
            }
        });


        if(validator.validarDatosEdit(this.props.datos)){
            let res = await consumidor.put('zones',this.props.datos.id,this.props.datos);
            if(res === 'Zona actualizada'){
                await this.props.update();
                $('#editar').modal('hide');
                this.props.alerta(res,'success');
            }else if(res.message){
                $('#editar').modal('hide');
                this.props.alerta(res,'danger');
            }else{
                $('#editar').modal('hide');
                this.props.alerta(JSON.stringify(res),'danger');
            }
        }

        this.setState({
            spinner:{
                show: false
            }
        });
    }

    render(){
        return(
            <div className="modal fade" id="editar" data-backdrop="static" role="dialog"
                aria-labelledby="editarLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editarLabel">
                                Editar zona
                                </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group" id="name_edit">
                                <label htmlFor="name">Nombre</label>
                                <input name="name"
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre la zonas"
                                    value={this.props.datos.name}
                                    onChange={(e) => this.props.handleChange(e)}

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
                                onClick={() => this.update()} 
                            >
                                Actualizar <i className="fas fa-save mr-1"></i> 
                                <Spinner show={this.state.spinner.show} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Editar;