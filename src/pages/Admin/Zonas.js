import React from 'react';
import Loader from './../../components/Loader';
import Navbar from './../../components/admin/Navbar';


class Zonas extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            loader: true
        }
    }

    render(){
        if(this.state.loader){
            return <Loader/>
        }else{
            return (
                <div>
                    <Navbar active="ubicaciones"/>
                </div>
            );
        }
    }

}

export default Zonas;