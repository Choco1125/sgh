import React from 'react';
import $ from 'jquery';


class Tabla extends React.Component{

    async componentDidMount(){
        
      this.props.pedirDatos();

        
    }
    
    render(){
        const competencias = this.props.compencias;
        
        return(
            <table className="table table-sm" id="tbl">
                <thead>
                    <tr>
                        <th className="d-none d-md-block">Código</th>
                        <th>Descripción</th>
                        <th>Resúmen</th>
                        <th>Programa de formación</th>
                        <th className="d-none d-md-block">Horas</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                       
                        competencias.map(({id,code,description,summary,hours,formationProgram})=>(
                            <tr key={id}>
                                <td className="d-none d-md-block">{code}</td>
                                <td>{description}</td>
                                <td>{summary}</td>
                                <td>{formationProgram.name}</td>
                                <td className="d-none d-md-block">{hours}</td>
                                <td>
                                    <button className="btn btn-outline-success btn-sm mt-1">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="btn btn-outline-danger btn-sm mt-1">
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }
}

export default Tabla;