import React from 'react';

import Spinner from './../../spinner';
import Api from './../../Api';
import $ from 'jquery';


class Eliminar extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            showSpinner: false
        }
    }

    async delete(id){
        this.setState({showSpinner: true});
        console.log(id);
        let res = await Api(`formationPrograms/${id}`,'DELETE',sessionStorage.getItem('token'),'');
        if(res === "Programa de formacion eliminado"){
            await this.props.update();
            this.props.alerta(res, 'success');
        }else{
            if(res.message){
                this.props.alerta(res.message, 'danger');
            }else{
                this.props.alerta(res, 'danger');
            }
            // console.log(res);

        }
        $('#eliminar').modal('hide');
        this.setState({showSpinner: false});
    }

    render() {
        return (
            <div className="modal fade" id="eliminar" role="dialog" aria-labelledby="eliminarLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="eliminarLabel">Eliminar tipo de contrato</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ¿Deseas eliminar el programa de formación?
                    </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-outline-danger" onClick={() => this.delete(this.props.id)}>Sí, eliminar <Spinner show={this.state.showSpinner} /> </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Eliminar;