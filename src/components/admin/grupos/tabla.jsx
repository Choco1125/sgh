import React, { useState } from 'react';
import Eliminar from './eliminar';

const Tabla = ({grupos,update, alerta})=>{

    //States--------------------------------------------------------
    const [id, setId] = useState('');
    const [codeTab, setCodeTab] = useState('');
    const [modalidad, setModalidad] = useState({
        label: '',
        value: ''
    });
    const [quantityLearners, setQuantityLearners] = useState(0);
    const [activeLearners, setActiveLearners] = useState(0);
    const [electiveStartDate, setElectiveStartDate] = useState('');
    const [electiveEndDate, setElectiveEndDate] = useState('');
    const [practiceStartDate, setPracticeStartDate] = useState('');
    const [practiceEndDate, setPracticeEndDate] = useState('');
    const [managerId, setManagerId] = useState({
        label: '',
        value: ''
    });
    const [offer, setOffer] = useState('');
    const [formationProgramId, setFormationProgramId] = useState({
        label: '',
        value: ''
    });
    const [groupState, setGroupState] = useState('Active');
    const [learnerId, setLearnerId] = useState({
        label: '',
        value: ''
    });
    //---------------------------------------------------------------
    return(
        <>
            <table className="table table-sm text-center" id="tbl">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Programa</th>
                        <th>Jefe de grupo</th>
                        <th>Modalidad</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        grupos.map(grupo =>
                            <tr key={grupo.id}>
                                <td>{grupo.codeTab}</td>
                                <td>{grupo.formationProgram.name}</td> 
                                <td>{grupo.manager.username}</td> 
                                <td>{grupo.modality.name}</td> 
                                <td className="align-items-center">
                                    <span className="d-lg-inline btn btn-outline-success btn-sm mt-1 col-6 col-md-6 btn-middle"
                                        data-target="#editar"
                                        data-toggle="modal"
                                        onClick={()=>console.log(grupo)}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </span>
                                    <span> </span>
                                    <span className="d-lg-inline btn btn-outline-danger btn-sm mt-1 col-6 col-md-6 btn-middle"
                                        data-target="#eliminar"
                                        data-toggle="modal"
                                        onClick={()=>setId(grupo.id)}
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </span>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <Eliminar
                id= {id}
                update = {update}
                alerta = {alerta}
            />
        </>
    );
}

export default Tabla;