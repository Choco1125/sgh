import React from 'react';

const form = ()=>
    <div>
        <span className="font-weight-lighter">
            Los campos con <i className="text-danger">*</i> son obligatorios
        </span>

        <div className="form-group" id="name">
            <label htmlFor="name">
                Nombre <span className="text-danger">*</span>
            </label>
            <input name="name" type="text"
                className="form-control"
                placeholder="Nombre de la razón de desprogramación"
                maxLength="255"
            />
            <span className="text-danger"></span>
        </div>

        <div className="form-group" id="observations">
            <label htmlFor="observations">
                Observación
            </label>
            <input name="observations" type="text"
                className="form-control"
                placeholder="Observación de la razón de desprogramación"
                maxLength="255"
            />
            <span className="text-danger"></span>
        </div>

        <div className="form-group" id="type">
            <label htmlFor="type">
                Tipo
            </label>
            <input name="type" type="text"
                className="form-control"
                placeholder="Tipo de razón de desprogramación"
                maxLength="255"
            />
            <span className="text-danger"></span>
        </div>
    </div>