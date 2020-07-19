import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import consumidor from "../../../../helpers/consumidor";
import Loader from "../../../Loader";
import Nabvar from "../../Navbar";
import Tabs from "./tabs/tabs";
import $ from 'jquery';



const EditarUserPage = () => {
  const [loader, setLoader] = useState(true);
  const [cargos, setCargos] = useState([{}]);
  const [tiposContratos, setTiposContratos] = useState([{}]);
  const [rols, setRols] = useState([{}]);

  const [spinner, setSpinner] = useState(false);
  //-----------------  Personal  ----------------//
  const [username, setUsername] = useState("");
  const [document, setDocument] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");

  //-----------------  Contacto  ----------------//
  const [misena_email, setMisena_email] = useState("");
  const [institutionalEmail, setInstitutionalEmail] = useState("");
  const [phone_ip, setPhone_ip] = useState("");
  const [phone, setPhone] = useState("");

  //-----------------  Laboral  ----------------//
  const [position, setPosition] = useState({
    label: "",
    value: "",
  });
  const [contractType, setContractType] = useState({
    label: "",
    value: "",
  });
  const [profession, setProfession] = useState("");
  const [grade, setGrade] = useState("");

  //-----------------  Otra  ----------------//
  const [rol, setRol] = useState({
    label: "",
    value: "",
  });
  const [isBossArea, setIsBossArea] = useState(false);
  const [last_academic_level, setLast_academic_level] = useState("");
  const [state, setState] = useState('Active');

  const [lostFocusMainTab, setLostFocusMainTab] = useState(false);

  const [contracts, setContracts] = useState([
    {
      id: 1,
      name: 'Test',
      description: 'Contrato de pruebas',
      startDate: '2020-07-10T20:22:00Z',
      endDate: '2021-07-10T20:22:00Z',
    },
    {
      id: 2,
      name: 'Test 2',
      description: 'Contrato de pruebas 2',
      startDate: '2020-07-10T20:22:00Z',
      endDate: '2021-07-10T20:22:00Z',
    },
    {
      id: 3,
      name: 'Test 3',
      description: 'Contrato de pruebas',
      startDate: '2020-07-10T20:22:00Z',
      endDate: '2021-07-10T20:22:00Z',
    }
  ]);

  const [otherActivity, setOtherActivity] = useState([
    {
      name: "Actividad 1",
      day: 'Lunes',
      startDate: '2020-07-10T20:22:00Z',
      endDate: '2021-07-10T20:22:00Z'
    },
    {
      name: "Actividad 2",
      day: 'Martes',
      startDate: '2020-07-10T20:22:00Z',
      endDate: '2021-07-10T20:22:00Z'
    },
    {
      name: "Viernes 3",
      day: 'Lunes',
      startDate: '2020-07-10T20:22:00Z',
      endDate: '2021-07-10T20:22:00Z'
    }
  ]);
  const [zones, setZones] = useState([]);

  const { id } = useParams();

  const manejarFecha = (fecha) => {
    let arregloFechas = fecha.split("T");
    return arregloFechas[0];
  };

  const getCargos = async () => {
    let datos = await consumidor.get("positions");
    let cargosArr = [];
    if (datos) {
      datos.map((cargo) =>
        cargosArr.push({
          label: cargo.name,
          value: cargo.id,
        })
      );
      setCargos(cargosArr);
    }
  };

  const getTiposContrato = async () => {
    let datos = await consumidor.get("contractTypes");
    if (datos) {
      let cargosArr = [];
      datos.map((cargo) =>
        cargosArr.push({
          label: cargo.name,
          value: cargo.id,
        })
      );
      setTiposContratos(cargosArr);
    }
  };

  const getRols = async () => {
    let datos = await consumidor.get("contractTypes");
    if (datos) {
      let rolsArr = [];
      datos.map((rol) =>
        rolsArr.push({
          label: rol.name,
          value: rol.id,
        })
      );
      setRols(rolsArr);
    }
  };

  useEffect(() => {
    async function getInfo() {
      await getCargos();
      await getTiposContrato();
      await getRols();
      let datos = await consumidor.get(`users/${id}`);
      setLoader(false);
      setUsername(datos.username);
      setDocument(datos.document);
      setBirthdate(manejarFecha(datos.birthdate));
      setGender(datos.gender);
      setMisena_email(datos.misena_email);
      setInstitutionalEmail(datos.institutional_email);
      setPhone_ip(datos.phone_ip);
      setPhone(datos.phone);
      setPosition({ label: datos.position.name, id: datos.position.id });
      setContractType({
        label: datos.contractType.name,
        id: datos.contractType.id,
      });
      setProfession(datos.profession);
      setGrade(datos.grade);
      setRol({ label: datos.rol.name, value: datos.rol.id });
      setIsBossArea(datos.isBossArea);
      setLast_academic_level(datos.last_academic_level);
      setZones(datos.zones);
      setState(datos.state);
      // setContracts(datos.contract);
      // setOtherActivity(datos.otherActivity);
    }
    getInfo();
  }, [id]);
  return loader ? (
    <Loader />
  ) : (
      <div>
        <Nabvar active="usuarios" />
        <div className="container">
          <div className="row mt-3">
            <div className="col-lg-3">
              <img
                src="https://image.freepik.com/vector-gratis/sigueme-diseno-tematica-social-empresarial_24877-50426.jpg"
                alt="User"
                style={{
                  height: 250,
                  cursor: 'pointer'
                }}
                onClick={() => $('#customFile').trigger('click')}
              />
              <div className="custom-file mt-2 d-none">
                <input type="file" className="custom-file-input" id="customFile" onChange={(e) => console.log(e.target.files[0])} accept="image/*" />
                <label className="custom-file-label" htmlFor="customFile">Selecciona una foto</label>
              </div>
              {
                !lostFocusMainTab ?
                  <div></div> :
                  <div className="card card-body border-0">
                    <h4 className="card-title">{username}</h4>
                    <h5 className="card-text mt-0 mb-0">{document}</h5>
                    <h6 className="card-text mt-0 mb-0">{rol.label}</h6>
                  </div>

              }
            </div>
            <div className="col-lg-7">
              <Tabs
                cargos={cargos}
                tiposContratos={tiposContratos}
                rols={rols}
                username={username}
                setUsername={setUsername}
                document={document}
                setDocument={setDocument}
                birthdate={birthdate}
                setBirthdate={setBirthdate}
                gender={gender}
                setGender={setGender}
                misena_email={misena_email}
                setMisena_email={setMisena_email}
                institutionalEmail={institutionalEmail}
                setInstitutionalEmail={setInstitutionalEmail}
                phone_ip={phone_ip}
                setPhone_ip={setPhone_ip}
                phone={phone}
                setPhone={setPhone}
                position={position}
                setPosition={setPosition}
                contractType={contractType}
                setContractType={setContractType}
                profession={profession}
                setProfession={setProfession}
                grade={grade}
                setGrade={setGrade}
                rol={rol}
                setRol={setRol}
                isBossArea={isBossArea}
                setIsBossArea={setIsBossArea}
                last_academic_level={last_academic_level}
                setLast_academic_level={setLast_academic_level}
                zones={zones}
                state={state} setState={setState}
                contratos={contracts}
                actividades={otherActivity}
                setLostFocusMainTab={setLostFocusMainTab}
              />
            </div>
          </div>
        </div>
      </div>
    );
};

export default EditarUserPage;
