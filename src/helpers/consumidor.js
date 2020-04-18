const linkApi = 'https://app-sgh.herokuapp.com/api/';
const consumidor = {
    get:async route =>{
        try {
            let res = await fetch(`${linkApi}/${route}`,{
                method: 'GET',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem('token')
                }
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