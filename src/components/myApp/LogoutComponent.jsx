import React, { Component } from "react";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx"

class LogoutComponent extends Component{
    render() {
        return (
            <>
            you are logged out <hr/>
            <div className="container">
                Thank for using our applications.
            </div> 
            </>
        )
                  
    }
}

export default LogoutComponent