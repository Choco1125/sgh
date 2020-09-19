/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import Spinner from './../../spinner';
import Select from 'react-select';
import consumidor from './../../../helpers/consumidor';
import disableButton from './../../../helpers/DisableButton';
import DisableButton from './../../../helpers/DisableButton';
import { validateInForm } from './../../../helpers/validateInForm';
import $ from 'jquery';

export default function crear({ alerta }) {
	const [spinner, setSpinner] = useState(false);
	const [datos, setDatos] = useState({
		startDate: "",
		endDate: "",
		trimester: "",
		groupId: "",
		municipalityId: "",
		isActive: false
	});
	const [grupos, setGrupos] = useState([]);
	const [group, setGroup] = useState({
		label: 'Selecciona un grupo',
		value: ''
	});
	const [municipios, setMunicipios] = useState([]);
	const [municipalities, setMunipalities] = useState({
		label: 'Selecciona un municipio',
		value: ''
	});

	const getGroups = async () => {
		let res = await consumidor.get('groups');
		if (res) {
			let data = [];
			res.groups.forEach(grupo => {
				data.push({
					label: `(${grupo.codeTab}) ${grupo.formationProgram.name}`,
					value: grupo.id
				});
			});
			setGrupos(data);
		}
	}

	const getMonicipalies = async () => {
		let res = await consumidor.get('municipalities');
		if (res) {
			let data = [];
			res.forEach(municipio => {
				data.push({
					label: municipio.name,
					value: municipio.id
				});
			});
			setMunicipios(data);
		}
	}

	const save = async () => {
		DisableButton.setId('btn-save');
		DisableButton.disable();
		setSpinner(true);
		validateInForm.setId('form-crear');
		validateInForm.validLength(datos.trimester, 'trimester', 1, 2);
		validateInForm.isNumber(datos.trimester, 'trimester');
		validateInForm.validate({
			startDate: datos.startDate,
			endDate: datos.endDate,
			trimester: datos.trimester,
			groupId: datos.groupId,
			municipalityId: datos.municipalityId
		});

		if (validateInForm.isValid) {
			let res = await consumidor.post('programations', datos);
			if (res.message === "Nueva programacion creada") {
				setDatos({
					startDate: "",
					endDate: "",
					trimester: "",
					groupId: "",
					municipalityId: "",
					isActive: false
				});
				setGroup({
					label: "Selecciona un grupo",
					value: ""
				});
				setMunipalities({
					label: "Selecciona un municipio",
					value: ""
				});
				$('#crear').modal('hide');
				alerta(res.message, 'success');
			} else {
				$('#crear').modal('hide');
				alerta(res.message, 'danger');
			}
		}
		disableButton.enable();
		setSpinner(false);
		validateInForm.isValid = true;
	}

	useEffect(() => {
		const init = async () => {
			await getGroups();
			await getMonicipalies();
		}
		init();
	}, []);

	return (
		<div
			className="modal fade"
			id="crear"
			data-backdrop="static"
			role="dialog"
			aria-labelledby="crearLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="crearLabel">
							Crear progración
            </h5>
						<button
							type="button"
							className="close" data-dismiss="modal"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body" id="form-crear">
						<span className="font-weight-lighter">
							Los campos con
              <i className="text-danger">*</i>
              son obligatorios
            </span>
						<div className="form-group mt-1" data-name="startDate">
							<label htmlFor="fecha_inicio">
								Fecha inicio
                <span className="text-danger">*</span>
							</label>
							<input
								name="fecha_inicio"
								type="date"
								className="form-control"
								onChange={(e) => setDatos({
									...datos,
									startDate: e.target.value
								})}
								value={datos.startDate}
							/>
							<span className="text-danger" />
						</div>
						<div className="form-group mt-1" data-name="endDate">
							<label htmlFor="fecha_fin">
								Fecha fin
                <span className="text-danger">*</span>
							</label>
							<input
								name="fecha_fin"
								type="date" className="form-control"
								onChange={(e) => setDatos({
									...datos,
									endDate: e.target.value
								})}
								value={datos.endDate}

							/>
							<span className="text-danger" />
						</div>
						<div className="form-group mt-1" data-name="trimester">
							<label htmlFor="trimester">
								Trimestre
                <span className="text-danger">*</span>
							</label>
							<input
								name="trimester"
								type="number"
								className="form-control"
								placeholder="Trimestre"
								maxLength="1"
								min="1"
								onChange={(e) => setDatos({
									...datos,
									trimester: e.target.value
								})}
								value={datos.trimester}
							/>
							<span className="text-danger" />
						</div>
						<div className="form-group mt-1" data-name="groupId">
							<label htmlFor="groupId">
								Grupo
                <span className="text-danger">*</span>
							</label>
							<Select
								options={grupos}
								value={group}
								onChange={e => {
									setGroup(e);
									setDatos({
										...datos,
										groupId: e.value
									});
								}
								}
							/>
							<span className="text-danger" />
						</div>
						<div className="form-group mt-1" data-name="municipalityId">
							<label htmlFor="municipalityId">
								Municipio
                <span className="text-danger">*</span>
							</label>
							<Select
								options={municipios}
								value={municipalities}
								onChange={
									e => {
										setMunipalities(e);
										setDatos({
											...datos,
											municipalityId: e.value
										});
									}
								}
							/>
							<span className="text-danger" />
						</div>
						<div className="form-group" id="isActive">
							<div className="custom-control custom-switch">
								<input
									type="checkbox"
									className="custom-control-input"
									id="active"
									checked={datos.isActive}
									onChange={() => setDatos({
										...datos,
										isActive: !datos.isActive
									})
									}
								/>
								<label className="custom-control-label" htmlFor="active">Activo</label>
							</div>
						</div>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-outline-secondary"
							data-dismiss="modal"
						>
							Cerrar
            </button>
						<button
							type="button"
							className="btn btn-outline-success"
							id="btn-save"
							onClick={() => save()}
						>
							Crear <i className="fas fa-save"></i> <Spinner show={spinner} />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
