import React from 'react';
import FormularioInformacionPersonal from './formularioPersonal';
import FormularioInformacionContanto from './formularioInformacionContacto';
import FormularioInformacionLaboral from './formularioInformacionLaboral';
import FormularioOtraInformacion from './formularioOtraInformacion';
import FormularioContratros from './formularioContratos';
import { FormularioZonas } from './formularioZonas';
import FormuarioOtrasActividades from './formuarioOtrasActividades';


const Tabs = ({
  cargos, tiposContratos, rols,
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
  last_academic_level, setLast_academic_level,
  zones, state, setState,
  contratos, actividades,
  setLostFocusMainTab,
  handleAlert, setContracts,
  setZones
}) => {
  return (
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
            onClick={() => setLostFocusMainTab(false)}
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
            onClick={() => setLostFocusMainTab(true)}
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
            onClick={() => setLostFocusMainTab(true)}
          >
            Otra
          </a>
          <a
            className={`nav-item nav-link ${contractType.label !== 'Contratista' ? 'd-none' : ''}`}
            id="nav-contratos-tab"
            data-toggle="tab"
            href="#nav-contratos"
            role="tab"
            aria-controls="nav-contratos"
            aria-selected="false"
            onClick={() => setLostFocusMainTab(true)}
          >
            Contratos
          </a>
          <a
            className="nav-item nav-link"
            id="nav-zonas-tab"
            data-toggle="tab"
            href="#nav-zonas"
            role="tab"
            aria-controls="nav-zonas"
            aria-selected="false"
            onClick={() => setLostFocusMainTab(true)}
          >
            Zonas
          </a>
          <a
            className="nav-item nav-link"
            id="nav-actividades-tab"
            data-toggle="tab"
            href="#nav-actividades"
            role="tab"
            aria-controls="nav-actividades"
            aria-selected="false"
            onClick={() => setLostFocusMainTab(true)}
          >
            Otras actividades
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
            setGender={setGender} gender={gender}
          />
        </div>
        <div
          className="tab-pane fade"
          id="nav-contacto"
          role="tabpanel"
          aria-labelledby="nav-contacto-tab"
        >
          <FormularioInformacionContanto
            misena_email={misena_email} setMisena_email={setMisena_email}
            institutionalEmail={institutionalEmail} setInstitutionalEmail={setInstitutionalEmail}
            phone={phone} setPhone={setPhone}
            phone_ip={phone_ip} setPhone_ip={setPhone_ip}
          />
        </div>
        <div
          className="tab-pane fade"
          id="nav-laboral"
          role="tabpanel"
          aria-labelledby="nav-laboral-tab"
        >
          <FormularioInformacionLaboral
            cargos={cargos}
            position={position} setPosition={setPosition}
            tiposContratos={tiposContratos}
            contractType={contractType} setContractType={setContractType}
            profession={profession} setProfession={setProfession}
            grade={grade} setGrade={setGrade}
          />
        </div>
        <div
          className="tab-pane fade"
          id="nav-otra"
          role="tabpanel"
          aria-labelledby="nav-otra-tab"
        >
          <FormularioOtraInformacion
            rols={rols} rol={rol} setRol={setRol}
            isBossArea={isBossArea} setIsBossArea={setIsBossArea}
            last_academic_level={last_academic_level} setLast_academic_level={setLast_academic_level}
            state={state} setState={setState}
          />
        </div>
        <div
          className="tab-pane fade"
          id="nav-contratos"
          role="tabpanel"
          aria-labelledby="nav-contratos-tab"
        >
          <FormularioContratros contratos={contratos} handleAlert={handleAlert} setContracts={setContracts} />
        </div>
        <div
          className="tab-pane fade"
          id="nav-zonas"
          role="tabpanel"
          aria-labelledby="nav-zonas-tab"
        >
          <FormularioZonas zones={zones} setZones={setZones}  alerta={handleAlert} />
        </div>
        <div
          className="tab-pane fade"
          id="nav-actividades"
          role="tabpanel"
          aria-labelledby="nav-actividades-tab"
        >
          <FormuarioOtrasActividades actividades={actividades} />
        </div>
      </div>
    </div>
  );
}

export default Tabs;
