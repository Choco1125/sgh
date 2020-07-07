import React from 'react';
import Spinner from './../../spinner';
import $ from 'jquery';
import Api from './../../Api';


class Crear extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showSpinner: false,
            datos: {
                code: '',
                name: '',
                formationTypeId:'',
                isRegisterQualified: false,
                isRegisterQualifiedDate: ''
            },
            formationType:[]
        }
    }

    changeQualifiqued() {
        this.setState({
            datos: {
                ...this.state.datos,
                isRegisterQualified: !this.state.datos.isRegisterQualified
            }
        });
    }

    agregarError(elemento, msj) {
        elemento.children[1].classList.add('is-invalid');
        elemento.children[2].innerHTML = msj;
        elemento.children[1].focus();

        elemento.addEventListener('change', () => {
            elemento.children[1].classList.remove('is-invalid');
            elemento.children[2].innerHTML = '';
        });
    }

    handleChange(e) {
        this.setState({
            datos: {
                ...this.state.datos,
                [e.target.name]: e.target.value.toLowerCase().charAt(0).toUpperCase() + e.target.value.slice(1)
            }
        });
    }

    async getformationType(){
        let datos = await Api('/formationProgramTypes','GET',sessionStorage.getItem('token'),'');

        this.setState({
            formationType: datos
        });

    }

    async save(){
        this.setState({showSpinner: true});
        if(this.state.datos.code !== ''){
            if(this.state.datos.name !== ''){
                if(this.state.datos.formationTypeId !== ''){
                    try{
                        let datos = await Api('formationPrograms','POST',sessionStorage.getItem('token'),this.state.datos);
                        if(datos=== 'Nuevo programa de formacion creado'){
                            await this.props.update();
                            $('#crear').modal('hide');
                            this.props.alerta(datos,'success');
                            this.setState({
                                datos:{
                                    code: '',
                                    name: '',
                                    formationTypeId:'',
                                    isRegisterQualified: false,
                                    isRegisterQualifiedDate: ''
                                }
                            });
                        }else if(datos.message === 'Este programa de formacion ya existe'){
                            this.agregarError(document.getElementById('name'),datos.message);
                        }else{
                            console.log(datos)
                        }
                    }catch(err){
                        this.props.alerta(err,'danger');
                    }
                }else{
                    this.agregarError(document.getElementById('formationTypeId'),'Debes llenar este campo');
                }
            }else{
                this.agregarError(document.getElementById('name'),'Debes llenar este campo');
            }
        }else{
            this.agregarError(document.getElementById('code'),'Debes llenar este campo');
        }
        this.setState({showSpinner: false});
    }


    async componentDidMount() { 
        $('[data-toggle="tooltip"]').tooltip();
        await this.getformationType();
    }

    render() {
        return (
            <div className="modal fade" id="crear" data-backdrop="static" role="dialog" aria-labelledby="crearLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="crearLabel">Crear programa de formación</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <span className="font-weight-lighter">Los campos con <i className="text-danger">*</i> son obligatorios</span>
                            <div className="form-group mt-1" id="code">
                                <label htmlFor="code">Código
                                    <span className="text-danger">*</span>
                                    <button className="btn btn-sm" data-toggle="tooltip" data-placement="right" title="Corresponde al código y la versión del programa de formación"><i className="fas fa-question-circle"></i></button>
                                </label>
                                <input name="code" type="text" className="form-control" placeholder="Código del programa" 
                                    value={this.state.datos.code}
                                    onChange={(e)=> this.handleChange(e)}
                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group" id="name">
                                <label htmlFor="name">Name
                                    <span className="text-danger">*</span>
                                </label>
                                <input name="name" type="text" className="form-control" placeholder="Nombre del programa" 
                                    value={this.state.datos.name}
                                    onChange={(e)=> this.handleChange(e)}
                                />
                                <span className="text-danger"></span>

                            </div>
                            <div className="form-group" id="formationTypeId">
                                <label htmlFor="formationTypeId">Tipo de formación
                                    <span className="text-danger">*</span>
                                </label>
                                <select className="custom-select" name="formationTypeId" 
                                    value={this.state.datos.formationTypeId}
                                    onChange={(e)=> this.handleChange(e)}
                                >
                                    <option>Selecciona un tipo de formación</option>
                                    {
                                        this.state.formationType.map(opcion =>
                                            <option key ={opcion.id} value={opcion.id}>{opcion.name}</option>    
                                        )
                                    }
                                </select>
                                <span className="text-danger"></span>

                            </div>
                            <div className="form-group" id="isRegisterQualified">
                                <div className="custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input" id="switch1" checked={this.state.datos.isRegisterQualified} onChange={() => this.changeQualifiqued()}/>
                                    <label className="custom-control-label" htmlFor="switch1" onClick={() => this.changeQualifiqued()}>Registro calificado</label>
                                </div>
                            </div>
                            {
                                this.state.datos.isRegisterQualified ?
                                    <div className="form-group" id="isRegisterQualifiedDate">
                                        <label htmlFor="isRegisterQualifiedDate">Fecha registro calificado</label>
                                        <input name="isRegisterQualifiedDate" type="date" className="form-control" placeholder="Código del programa" 
                                            value={this.state.datos.isRegisterQualifiedDate}
                                            onChange={(e)=> this.handleChange(e)}    
                                        />
                                    </div>
                                    :
                                    <></>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-outline-success" onClick={()=> this.save() } >Crear <i className="fas fa-save"></i> <Spinner show={this.state.showSpinner} /></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Crear;