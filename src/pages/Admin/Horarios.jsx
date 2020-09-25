import React, { useState } from 'react';
import Loader from '../../components/Loader';
import Navbar from '../../components/admin/Navbar';
import { Breadcrumb } from '../../components/Breadcrumb';

export default function Horarios() {

  const [loader, setLoader] = useState(false);

  const routes = [
    {
      name: 'Inicio',
      link: '/coordinador/',
      isLink: true
    },
    {
      name: 'Horarios',
      link: '/coordinador/horarios',
      isLink: true
    },
    {
      name: 'Horarios',
      link: '',
      isLink: false
    },
  ];

  if (loader) {
    return <Loader />
  } else {
    return (
      <div>
        <Navbar active="programacion" />
        <div className="container">
          <div className="row justify-content-between mt-3">
            <div>
              <Breadcrumb routes={routes} />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}
