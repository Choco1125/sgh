import React from 'react';
import Select from 'react-select';
import handleMayus from '../../../../helpers/handleMayus';

const FormularioOtraInformacion = ({
    rols, rol, setRol,
    isBossArea, setIsBossArea,
    last_academic_level, setLast_academic_level,
    setPhoto, photo
}) => {

    return (
        <div className="card-body">
            <div className="form-group">
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="customFile" accept="image/*" onChange={e => setPhoto(e.target.files[0])} />
                    <label className="custom-file-label" htmlFor="customFile">{photo.name || 'Seleccina una foto'}</label>
                </div>
            </div>
            <div className="form-group" id="rolId">
                <label htmlFor="rolId">Rol <span className="text-danger">*</span></label>
                <Select
                    options={rols}
                    value={rol}
                    onChange={e => setRol(e)}
                />
                <span className="text-danger"></span>
            </div>
            <div className="mt-1 mb-2">
                <div className="custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id="customSwitch1" checked={isBossArea} onChange={() => setIsBossArea(!isBossArea)} />
                    <label className="custom-control-label" htmlFor="customSwitch1" >Gefe de area</label>
                </div>
            </div>
            <div className="form-group" id="last_academic_level">
                <label htmlFor="last_academic_level">Último nivel académico <span className="text-danger">*</span></label>
                <input type="text" className="form-control" placeholder="Último nivel académico del usuario" value={last_academic_level} onChange={e => setLast_academic_level(handleMayus(e.target.value))} />
                <span className="text-danger"></span>
            </div>
        </div>
    );
}

export default FormularioOtraInformacion;

