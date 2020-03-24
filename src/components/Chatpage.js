import React from "react";
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import ShowMessages from "./ShowMessages";
import SendMessage from "./SendMessage";

class Chatpage extends React.Component{
    state = {
        currentUserId: this.props.currentUserId,
        currentUser: null,
        universalRoomId: "c1842a1e-6aaa-4b66-825d-d9678d88626d",
        currentRoomId: "",
        messages: [],
        Customer_careId: "Customer_care"
    }

    componentDidMount(){
        const chatManager = new ChatManager({
            instanceLocator: 'v1:us1:3be4b8e5-6304-4024-bb13-3200d767ba6f',
            userId: this.state.currentUserId,
            tokenProvider: new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/3be4b8e5-6304-4024-bb13-3200d767ba6f/token' })
          })

        chatManager.connect()
        .then(currentUser => {
            this.setState({
                currentUser: currentUser
            })
            currentUser.subscribeToRoomMultipart({
                roomId: this.state.universalRoomId,
                hooks: {
                  onMessage: message => {
                    console.log("received message", message)
                  }
                },
              })

            //creating a room with name same as current_user_id
            if(currentUser.rooms.length === 0) // if no. of rooms the user is part of is 0 then a room for user needs to be created
            {
                console.log("create room")
                currentUser.createRoom({
                    name: this.state.currentUserId,
                  }).then(room => {
                    this.subcribeToRoom(room.id);
                    
                    this.setState({
                        currentRoomId: room.id
                    })
                    console.log(`Created room called ${room.name}`)
                  })
                  .catch(err => {
                    console.log(`Error creating room ${err}`)
                  })
            } else {
                this.setState({
                    currentRoomId: currentUser.rooms[1].id
                })
                this.subcribeToRoom(currentUser.rooms[1].id);
            }
            console.log('Successful connection', currentUser)
        })
        .catch(err => {
            console.log('Error on connection', err)
        })
    }

    subcribeToRoom = (roomId) =>{
        this.state.currentUser.subscribeToRoomMultipart({
            roomId: roomId,
            hooks: {
              onMessage: message => {
                this.setState({
                    messages: [...this.state.messages, {id: message.id , senderId: message.senderId ,
                        text: message.parts[0].payload.content
                     }]
                })// adding messages to message list
                console.log("received message", message)
              }
            },
          })

        //adding customer care to room of the client
        this.state.currentUser.addUserToRoom({
          userId: this.state.Customer_careId,
          roomId: roomId
        })
          .then(() => {
            console.log(`added ${this.state.Customer_careId} to client room`)
          })
          .catch(err => {
            console.log(`Error adding ${this.state.Customer_careId} `)
          })
          
    }

    sendMessage = (text) =>{
        this.state.currentUser.sendSimpleMessage({
            roomId: this.state.currentRoomId,
            text: text,
          })
          .then(messageId => {
            console.log(`Added message `)
          })
          .catch(err => {
            console.log(`Error adding message `)
          })
    }

    render(){
        return(
            <div className="container">
                <ShowMessages messages={this.state.messages} currentUserId={this.state.currentUserId} />
                <SendMessage sendMessage={this.sendMessage} />
            </div>
        )
    }
}

export default Chatpage;