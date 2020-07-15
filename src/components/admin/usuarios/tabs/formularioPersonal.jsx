import React from 'react';
import handleMayus from './../../../../helpers/handleMayus';

const FormularioInformacionPersonal = ({username,setUsername,document, setDocument, birthdate, setBirthdate, setGender,gender})=>{
    return(
        <div className="card-body">
            <div className="form-group" id="username">
                <label htmlFor="username">Nombres <span className="text-danger">*</span></label>
                <input type="text" placeholder="Nombre del usuario" name="username" className="form-control" value={username} onChange={e => setUsername(handleMayus(e.target.value))}/>
                <span className="text-danger"></span>
            </div>
            <div className="form-group" id="document">
                <label htmlFor="document">Documento <span className="text-danger">*</span></label>
                <input type="number" placeholder="Documento del usuario" name="document" className="form-control"  value={document} onChange={e => setDocument(e.target.value)}/>
                <span className="text-danger"></span>
            </div>
            <div className="form-group" id="birthdate">
                <label htmlFor="birthdate">Fecha nacimiento <span className="text-danger">*</span></label>
                <input type="date" name="birthdate" className="form-control"  value={birthdate} onChange={e => setBirthdate(e.target.value)}/>
                <span className="text-danger"></span>
            </div>
            <div className="form-group" id="genere">
                <p>Sexo <span className="text-danger">*</span></p>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="genere" id="Femenenino" value="F" onClick={() => setGender('F')} checked={gender === 'F' } onChange={() => setGender('F')}/>
                    <label className="form-check-label" htmlFor="Femenenino" onClick={() => setGender('F')}>Femenenino</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="genere" id="Masculino" value="M" onClick={() => setGender('M')} checked={gender === 'M' } onChange={() => setGender('M')}/>
                    <label className="form-check-label" htmlFor="Masculino" onClick={() => setGender('M')}>Masculino</label>
                </div>
            </div>
        </div>
    );
}

export default FormularioInformacionPersonal;
