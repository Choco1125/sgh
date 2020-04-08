import React from 'react';

import Spinner from './../../spinner';
import Api from './../../Api';
import $ from 'jquery';

class Delete extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            showSpinner: false
        }
    }

    async delete(id){
        this.setState({showSpinner: true});
        let res = await Api(`contractTypes/${id}`,'DELETE',sessionStorage.getItem('token'),'');
        if(res === "Tipo de contrato eliminado"){
            await this.props.update();
            this.props.alerta(res, 'success');
        }else if(res === 'Cannot delete or update a parent row: a foreign key constraint fails (`heroku_1e4ca3e13755145`.`users`, CONSTRAINT `users_ibfk_3` FOREIGN KEY (`contractTypeId`) REFERENCES `contracttypes` (`id`))'){
            this.props.alerta('No se puede eliminar porque se encuentra en uso', 'danger');
        }else{
            console.log(res);
            this.props.alerta(res, 'danger');

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
                            ¿Deseas eliminar el tipo de contrato?
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

export default Delete;