import React, { useState } from 'react';
import TagObligatorio from './../../../../../tagObligatorio';
import Select from 'react-select';
import Spinner from './../../../../../spinner';
import { useParams } from 'react-router-dom';
import DisableButtons from './../../../../../../helpers/DisableButton';
import handleMayus from './../../../../../../helpers/handleMayus';
import consumidor from './../../../../../../helpers/consumidor';
import $ from 'jquery';
import { validateInForm } from './../../../../../../helpers/validateInForm';


const dias = [
	{ label: 'Lunes', value: 'Lunes' },
	{ label: 'Martes', value: 'Martes' },
	{ label: 'Miércoles', value: 'Miércoles' },
	{ label: 'Jueves', value: 'Jueves' },
	{ label: 'Viernes', value: 'Viernes' },
	{ label: 'Sábado', value: 'Sábado' }
];

export const ModalCrear = ({ activitiesTypes, alerta, setOtrasActividades }) => {

	const { id } = useParams();
	const [spinner, setSpinner] = useState(false);
	const [datos, setDatos] = useState({
		name: '',
		typeActivityId: '',
		day: '',
		startDate: '',
		endDate: '',
		userId: id
	});
	const [typeActivity, setTypeActivity] = useState({
		label: 'Selecciona un tipo de actividad',
		value: ''
	});
	const [day, setDay] = useState({
		label: 'Selecciona un tipo de actividad',
		value: ''
	});

	const handleChange = e => setDatos({
		...datos,
		[e.target.name]: handleMayus(e.target.value)
	});

	const save = async () => {
		DisableButtons.setId('save-zone');
		DisableButtons.disable();
		setSpinner(true);
		validateInForm.setId('formNewOtherActivity');
		validateInForm.validLength(datos.name, 'name', 4, 255);
		validateInForm.validate(datos);

		if (validateInForm.isValid) {
			let response = await consumidor.post('otherActivities', datos);
			if (response) {
				if (response === 'Nueva actividad creada') {
					let datos = await consumidor.get(`users/${id}`);
					await setOtrasActividades(datos.otherActivity);
					alerta('success', response);
					$('#crearActividad').modal('hide');
					setDatos({
						name: '',
						typeActivityId: '',
						day: '',
						startDate: '',
						endDate: '',
						userId: id
					});
				} else {
					alerta('danger', response.message || response);
					$('#crearActividad').modal('hide');
				}
			} else {
				alerta('danger', 'Error al intentar enviar la información');
				$('#crearActividad').modal('hide');
			}
		}
		DisableButtons.enable();
		setSpinner(false);
	}

	return (
		<div
			className="modal fade"
			id="crearActividad"
			data-backdrop="static"
			data-keyboard="false"
			tabIndex="-1" role="dialog"
			aria-labelledby="crearActividadLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="crearActividadLabel">Agregar otra actividad</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body" id="formNewOtherActivity">
						<div className="form-group" data-name="name">
							<label htmlFor="name">Nombre <TagObligatorio /></label>
							<input type="text" name="name" className="form-control" placeholder="Nombre" onChange={e => handleChange(e)} value={datos.name} />
							<span className="text-danger"></span>
						</div>
						<div className="form-group" data-name="typeActiviyId" >
							<label htmlFor="typeActiviyId">Tipo de actividad <TagObligatorio /></label>
							<Select
								options={activitiesTypes}
								value={typeActivity}
								onChange={e => {
									setTypeActivity(e);
									setDatos({ ...datos, typeActivityId: e.value });
								}}
							/>
							<span className="text-danger"></span>
						</div>
						<div className="form-group" data-name="day">
							<label htmlFor="day">Día <TagObligatorio /></label>
							<Select
								options={dias}
								value={day}
								onChange={e => {
									setDay(e);
									setDatos({ ...datos, day: e.value });
								}}
							/>
							<span className="text-danger"></span>
						</div>
						<div className="form-group" data-name="startDate">
							<label htmlFor="startDate">Fecha Inicio <TagObligatorio /></label>
							<input type="date" name="startDate" className="form-control" placeholder="Fecha inicio" onChange={e => handleChange(e)} value={datos.startDate} />
							<span className="text-danger"></span>
						</div>
						<div className="form-group" data-name="endDate">
							<label htmlFor="endDate">Fecha Fin <TagObligatorio /></label>
							<input type="date" name="endDate" className="form-control" placeholder="Fecha fin" onChange={e => handleChange(e)} value={datos.endDate} />
							<span className="text-danger"></span>
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cerrar</button>
						<button
							type="button"
							className="btn btn-outline-success"
							id="save-zone"
							onClick={() => save()}
						>
							Crear <i className="ml-1 mr-1 fas fa-save mr-1"></i>
							<Spinner show={spinner} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
