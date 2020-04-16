import React from 'react';

import Nabvar from '../../components/admin/Navbar';
import $ from 'jquery';
import Api from './../../components/Api';
import Crear from '../../components/admin/contratos/crear';
import Alert from './../../components/Alert';
import Contrato from '../../components/admin/contratos/contrato';
import Editar from '../../components/admin/contratos/editar';
import Delete from '../../components/admin/contratos/delete';
import Loader from './../../components/Loader';


class Contratos extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            contratos: [],
            alert:{
                show: false,
                msj: '',
                tipo: ''
            },
            edit:{
                id:0,
                name: ''
            },
            spinner:{
                show: false
            },
            delete:{
                id:0
            },
            loader: true
        }
    }

    getContratos = async ()=>{
        let datos = await Api('contractTypes', 'GET', sessionStorage.getItem('token'), '');
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

    setEdit = (name,id)=>{
        this.setState({
            edit:{
                id: id,
                name: name
            }
        });
    }

    setDelete =  id=>{
        this.setState({
            delete:{
                id: id,
            }
        });
    }

    handleAlert = (msj,tipo) => {
        this.setState({
            alert:{
                show: true,
                msj: msj,
                tipo: tipo
            }
        });
        setTimeout(()=> this.setState({ alert:{show: false} }), 2000 );
    }

    handleChange= (e)=> {
        this.setState({
            edit: {
                ...this.state.edit,
                [e.target.name]: e.target.value.toLowerCase().charAt(0).toUpperCase() + e.target.value.slice(1)
            }
        });
    }

    agregarError(elemento, msj) {
        elemento.children[1].classList.add('is-invalid');
        elemento.children[2].innerHTML = msj;
        elemento.children[1].focus();

        elemento.addEventListener('keypress', () => {
            elemento.children[1].classList.remove('is-invalid');
            elemento.children[2].innerHTML = '';
        });
    }   


    update = async() => {
        this.setState({spinner:{ show: true}});
        if (this.state.edit.name !== '') {
            try {
                let datos = await Api(`contractTypes/${this.state.edit.id}`,'PUT',sessionStorage.getItem('token'),this.state.edit);
                console.log(datos);
                if(datos === 'Tipo de contrato actualizado'){
                    await this.getContratos();
                    $('#editar').modal('hide');
                    this.handleAlert(datos,'success');
                }else if(datos === 'Tipo de contrato ya existente'){
                    this.agregarError(document.getElementById('name_edit'), datos);
                }else{
                    console.log(datos);
                }
            } catch (error) {
                console.error(error);
                this.handleAlert(error,'danger');
            }
        } else {
            this.agregarError(document.getElementById('name_edit'), 'Debes ingresar un nombre');
        }
        this.setState({spinner:{ show: false}});

    }

    async componentDidMount(){
        await this.getContratos();
        this.setState({
            loader: false
        });
    }

    render() {
        if(this.state.loader){
            return <Loader/>
        }else{
            return (
                <div>
                    <Nabvar active="contratos" />
                    <div className="container">
                        <div className="row justify-content-end mt-3">
                            <button className="btn btn-primary border mr-3" data-target="#crear" data-toggle="modal">Crear <i className="fas fa-plus"></i></button>
                        </div>
                        <div className="row mt-2 justify-content-center">
                            {
                                this.state.contratos.map((contrato,i) => <Contrato key={i} nombre={contrato.name} id={contrato.id} edit={this.setEdit} delet={this.setDelete}/> )
                            }
                        </div>  
                    </div>
                    <Crear alerta={this.handleAlert} update ={this.getContratos}/>
                    <Editar handleChange= {this.handleChange} save={this.update} datos={this.state.edit} showSpinner={this.state.spinner.show}/>
                    <Alert show={this.state.alert.show} msj={this.state.alert.msj} tipo={this.state.alert.tipo}/>
                    <Delete id={this.state.delete.id} update={this.getContratos} alerta={this.handleAlert}/>
                </div>
            )
        }
    }

}

export default Contratos;