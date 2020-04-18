import $ from 'jquery';
import 'datatables.net-bs4/css/dataTables.bootstrap4.css';
import 'datatables.net-bs4/js/dataTables.bootstrap4.js';


const handleTabla = {
    destroy: id => $('#'+id).DataTable().destroy(),
    create: id => $('#'+id).dataTable({
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
    })
}

export default handleTabla;