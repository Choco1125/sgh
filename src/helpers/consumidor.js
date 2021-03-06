import validador from './validador';

// const linkApi = 'https://cronode.herokuapp.com/api';
const linkApi = 'http://3.129.88.105:3000/api';

const consumidor = {
    get: async route => {
        try {
            let res = await fetch(`${linkApi}/${route}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });

            let data = await res.json();
            validador(data);

            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    post: async (route, datos) => {

        try {
            let res = await fetch(`${linkApi}/${route}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(datos)
            });

            let data = await res.json();

            validador(data);

            return data;

        } catch (error) {
            console.log(error);
            return null;
        }
    },
    put: async (route, id, datos) => {

        try {
            let res = await fetch(`${linkApi}/${route}/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(datos)
            });

            let data = await res.json();

            validador(data);

            return data;

        } catch (error) {
            console.log(error);
            return null;
        }
    },
    delete: async (route, id) => {

        try {
            let res = await fetch(`${linkApi}/${route}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            });

            let data = await res.json();

            validador(data);

            return data;

        } catch (error) {
            console.log(error);
            return null;
        }
    },
    sendFile: async (route, id, method, formData) => {

        try {
            let res = await fetch(`${linkApi}/${route}/${id}`, {
                method,
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: formData
            });

            let data = await res.json();


            return data;

        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export default consumidor;