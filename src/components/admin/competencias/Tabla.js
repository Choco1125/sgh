import React from 'react';
import $ from 'jquery';
import 'datatables.net-bs4/css/dataTables.bootstrap4.css';
import 'datatables.net-bs4/js/dataTables.bootstrap4';

class Tabla extends React.Component{

    componentDidMount(){
     this.renderTbl();
    }

    renderTbl(){
        $('#tbl').DataTable({
            "language": {
                "lengthMenu": "Mostrar _MENU_ registros",
                "zeroRecords": "No se encontraron resultados",
                "info": "",
                "infoEmpty": "",
                "infoFiltered": "",
                "sSearch": "Buscar:",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast": "Último",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior"
                },
                "sProcessing": "",
            }
        });
    }
    render(){
        let data = [1,2,4,5,6,7,8,9,10];
        return(
            <table className="table table-sm co-12" id="tbl">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(elemnto=>(
                            <tr key={elemnto}>
                                <th scope="row">{elemnto}</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }
}

export default Tabla;