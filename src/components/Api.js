// const API = 'https://cronode.herokuapp.com/api/';
const API = 'http://3.129.88.105:3000/api/';

const peticion = async (route, metodo, token, datos) => {
    try {
        let peticion;
        let Myheaders;

        if (token === "") {
            Myheaders = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
        } else {
            Myheaders = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            };
        }

        if (metodo === 'GET' || datos === '') {
            peticion = await fetch(API + route, {
                method: metodo,
                headers: Myheaders
            });

        } else {
            peticion = await fetch(API + route, {
                method: metodo,
                headers: Myheaders,
                body: JSON.stringify(datos)
            });
        }

        return await peticion.json();

    } catch (erro) {
        console.log(erro);
        return { error: erro }
    }

}

export default peticion;