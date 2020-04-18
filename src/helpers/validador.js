const validador = datos => {
    if (datos === "jwt expired") {
        sessionStorage.removeItem('token');
        window.location.href = "/";
    }else if (datos === "jwt malformed") {
        sessionStorage.removeItem('token');
        window.location.href = "/";
    }  
}

export default validador;