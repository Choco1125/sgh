import React from 'react';
import Spinner from './../../spinner';
import Api from './../../Api';
import $ from 'jquery';


class Eliminar extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            showSpinner: false
        }
    }

    async delete(){
        this.setState({showSpinner: true});
        let datos = await Api(`learningResults/${this.props.id}`,'DELETE',sessionStorage.getItem('token'),'');
        if(datos === 'Resultado de aprendizaje eliminado'){
            await this.props.update();
            $('#eliminar').modal('hide');
            this.props.alerta(datos,'success');
        }else{
            if(datos.name){
                $('#eliminar').modal('hide');
                this.props.alerta('No se pede eliminar porque está enlazado','danger');
            }else{
                $('#eliminar').modal('hide');
                this.props.alerta(datos,'danger');
            }
        }
        this.setState({showSpinner: false});
    }

    render() {
        return (
            <div className="modal fade" id="eliminar" role="dialog" 
                aria-labelledby="eliminarLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="eliminarLabel">
                                Eliminar tipo de contrato
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" 
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ¿Deseas eliminar el resultado de apredizaje?
                    </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" 
                                data-dismiss="modal">
                                    Cancelar
                            </button>
                            <button type="button" className="btn btn-outline-danger" 
                                onClick={() => this.delete(this.props.id)}>
                                    Sí, eliminar 
                                    <Spinner show={this.state.showSpinner} /> 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Eliminar;