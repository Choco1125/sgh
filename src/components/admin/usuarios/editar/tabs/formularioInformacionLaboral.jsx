import React from 'react';
import Select from 'react-select';
import handleMayus from '../../../../../helpers/handleMayus';

const FormularioInformacionLaboral = ({
    cargos, position, setPosition,
    tiposContratos, contractType, setContractType,
    profession, setProfession,
    grade, setGrade
}) => {
    return (
        <div className="card-body">
            <div className="form-group" id="positionId">
                <label htmlFor="positionId">Cargo <span className="text-danger">*</span></label>
                <Select
                    options={cargos}
                    value={position}
                    onChange={e => setPosition(e)}
                />
                <span className="text-danger"></span>
            </div>
            <div className="form-group" id="contractTypeId">
                <label htmlFor="contractTypeId">Tipo de contrato <span className="text-danger">*</span></label>
                <Select
                    options={tiposContratos}
                    value={contractType}
                    onChange={e => setContractType(e)}
                />
                <span className="text-danger"></span>
            </div>
            <div className="form-group" id="porfession">
                <label htmlFor="porfession">Profesión <span className="text-danger">*</span></label>
                <input type="text" name="porfession" className="form-control" placeholder="Profesión del usuario" value={profession || ''} onChange={e => setProfession(handleMayus(e.target.value))} />
                <span className="text-danger"></span>
            </div>
            <div className="form-group" id="grade">
                <label htmlFor="grade">Grado</label>
                <input type="number" name="grade" className="form-control" placeholder="Profesión del usuario" value={grade} onChange={e => setGrade(e.target.value)} />
                <span className="text-danger"></span>
            </div>
        </div>
    );
}

export default FormularioInformacionLaboral;
