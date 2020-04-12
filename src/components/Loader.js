import React from 'react';

import './css/loader.css';
import Logo from './../assets/logo.png';


const Loader = () =>(
    <div className="loader">
        <img src={Logo} alt="logo"/>
    </div>
);

export default Loader;

