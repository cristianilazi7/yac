import React, { Component } from 'react';
import './ChatRoom.css';
import axios from 'axios';
//import avatar from '../image/photo.jpg'
class ChatRoom extends Component {
    constructor(){
        
        super();
        
        this.state = {
            message:'',
            username: JSON.parse(sessionStorage.getItem('user'))? JSON.parse(sessionStorage.getItem('user')):{name:''},
            song_name:'',
            artist:'',
            messages:[ ]
            
        }

       this.getlistmessage();
        
    }

    getlistmessage(){
        axios.get('http://localhost:4000/chat')
        .then(response =>{
           // console.log("Respuesta de datos firebas ", response.data)
            this.setState({messages: []});
            const listf = this.state.messages;
            var arraykeys = Object.keys(response.data)
            for (let index = 0; index < arraykeys.length; index++) {
                const element = arraykeys[index];                
                response.data[element].key=arraykeys[index];
                //console.log(response.data[element]);
                listf.push(response.data[element])
            }
            this.setState({messages: listf});
            
        })
        .catch(error =>{console.log(error)})
    }

    getVideoyoutube(message){

        if (message.includes('/youtube')) { 
            console.log("separando",message.split("/youtube"))
            var song_artis = message.split("/youtube")[1];

            this.setState({song_name: song_artis.split("/")[0]+' '+song_artis.split("/")[1]})
        }
    }

    updateMessage(e){        
        if(e.target.value.length>0){
            this.setState({message: e.target.value});
            this.getVideoyoutube(e.target.value);
        }else{
            
        }
        //console.log(this.state.message)
    }
    
    handleSubmit(e){
        e.preventDefault();
        const list = this.state.messages;
        const newMessage = {
            id:list.length, 
            text: this.state.message,
            date: new Date().toLocaleTimeString(),
            name: this.state.username.name,
            song_name: this.state.song_name,
            key: "",
            url:"url"
        }
        if(newMessage.text.length>0){
            // list.push(newMessage);
            if(newMessage.song_name.length>0){
                axios.get('http://localhost:4000/chat/youtube/'+newMessage.song_name).then(response =>{
                console.log(response.data.result)
                newMessage.url = response.data.result
                console.log(newMessage)
                axios.put('http://localhost:4000/chat/add/message',newMessage)
                .then(response =>{
                    console.log(response)
                })
                .catch(error =>{
                    console.log(error)
                })
                this.getlistmessage();
                // this.setState({messages: list});
                this.setState({message: ''})

            })
            }else{
                newMessage.url = 'url'
                axios.put('http://localhost:4000/chat/add/message',newMessage)
                .then(response =>{
                    console.log(response)
                })
                .catch(error =>{
                    console.log(error)
                })
                this.getlistmessage();
                // this.setState({messages: list});
                this.setState({message: ''})
            }
            
            
        }
       

    }

   render(){
       const {messages} = this.state; 
       const messageslist = messages.map(message =>{
        if(message.name === this.state.username.name){
            return (
                 <li key={message.key} style={{width:"100%"}}>
                                    <div className="msj macro">
                                    <div className="avatar "><p>{message.name}</p></div>
                                        <div className="text text-l">
                                        
                                            <p> {message.text} </p>
                                            
                                            { (message.url==='url') ? '':<p>
                                            <iframe title={message.title} width="160" height="115" src={message.url} frameBorder="0" allow=" encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                            </p>  }
                                            <p><small>{message.date}</small></p>

                                        </div>
                                    </div>
                                </li>
        )
        }else{
            return (
            <li key={message.key} style={{width:"100%"}}>
                <div className="msj-rta macro">
                    <div className="text text-r">
                    
                        <p>{message.text}</p>
                        { (message.url==='url') ? '':<p>
                        <iframe title={message.title} width="160" height="115" src={message.url} frameBorder="0" allow="encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                         </p>  }
                        <p><small>{message.date}</small></p>

                    </div>
                <div className="avatar " style={{padding:"0px 0px 0px 10px !important"}}><p>{message.name}</p></div>                                
                </div>
            </li>
            )
        }
    })
       return(
        
        <div className="col-sm-12 col-sm-offset-4 frame">
            <ul>  {  messageslist }
                    </ul>
                  
              <div>  <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="msj-rta macro">                        
                    <div className="text text-r" style={{background:"whitesmoke !important" }}>
                        <input className="mytext" value={this.state.message} onChange={this.updateMessage.bind(this)} placeholder="Type a message"/>
                    </div> 

                </div>
                <div style={{padding: "10px" }}>
                   <button>Enviar</button>
                </div> </form>               
            </div> 
           
            

           </div>
           
       )
   }
}


export default ChatRoom;