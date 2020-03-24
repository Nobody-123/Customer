import React, { Component } from 'react';
import LoginPage from "./components/Login";
import Chatpage from "./components/Chatpage";

class App extends Component {
  state = {
    currentScreen: "LoginPage",
    currentUserId: ""
  }

  logIn = (username) =>{
    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username})
    })
      .then(response =>{
        console.log(`response ${response}`)
        
      })
      .catch(error =>{
        console.log(error)
      })
      this.setState({
        currentUserId: username,
        currentScreen: "ChatScreen"
      })
  }

  render() {
    if(this.state.currentScreen==="LoginPage"){
      return (
        <div className="container">
          <LoginPage logIn={this.logIn} />
        </div>
      )
    }
    else{
      return(
        <div>
          <Chatpage currentUserId={this.state.currentUserId} />
        </div>
      )
    }
  }
}

export default App
