const API = 'https://app-sgh.herokuapp.com/api/';

const peticion = async (route,metodo,token,datos) =>{
    let peticion;

    if(metodo!== 'GET'){
         let Myheaders;
        
        if(token !==""){
            Myheaders = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
        }else{
            Myheaders = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            };
        }

        peticion = await fetch(API+route,{
            method: metodo,
            headers:Myheaders,
            body :JSON.stringify(datos)
        });

    }else{
        peticion = await fetch(API+route);
    }

    return await peticion.json();
    
}

export default peticion;