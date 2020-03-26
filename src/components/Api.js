const API = 'https://app-sgh.herokuapp.com/api/';

const peticion = async (route,metodo,token,datos) =>{
    try {
        let peticion;
        let Myheaders;
            
        if(token ===""){
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
    
        if(metodo === 'GET' || datos=== ''){
            peticion = await fetch(API+route,{
                method: metodo,
                headers: Myheaders
            });
            
        }else{
                peticion = await fetch(API+route,{
                    method: metodo,
                    headers:Myheaders,
                    body :JSON.stringify(datos)
                });
        }
    
        return await peticion.json();
        
    } catch (erro) {
        return {error: erro}
    }
    
}

export default peticion;