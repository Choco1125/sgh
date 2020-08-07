import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import consumidor from "../../../../helpers/consumidor";
import Loader from "../../../Loader";
import Nabvar from "../../Navbar";
import Tabs from "./tabs/tabs";
import $ from 'jquery';
import Alert from './../../../Alert';
import Spinner from "../../../spinner";
import DisableButton from "../../../../helpers/DisableButton";
import validator from "../../../../helpers/validator";
import { Breadcrumb } from "../../../Breadcrumb";

const API_LINK = 'https://cronode.herokuapp.com/'

const routes = [
  {
    name: 'Coordinador',
    link: '/coordinador/',
    isLink: true
  },
  {
    name: 'Usuarios',
    link: '/coordinador/usuarios',
    isLink: true
  },
  {
    name: 'Editar usuario',
    link: '',
    isLink: false
  }
];

const EditarUserPage = () => {
  const [spinner, setSpinner] = useState(false);

  const [loader, setLoader] = useState(true);
  const [cargos, setCargos] = useState([{}]);
  const [tiposContratos, setTiposContratos] = useState([{}]);
  const [rols, setRols] = useState([{}]);

  //-----------------  Personal  ----------------//
  const [username, setUsername] = useState("");
  const [documento, setDocument] = useState("");
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
  }); const [isBossArea, setIsBossArea] = useState(false);
  const [last_academic_level, setLast_academic_level] = useState("");
  const [state, setState] = useState('Active');

  const [lostFocusMainTab, setLostFocusMainTab] = useState(false);

  const [contracts, setContracts] = useState([]);

  const [otherActivity, setOtherActivity] = useState([]);
  const [zones, setZones] = useState([]);

  const { id } = useParams();

  const [alerta, setAlerta] = useState({
    tipo: '',
    msj: '',
    show: false
  });

  const [photo, setPhoto] = useState("");

  const [havePhoto, setHavePhoto] = useState(false);

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


  const handleAlert = (tipo, msj) => {
    setAlerta({
      tipo,
      msj,
      show: true
    });

    setTimeout(() => setAlerta({
      tipo: '',
      msj: '',
      show: false
    }), 2000);
  }

  const changePhoto = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      setPhoto(reader.result)
      setHavePhoto(true);
    }
  }

  let history = useHistory();

  const save = async () => {
    DisableButton.setId('user-update-data');
    DisableButton.disable();
    setSpinner(true);
    let preSend = {
      username: username,
      document: documento,
      birthdate: birthdate,
      misena_email: misena_email,
      institutional_email: institutionalEmail,
      phone_ip: phone_ip,
      phone: phone,
      positionId: position,
      contractTypeId: contractType,
      porfession: profession,
      rolId: rol,
      last_academic_level: last_academic_level
    }
    if (validator.validarDatos(preSend)) {
      let datos = {
        username: username,
        misena_email: misena_email,
        institutional_email: institutionalEmail,
        document: documento,
        birthdate: birthdate,
        phone: phone,
        phone_ip: phone_ip,
        gender: gender,
        positionId: position.value,
        rolId: rol.value,
        contractTypeId: contractType.value,
        porfession: profession,
        grade: grade,
        isBossArea: isBossArea,
        last_academic_level: last_academic_level,
        state: state
      }
      let respuesta = await consumidor.put('users', id, datos);
      if (respuesta) {
        if (respuesta === 'Usuario actualizado') {
          if (havePhoto) {
            let formData = new FormData();
            let foto = document.getElementById('customFile');
            formData.append('photo', foto.files[0]);
            let res = await consumidor.sendFile('users', id, 'PUT', formData);
            if (!res) {
              alerta('danger', 'No se pudo subir la foto');
            }
          }
          handleAlert('success', respuesta);
          setHavePhoto(false);
        } else {
          alerta('danger', "Error del servidor");
          console.log(respuesta)
        }
      } else {
        handleAlert('danger', 'Danger error con el servidor, vuelve a intentarlo más tarde')
      }

    } else {
      handleAlert('warning', 'Revisa las categorías y llena los campos necesarios');
    }
    setSpinner(false);
    DisableButton.enable();
  }

  useEffect(() => {
    async function getInfo() {
      await getCargos();
      await getTiposContrato();
      await getRols();
      let datos = await consumidor.get(`users/${id}`);
      if (datos !== 'Usuario no encontrado') {
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
        setContracts(datos.contract);
        setOtherActivity(datos.otherActivity);
        setPhoto(datos.photo ? `${API_LINK}${datos.photo}` : "https://image.freepik.com/vector-gratis/sigueme-diseno-tematica-social-empresarial_24877-50426.jpg");
      } else {
        history.push('/coordinador/usuarios');
      }
    }
    getInfo();
  }, [id, history]);

  return loader ? (
    <Loader />
  ) : (
      <div>
        <Nabvar active="usuarios" />
        <div className="container">
          <div className="row mt-3">
            <div>
              <Breadcrumb routes={routes} />
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-lg-3 col-md-4 mb-2">
              <img
                src={photo}
                alt="User"
                style={{
                  height: 250,
                  width: '100%',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  $('#customFile').trigger('click');
                }}
                id="user-photo"
              />
              <div className="custom-file mt-2 d-none">
                <input type="file" className="custom-file-input" id="customFile" onChange={(e) => changePhoto(e)} accept="image/*" />
                <label className="custom-file-label" htmlFor="customFile">Selecciona una foto</label>
              </div>
              {
                !lostFocusMainTab ?
                  <div></div> :
                  <div className="card card-body border-0">
                    <h4 className="card-title">{username}</h4>
                    <h5 className="card-text mt-0 mb-0">{documento}</h5>
                    <h6 className="card-text mt-0 mb-0">{rol.label}</h6>
                  </div>

              }
              <div className="row justify-content-center mt-2 mb-1">
                <button className="btn btn-outline-success col-11"
                  id="user-update-data"
                  onClick={() => save()}
                >
                  Guardar <Spinner show={spinner} />
                </button>
              </div>
            </div>
            <div className="col-lg-7">
              <Tabs
                cargos={cargos}
                tiposContratos={tiposContratos}
                rols={rols}
                username={username}
                setUsername={setUsername}
                document={documento}
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
                setContracts={setContracts}
                actividades={otherActivity}
                setOtherActivity={setOtherActivity}
                setLostFocusMainTab={setLostFocusMainTab}
                handleAlert={handleAlert}
                setZones={setZones}
              />
            </div>
          </div>
          <Alert {...alerta} />
        </div>
      </div>
    );
};

export default EditarUserPage;
