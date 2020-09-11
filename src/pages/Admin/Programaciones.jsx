import React, { useState } from 'react';
import Loader from './../../components/Loader';
import Navbar from './../../components/admin/Navbar';

export default function Programaciones() {
  const [loader, setLoader] = useState(true);

  if (loader) {
    return <Loader />
  } else {
    return (
      <div>
        <Navbar active="programaciones" />
      </div>
    );
  }
}