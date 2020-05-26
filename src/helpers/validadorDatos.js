const ValidadorDatos = {
    isNumeric: valor => !isNaN(parseInt(valor)),
    isValidLength: (valor,min,max) => valor.length >=min && valor.length <= max
}

export default ValidadorDatos;