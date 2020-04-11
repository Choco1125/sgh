
const agregarError = (elemento, msj) => {
    elemento.children[1].classList.add('is-invalid');
    elemento.children[2].innerHTML = msj;
    elemento.children[1].focus();

    elemento.addEventListener('change', () => {
        elemento.children[1].classList.remove('is-invalid');
        elemento.children[2].innerHTML = '';
    });
}

export default agregarError;