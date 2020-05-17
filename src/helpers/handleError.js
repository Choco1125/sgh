const handleError = {
    input: id =>{
        let elemento = document.getElementById(id);

        elemento.children[1].classList.add('is-invalid');
        elemento.children[2].innerHTML = 'Debes llenar este campo';
        elemento.children[1].focus();

        elemento.addEventListener('keypress', () => {
            elemento.children[1].classList.remove('is-invalid');
            elemento.children[2].innerHTML = '';
        });

    },
    select: id => {
        let elemento = document.getElementById(id);
        elemento.children[2].innerHTML = 'Debes llenar este campo';
    },
    removeErrorSelect: id => {
        let elemento = document.getElementById(id);
        elemento.children[2].innerHTML = '';
    },
    inputMsj: (id,msj) =>{
        let elemento = document.getElementById(id);

        elemento.children[1].classList.add('is-invalid');
        elemento.children[2].innerHTML = msj;
        elemento.children[1].focus();

        elemento.addEventListener('keypress', () => {
            elemento.children[1].classList.remove('is-invalid');
            elemento.children[2].innerHTML = '';
        });
        
    },
}

export default handleError;