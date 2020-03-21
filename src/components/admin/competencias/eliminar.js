import React from 'react';
import Api from './../../Api';
import $ from 'jquery';
import Spinner from '../../spinner';


class Eliminar extends React.Component {
    
    constructor(props){
        super(props);
        this.state= {
            showSpinner: false
        }
    }

    delete = async ()=>{

        this.setState({showSpinner: true});

        let token = sessionStorage.getItem('token');
   

        let res = await Api(`competences/${this.props.id}`,'DELETE',token,'');
        

        if(res==="Competencia eliminada"){
            $('#tbl').DataTable().destroy();
            await this.props.pedirDatos();
            $('#eliminar').modal('hide');
        }else{
            console.error(res);
        }
        this.setState({showSpinner: false});

    }

    render() {
        return (
            <div className="modal fade" id="eliminar" role="dialog" aria-labelledby="eliminarLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="eliminarLabel">Eliminar comptencia</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ¿Deseas eliminar la competencia?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-outline-danger" onClick={()=>this.delete()}>Sí, eliminar <Spinner show={this.state.showSpinner}/> </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Eliminar;