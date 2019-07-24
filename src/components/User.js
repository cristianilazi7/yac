import React, { Component } from 'react';
import axios from 'axios';
class User extends Component {
    constructor(){
        
        super();
        this.state = {
            name:''
                        
        }
    }

    updateUser(e){        
        this.setState({name: e.target.value});
        console.log(this.state.name)
    }

    handleSubmit(e){
        e.preventDefault();
        const newUser = {            
            name: this.state.name
            
        }
        axios.put('http://localhost:4000/chat/add/user',newUser)
        .then(response =>{
            console.log(response)
            //window.sessionStorage.setItem("user",newUser);
            sessionStorage.setItem('user', JSON.stringify(newUser));
        })
        .catch(error =>{
            console.log(error)
        })

    }

render(){
    return(
        <div>  <form onSubmit={this.handleSubmit.bind(this)}>
                <div >                        
                    <div>
                        <input className="mytext" value={this.state.message} onChange={this.updateUser.bind(this)} placeholder="Nikname"/>
                    </div> 

                </div>
                <div >
                   <button>Entrar a chatRoom</button>
                </div> </form>               
            </div> 
    )
}
}
export default User; 