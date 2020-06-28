const validador = datos => {
    if (datos.message === "jwt expired") {
        sessionStorage.removeItem('token');
        window.location.href = "/";
    }else if (datos.message === "jwt malformed") {
        sessionStorage.removeItem('token');
        window.location.href = "/";
    }
}

export default validador;