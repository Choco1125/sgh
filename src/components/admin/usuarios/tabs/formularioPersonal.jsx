import React from 'react';
import handleMayus from './../../../../helpers/handleMayus';

const FormularioInformacionPersonal = ({username,setUsername,document, setDocument, birthdate, setBirthdate, setGender})=>{
    return(
        <div className="card-body">
            <div className="form-group" id="username">
                <label htmlFor="username">Nombres</label>
                <input type="text" placeholder="Nombre del usuario" name="username" className="form-control" value={username} onChange={e => setUsername(handleMayus(e.target.value))}/>
                <span className="text-danger"></span>
            </div>
            <div className="form-group" id="document">
                <label htmlFor="document">Documento</label>
                <input type="number" placeholder="Documento del usuario" name="document" className="form-control"  value={document} onChange={e => setDocument(e.target.value)}/>
                <span className="text-danger"></span>
            </div>
            <div className="form-group" id="birthdate">
                <label htmlFor="birthdate">Fecha nacimiento</label>
                <input type="date" name="birthdate" className="form-control"  value={birthdate} onChange={e => setBirthdate(e.target.value)}/>
                <span className="text-danger"></span>
            </div>
            <div className="form-group" id="genere">
                <p>Sexo</p>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="genere" id="Femenenino" value="Femenino" onClick={() => setGender('Femenino')} defaultChecked/>
                    <label className="form-check-label" htmlFor="Femenenino" onClick={() => setGender('Femenino')}>Femenenino</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="genere" id="Masculino" value="Masculino" onClick={() => setGender('Masculino')}/>
                    <label className="form-check-label" htmlFor="Masculino" onClick={() => setGender('Masculino')}>Masculino</label>
                </div>
            </div>
        </div>
    );
}

export default FormularioInformacionPersonal;
