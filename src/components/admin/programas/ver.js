import React from 'react';


class Ver extends React.Component {

    render() {       
        return (
            <div className="modal fade" id="ver" data-backdrop="static" role="dialog" aria-labelledby="verLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="verLabel">Competencia</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group mt-1">
                                <h5>Código</h5>
                                <p>{this.props.datos.code}</p>
                            </div>
                            <div className="form-group">
                                <h5>Nombre</h5>
                                <p>{this.props.datos.name}</p>

                            </div>
                            <div className="form-group">
                                <h5>Tipo de formación</h5>
                                <p>{this.props.datos.formationType}</p>
                            </div>
                            <div className="form-group">
                                <h5>Registro cualificado</h5>
                                <p>{(this.props.datos.isRegisterQualified)?'Sí':'No'}</p>
                            </div>
                            <div className="form-group">
                                <h5>Fecha registro cualificado</h5>
                                <p>{this.props.datos.isRegisterQualifiedDate}</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary btn-block" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Ver;   