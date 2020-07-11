import React from 'react';

const FormularioInformacionContanto = ({
    misena_email, setMisena_email,
    institutionalEmail, setInstitutionalEmail,
    phone_ip, setPhone_ip,
    phone, setPhone
})=>{
    return(
        <div className="card-body">
            <div className="form-group" id="misena_email">
                <label htmlFor="misena_email">Correo misena <span className="text-danger">*</span></label>
                <input type="email" placeholder="usuario@misena.edu.co" name="misena_email" className="form-control" value={misena_email} onChange={e => setMisena_email(e.target.value)} />
                <span className="text-danger"></span>
            </div>
            <div className="form-group" id="institutional_email">
                <label htmlFor="institutional_email">Correo institucional <span className="text-danger">*</span></label>
                <input type="email" placeholder="usuario@mail.com" name="institutional_email" className="form-control" value={institutionalEmail} onChange={e => setInstitutionalEmail(e.target.value)}/>
                <span className="text-danger"></span>
            </div>
            <div className="form-group" id="phone_ip">
                <label htmlFor="phone_ip">Teléfono ip <span className="text-danger">*</span></label>
                <input type="number" name="phone_ip" className="form-control" placeholder="12345" value={phone_ip} onChange={e => setPhone_ip(e.target.value)}/>
                <span className="text-danger"></span>
            </div>
            <div className="form-group" id="phone">
                <label htmlFor="phone">Teléfono <span className="text-danger">*</span></label>
                <input type="number" name="phone" className="form-control" placeholder="3214567890" value={phone} onChange={e => setPhone(e.target.value)}/>
                <span className="text-danger"></span>
            </div>
        </div>
    );
}

export default FormularioInformacionContanto;
