import React from 'react';

const Spinner = ({show})=>{
    if(show){
        return <div className="spinner-border spinner-border-sm"></div>;
    }else{
        return <div></div>;
    }
}

export default Spinner;