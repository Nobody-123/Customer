import React from "react";

class LoginPage extends React.Component{
    state = {
        username: ""
    }

    handleChange = (e) =>{
        this.setState({
            username: e.target.value
        })
    }

    handleSubmit = (e) =>{
        if(this.state.username==="")
            alert("Enter a username");
        else{
        this.props.logIn(this.state.username);
        }
    }

    render(){
        return(
            <div className="card">
                <form onSubmit={this.handleSubmit}>
                    <div><input placeholder="username" className="" onChange={this.handleChange} value={this.state.username}></input></div>
                    <div><button className="btn">Log in</button></div>
                </form>
            </div>
        )
    }
}

export default LoginPage;