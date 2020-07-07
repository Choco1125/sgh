import React from 'react';
import FormularioInformacionPersonal from './formularioPersonal';
import FormularioInformacionContanto from './formularioInformacionContacto';
import FormularioInformacionLaboral from './formularioInformacionLaboral';
import FormularioOtraInformacion from './formularioOtraInformacion';


const Tabs = ({
    cargos,tiposContratos,rols,
    username, setUsername,
    document, setDocument,
    birthdate, setBirthdate,
    gender, setGender,
    misena_email, setMisena_email,
    institutionalEmail, setInstitutionalEmail,
    phone_ip, setPhone_ip,
    phone, setPhone,
    position, setPosition,
    contractType, setContractType,
    profession, setProfession,
    grade, setGrade,
    rol, setRol,
    isBossArea, setIsBossArea,
    last_academic_level, setLast_academic_level
}) => {
    return(
        <div>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a 
                        className="nav-item nav-link active" 
                        id="nac-personal-tab" 
                        data-toggle="tab" 
                        href="#nac-personal" 
                        role="tab" 
                        aria-controls="nac-personal" 
                        aria-selected="true"
                    >
                        Personal
                    </a>
                    <a 
                        className="nav-item nav-link" 
                        id="nav-contacto-tab" 
                        data-toggle="tab" 
                        href="#nav-contacto" 
                        role="tab" 
                        aria-controls="nav-contacto" 
                        aria-selected="false"
                    >
                        Contacto
                    </a>
                    <a 
                        className="nav-item nav-link" 
                        id="nav-laboral-tab" 
                        data-toggle="tab" 
                        href="#nav-laboral" 
                        role="tab" 
                        aria-controls="nav-laboral" 
                        aria-selected="false"
                    >
                        Laboral
                    </a>
            <a 
                        className="nav-item nav-link" 
                        id="nav-otra-tab" 
                        data-toggle="tab" 
                        href="#nav-otra" 
                        role="tab" 
                        aria-controls="nav-otra" 
                        aria-selected="false"
                    >
                        Otra
                    </a>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div 
                    className="tab-pane fade show active" 
                    id="nac-personal" 
                    role="tabpanel" 
                    aria-labelledby="nac-personal-tab"
                >
                    <FormularioInformacionPersonal 
                        username={username} setUsername={setUsername}
                        document={document} setDocument={setDocument}
                        birthdate={birthdate} setBirthdate={setBirthdate}
                        setGender={setGender}
                    />
                </div>
                <div 
                    className="tab-pane fade" 
                    id="nav-contacto" 
                    role="tabpanel" 
                    aria-labelledby="nav-contacto-tab"
                >
                    <FormularioInformacionContanto
                        misena_email = {misena_email} setMisena_email={setMisena_email}
                        institutionalEmail = {institutionalEmail} setInstitutionalEmail={setInstitutionalEmail}
                        phone = {phone} setPhone = {setPhone}
                        phone_ip = {phone_ip} setPhone_ip = {setPhone_ip}
                    />
                </div>
                <div 
                    className="tab-pane fade" 
                    id="nav-laboral" 
                    role="tabpanel" 
                    aria-labelledby="nav-laboral-tab"
                >
                    <FormularioInformacionLaboral 
                        cargos = {cargos}
                        position = {position} setPosition = {setPosition}
                        tiposContratos = {tiposContratos}
                        contractType = {contractType} setContractType = {setContractType}
                        profession = {profession} setProfession = {setProfession}
                        grade = {grade} setGrade = {setGrade}
                    />
                </div>
            <div 
                    className="tab-pane fade" 
                    id="nav-otra" 
                    role="tabpanel" 
                    aria-labelledby="nav-otra-tab"
                >
                    <FormularioOtraInformacion 
                        rols={rols} rol = {rol} setRol = {setRol}
                        isBossArea = {isBossArea} setIsBossArea={setIsBossArea}
                        last_academic_level = {last_academic_level} setLast_academic_level = {setLast_academic_level} 
                    />
                </div>

            </div>
        </div>
    );
}

export default Tabs;
