import React from 'react';

const Ver = ({ datos }) => (
    <div className="modal fade" id="ver" data-backdrop="static" role="dialog" 
        aria-labelledby="verLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="verLabel">Resultado de aprendizaje</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-group mt-1">
                        <h5>Resumen</h5>
                        <p>{datos.summary}</p>
                    </div>
                    <div className="form-group">
                        <h5>Descripción</h5>
                        <p>{datos.description}</p>

                    </div>
                    <div className="form-group">
                        <h5>Horas</h5>
                        <p>{datos.hours}</p>
                    </div>
                    <div className="form-group">
                        <h5>Fase del proyecto</h5>
                        <p>{datos.projectPhase}</p>
                    </div>
                    <div className="form-group">
                        <h5>Cometencia</h5>
                        <p>{datos.competence}</p>
                    </div>
                    <div className="form-group">
                        <h5>Trimestre evaluado</h5>
                        <p>{datos.trimesterEvaluate}</p>
                    </div>
                    <div className="form-group">
                        <h5>Trimestre asociado</h5>
                        <p>{datos.associatedTrimesters}</p>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-outline-secondary btn-block" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
)

export default Ver;