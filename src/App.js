import React from 'react';

import './App.css';
import './components/ChatRoom.css';
import ChatRoom from './components/ChatRoom';
import User from './components/User';
//import AppNavigator from './AppNavigator';

function App() {
  return (
     <div className="App">
        <h1>Chat Room</h1>
        <ChatRoom/> 
        <h1>Usuario</h1>
        <User/>
    </div>
   
  );
}

export default App;
