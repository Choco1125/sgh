import React from 'react';
import Logo from './../assets/logo.png';
import Spinner from '../components/spinner';
import Api from './../components/Api';

class Login extends React.Component{

    state = {
        misena_email : '',
        password: '',
        erroEmail: '',
        erroPass: '',
        emailMsj: '',
        passMsj:'',
        sowSpinner: false
    };

    setEmail =  (email)=> this.setState({misena_email: email});  
    setPassword =  (pass)=> this.setState({password: pass});  

    login = ()=>{
        if(this.state.misena_email!== ''){
            const email = this.state.misena_email;
            if(email.indexOf('@')>0){
                if(this.state.password!== ''){
                    this.setState({sowSpinner: true});
                    this.perdirDatos(); 
                    this.setState({sowSpinner: false});
                }else{
                    this.addErrorPass('Debes ingresar una contraseña')
                }
         }else{
                this.addErrorEmail('Debes ingresar un correo válido');
            }
        }else{
            this.addErrorEmail('Debes ingresar un correo');
        }
    };
    
    //Validaciones de campos
    addErrorEmail = msj =>{
        this.setState({erroEmail: 'is-invalid'});
        this.setState({emailMsj: msj}); 
    }

    removeErrorEmail = () =>{
        this.setState({erroEmail: ''});
        this.setState({emailMsj: ''}); 
    }


    addErrorPass = msj =>{
        this.setState({erroPass: 'is-invalid'});
        this.setState({passMsj: msj}); 
    }

    removeErrorPass = () =>{
        this.setState({erroPass: ''});
        this.setState({passMsj: ''}); 
    }

    //Envio de datos al API
    perdirDatos = async () =>{
        let formlario = {
            misena_email: this.state.misena_email,
            password: this.state.password
        };

        let datos = await Api('users/login','POST','',formlario);

        console.log(datos);
    }
     

    render(){
        return(
            <div className="container">
                <div className=" row justify-content-center align-items-center" style={{height: '100vh'}}>
                    <div className="card col-10 col-md-8 col-lg-4">
                        <img src={Logo} className="card-img-top img-fluid mt-3" alt="logo" style={{height: "90px", width: "150px",margin:"auto"}}/>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="misena_email"><i className="fas fa-user"></i> Correo</label>
                                <input type="email" 
                                    className={`form-control ${this.state.erroEmail}`} 
                                    name="misena_email" placeholder="correo@misena.edu.co" 
                                    onChange={(e)=>this.setEmail(e.target.value)}
                                    onKeyPress={()=>this.removeErrorEmail()}/>
                                <span className="text-danger">{this.state.emailMsj}</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password"><i className="fas fa-key"></i> Contraseña</label>
                                <input type="password" 
                                    className={`form-control ${this.state.erroPass}`} 
                                    name="password" 
                                    placeholder="Contraseña" 
                                    onChange={(e)=>this.setPassword(e.target.value)}
                                    onKeyPress={()=>this.removeErrorPass()}
                                    />
                                <span className="text-danger">{this.state.passMsj}</span>
                            </div>
                            <button className="btn btn-primary col-12" onClick={()=>this.login()}>
                                Iniciar sesión 
                                <i className="fas fa-sign-in-alt ml-1 mr-2"></i>
                                <Spinner show={this.state.sowSpinner}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;