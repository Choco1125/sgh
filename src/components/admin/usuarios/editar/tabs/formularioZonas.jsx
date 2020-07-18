import React from 'react'

const CardZona = ({ name }) => (
  <div className="card card-body col-12 mt-2 mb-2">
    <h5 className="card-title">{name}</h5>
  </div>
);

export const FormularioZonas = ({ zones }) => {
  return (
    <div className="justify-content-around mt-3">
      {
        zones.map(zone => <CardZona name={zone.name} key={zone.id} />)
      }
    </div>
  )
}
