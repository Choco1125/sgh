import React from 'react';
import Spinner from '../../spinner';
import { useState } from 'react';
import Tabs from './tabs/tabs';
import disabledButton from './../../../helpers/DisableButton';
import validator from '../../../helpers/validator';
import consumidor from '../../../helpers/consumidor';
import $ from 'jquery';

const Crear = ({cargos, tiposContratos, rols, alerta, update})=>{

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
        label: '', value: ''
    });
    const [contractType, setContractType] = useState({
        label: '', value: ''
    });
    const [profession, setProfession] = useState("");
    const [grade, setGrade] = useState("");

    //-----------------  Laboral  ----------------//
    const [rol, setRol] = useState({
        label: '', value: ''
    })
    const [isBossArea, setIsBossArea] = useState(false);
    const [last_academic_level, setLast_academic_level] = useState("");

    const save = async () => {
        setSpinner(true);
        disabledButton.setId('btn-guardar');
        disabledButton.disable();

        let PreSend = {
            username: username,
            document: document,
            birthdate: birthdate,
            misena_email: misena_email,
            institutional_email: institutionalEmail,
            phone_ip: phone_ip,
            phone: phone,
            positionId: position,
            contractTypeId: contractType,
            porfession: profession,
            grade: grade,
            rolId: rol,
            last_academic_level: last_academic_level
        }

        if(validator.validarDatos(PreSend)){
            let datos = {
                username: username,
                misena_email: misena_email,
                institutional_email: institutionalEmail,
                document: document,
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
                last_academic_level: last_academic_level
            }

            console.log(datos);

            let respuesta = await consumidor.post('users',datos);
            if(respuesta === 'Nuevo usuario creado'){
                await update();
                $('#crear').modal('hide');
                alerta('success',respuesta);
            }else{
                $('#crear').modal('hide');
                alerta('danger',"Error del servidor");
                console.log(respuesta)
            }
        }

        setSpinner(false);
        disabledButton.enable();
    }

    return(
        <div className="modal fade" id="crear" data-backdrop="static" role="dialog"
            aria-labelledby="crearLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="crearLabel">
                            Crear usuario
                            </h5>
                        <button type="button" className="close" data-dismiss="modal"
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form id="formulario-crear" onSubmit={e => e.preventDefault()}>
                        <div className="modal-body">
                            <div className="form-group mt-1 mb-2">
                                <span className="font-weight-lighter">
                                        Los campos con 
                                        <i className="text-danger">*</i> 
                                        son obligatorios
                                </span>
                            </div>
                                <Tabs 
                                    cargos = {cargos} 
                                    tiposContratos = {tiposContratos} 
                                    rols={rols}
                                    username = {username} setUsername = {setUsername}
                                    document = {document} setDocument = {setDocument}
                                    birthdate = {birthdate} setBirthdate = {setBirthdate}
                                    gender = {gender} setGender = {setGender}
                                    misena_email = {misena_email} setMisena_email = {setMisena_email}
                                    institutionalEmail = {institutionalEmail} setInstitutionalEmail = {setInstitutionalEmail}
                                    phone_ip = {phone_ip} setPhone_ip = {setPhone_ip}
                                    phone = {phone} setPhone = {setPhone}
                                    position = {position} setPosition = {setPosition}
                                    contractType = {contractType} setContractType = {setContractType}
                                    profession = {profession} setProfession = {setProfession}
                                    grade = {grade} setGrade = {setGrade}
                                    rol = {rol} setRol = {setRol}
                                    isBossArea = {isBossArea} setIsBossArea = {setIsBossArea}
                                    last_academic_level = {last_academic_level} setLast_academic_level = {setLast_academic_level}
                                />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button" className="btn btn-outline-secondary"
                                data-dismiss="modal"
                            >
                                Cerrar
                                </button>
                            <button type="button"
                                className="btn btn-outline-success"
                                onClick = {() => save()}
                                id="btn-guardar"
                            >
                                Crear <i className="ml-1 mr-1 fas fa-save"></i>
                                <Spinner show={spinner} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Crear;