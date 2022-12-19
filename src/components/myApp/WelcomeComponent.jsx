import React, { Component } from "react";
import { Link } from 'react-router-dom'
import HelloWorldService from "../../api/helloApi/HelloWorldService.js";

class WelcomeComponent extends Component {
    constructor(props) {
        super(props)
        this.retieveMessage = this.retieveMessage.bind(this);
        this.handleSuccessfulresponse = this.handleSuccessfulresponse.bind(this);
        this.state = {
            welcomeMessage: ''
        }
    }

    render() {
        return (
            <div>
                <h1>Welcome to App!!</h1>
                    <div className="container">
                        Welcome {this.props.params.name}. 
                        you can navigate to your app page <Link to="/myApp">here</Link>.
                    </div>
                    <div className="container">
                        Click here to get customized welcome message.
                        <button onClick={this.retieveMessage} className="btn btn-success">Get Hello</button>
                    </div>
                    <div className="container">
                        {this.state.welcomeMessage}
                    </div>
            </div>
        )
        
    }

    retieveMessage() {
        // HelloWorldService.executeHelloWorld()
        // .then(response => this.handleSuccessfulresponse(response))

        // HelloWorldService.executeHelloWorldBean().then(response => this.handleSuccessfulresponse(response))

        HelloWorldService.executeHelloWorldBeaWithPathVariable(this.props.params.name).then(response => this.handleSuccessfulresponse(response))
    }

    handleSuccessfulresponse(response) {
        this.setState({welcomeMessage: response.data.message});
    }

    handleError(error) {
        console.log(error.response)
        let errorMessage = ''

        if(error.message)
            errorMessage += error.message

        if(error.response && error.response.data) {
            errorMessage += error.response.data.message
        }
            

        this.setState({welcomeMessage: errorMessage});
    }
}



export default WelcomeComponent