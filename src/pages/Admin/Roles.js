import React from 'react';
import Navbar from './../../components/admin/Navbar';
import Loader from './../../components/Loader';
import consumidor from './../../helpers/consumidor';
import Rol from '../../components/admin/roles/rol';

class Roles extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            loader: true,
            roles: [],
        }
    }

    getRoles = async () =>{
        let res = await consumidor.get('rols');
        if(res){
            this.setState({
                roles: res,
                loader: false
            });
        }
        console.log(this.state.roles);
    }

    async componentDidMount(){
        await this.getRoles();
    }

    render() {
        if(this.state.loader){
            return <Loader/>

        }else{
            return (
                <div>
                    <Navbar active="parametrizacion"/>
                    <div className="container">
                        <div className="row justify-content-end mt-3">
                            <button className="btn btn-success border mr-3" data-target="#crear" data-toggle="modal">Crear <i className="fas fa-plus"></i></button>
                        </div>
                        <div className="row mt-2 justify-content-center">
                            {
                                this.state.roles.map(rol=> <Rol datos={rol} key={rol.id}/>
                                )
                            }
                        </div>
                    </div>
                </div>
            );
        }
       

    }

}

export default Roles;