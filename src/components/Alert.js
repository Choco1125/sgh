import React from 'react';
import './css/alert.css';

const Alert = ({show,tipo,msj})=>{
    if(show){
        return (
            <div className={`alert alert-${tipo} alert-dismissible fade show`} role="alert">
                {msj}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }else{
        return <div></div>
    }
}

export default Alert;