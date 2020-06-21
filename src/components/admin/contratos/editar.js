import React from 'react';
import Spinner from './../../spinner.js';

class Editar extends React.Component {
    render() {
        return (
            <div className="modal fade" id="editar" data-backdrop="static" role="dialog" aria-labelledby="editarLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editarLabel">Editar tipo contrato</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <span className="font-weight-lighter">
                                Los campos con 
                                <i className="text-danger">*</i> 
                                son obligatorios
                            </span>
                            <div className="form-group" id="name_edit">
                                <label htmlFor="name">Nombre <span className="text-danger">*</span></label>
                                <input name="name" type="text" className="form-control" placeholder="Nombre del contrato"
                                    value={this.props.datos.name}
                                    onChange={(e) => this.props.handleChange(e)}
                                />
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-outline-success" onClick={() => this.props.save()}>Editar <i className="fas fa-save"></i> <Spinner show={this.props.showSpinner} /></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Editar;