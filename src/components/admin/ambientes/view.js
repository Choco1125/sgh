import React from 'react';

const View = ({datos}) => (
    <div className="modal fade" id="ver" data-backdrop="static" role="dialog" aria-labelledby="verLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="verLabel">Ver Ambiente</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-group" id="name">
                        <h5>Nombre</h5>
                        <p>{datos.name}</p>
                    </div>
                    <div className="form-group" id="state">
                        <h5>Estado</h5>
                        <p>{datos.state}</p>
                    </div>
                    <div className="form-group" id="usability">
                        <h5>Usabilidad</h5>
                        <p>{datos.usability}</p>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-outline-secondary btn-block" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
);

export default View;