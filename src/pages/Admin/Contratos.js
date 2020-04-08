import React from 'react';

import Nabvar from '../../components/admin/Navbar';
import $ from 'jquery';
import Api from './../../components/Api';
import Crear from '../../components/admin/contratos/crear';



class Contratos extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            contratos: []
        }
    }

    async getContratos(){
        let datos = await Api('contracts', 'GET', sessionStorage.getItem('token'), '');
        if (datos === "jwt expired") {
            sessionStorage.removeItem('token');
            window.location.href = "/";
        }else if (datos === "jwt malformed") {
            sessionStorage.removeItem('token');
            window.location.href = "/";
        }        
        else {
            $('#tbl').DataTable().destroy();
            this.setState({contratos: datos});
        }
    }

    async componentDidMount(){
        await this.getContratos();
        console.log(this.state.contratos);
    }

    render() {
        return (
            <div>
                <Nabvar active="contratos" />
                <div className="container">
                    <div className="row justify-content-end mt-3">
                        <button className="btn btn-primary border mr-3" data-target="#crear" data-toggle="modal">Crear <i className="fas fa-plus"></i></button>
                    </div>
                    <div className="row mt-2">
                        <div className="table-responsive">

                        </div>
                    </div>
                </div>
                <Crear/>
            </div>
        )
    }

}

export default Contratos;