import React from 'react';
import Api from './../../Api';
import $ from 'jquery';
import Spinner from '../../spinner';

class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            description: '',
            summary: '',
            hours: '',
            erroDescrip: '',
            msjDes: '',
            erroResu: '',
            msjResu: '',
            showSpinner: false
        };
    }
    componentDidMount(){
        $('[data-toggle="tooltip"]').tooltip();
    }
    //Setters
    setCode = valor => this.setState({ code: valor });
    setDescription = valor => this.setState({ description: valor });
    setSummary = valor => this.setState({ summary: valor });
    setHours = valor => this.setState({ hours: valor });

    //Manejo de errores
    addErrorDescripcion = msj => {
        this.setState({ erroDescrip: 'is-invalid' });
        this.setState({ msjDes: msj });
    }

    removeErrorDescripcion = () => {
        this.setState({ erroDescrip: '' });
        this.setState({ msjDes: '' });
    }


    addErrorResumen = msj => {
        this.setState({ erroResu: 'is-invalid' });
        this.setState({ msjResu: msj });
    }

    removeErrorResumen = () => {
        this.setState({ erroResu: '' });
        this.setState({ msjResu: '' });
    }

    save = async () => {
        this.setState({showSpinner: true});
        if (this.state.description !== '') {
            if (this.state.summary !== '') {
                let datos = {
                    code: this.state.code,
                    description: this.state.description,
                    summary: this.state.summary,
                    hours: this.state.hours
                }

                let res = await Api('competences', 'POST', sessionStorage.getItem('token'), datos);
                if (res === "Nueva competencia creada") {
                    $('#tbl').DataTable().destroy();
                    await this.props.pedirDatos();
                    $('#crear').modal('hide');
                    this.props.alert('success','Competencia creada');
                    document.getElementsByName('code')[0].value="";
                    document.getElementsByName('description')[0].value="";
                    document.getElementsByName('summary')[0].value="";
                    document.getElementsByName('hours')[0].value="";

                } else {
                    console.log(res);
                    this.props.alert('danger',res);

                }
            } else {
                this.addErrorResumen('Debes añadir un resúmen');
            }
        } else {
            this.addErrorDescripcion('Debes añadir una descripción.');
        }
        this.setState({showSpinner: false});
    }

    render() {
        
        return (
            <div className="modal fade" id="crear" data-backdrop="static" role="dialog" aria-labelledby="crearLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="crearLabel">Crear Competencia</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <span className="font-weight-lighter">Los campos con <i className="text-danger">*</i> son obligatorios</span>
                            <div className="form-group mt-1">
                                <label htmlFor="code">Código</label> <button  className="btn btn-sm" data-toggle="tooltip" data-placement="right" title="Corresponde al código de la competencia que se encuentra en el programa de formación"><i className="fas fa-question-circle"></i></button>
                                <input name="code" type="text" className="form-control" placeholder="Código de la competencia"
                                    onChange={
                                        (e) => this.setCode(e.target.value)
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Descripción <span className="text-danger">*</span> </label>
                                <input name="description" type="text" className={`form-control ${this.state.erroDescrip}`} placeholder="Competencia"
                                    onChange={(e) => {
                                        this.setDescription(e.target.value);
                                        this.removeErrorDescripcion();
                                    }}
                                />
                                <span className="text-danger">{this.state.msjDes}</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="summary">Resumen <span className="text-danger">*</span></label>
                                <input name="summary" type="text" className={`form-control ${this.state.erroResu}`} placeholder="Descripción de la competencia"
                                    onChange={(e) => {
                                        this.setSummary(e.target.value);
                                        this.removeErrorResumen();
                                    }}
                                />
                                <span className="text-danger">{this.state.msjResu}</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="hours">Horas</label>
                                <input name="hours" type="number" className="form-control" min="0" step="1" placeholder="0"
                                    onChange={
                                        (e) => this.setHours(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-outline-success" onClick={() => this.save()}>Crear <i className="fas fa-save"></i> <Spinner show={this.state.showSpinner}/></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Crear;