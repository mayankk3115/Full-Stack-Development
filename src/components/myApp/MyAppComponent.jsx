import React, { Component } from "react";
import MyAppLearningService from "../../api/myAppLearningapi/MyAppLearningService.js";
import AuthenticationService from "./AuthenticationService.js";
import moment from 'moment'

class MyAppComponent extends Component {
    constructor(props){
        console.log('constructor')
        super(props)
        this.state={
            myapps:[],
            message: null
        }

        this.deleteLearnClicked = this.deleteLearnClicked.bind(this)
        this.updateLearnClicked = this.updateLearnClicked.bind(this)
        this.addLearningClicked = this.addLearningClicked.bind(this)
        this.refreshLearning = this.refreshLearning.bind(this)
        
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    shouldComponentUpdate(nextPros,nextState) {
        console.log('shouldComponentUpdate')
        console.log(nextPros)
        console.log(nextState)
        return true
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.refreshLearning();
        console.log(this.state);
    }

    refreshLearning() {
        let username = AuthenticationService.getLoggedInUserName()
        MyAppLearningService.retieveAllLearnings(username)
        .then(
            response => {
                //console.log(response)
                this.setState({myapps: response.data})
            }
        )
    }

    deleteLearnClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        // console.log(id + " " + username)
        MyAppLearningService.deleteLearning(username,id)
        .then(
            response => {
                this.setState({message:`Delete of Learning ${id} Successful`});
                this.refreshLearning();
            }
        )
    }

    updateLearnClicked(id) {
        this.props.navigate(`/myApp/${id}`)
        console.log(id)
    }

    addLearningClicked() {
        console.log('created')
        this.props.navigate(`/myApp/-1`)
        
    }



    render() {
        console.log('render')
        return (<div>
                 <h1>My App Elements</h1>
                 {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                 <div className="container">
                 <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>TargetDate</th>
                            <th>Done</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.myapps.map(
                                myapp =>
                                    <tr key={myapp.id}>
                                        <td>{myapp.description}</td>
                                        <td>{moment(myapp.targetDate).format('YYYY-MM-DD')}</td>
                                        <td>{myapp.done.toString()}</td>
                                        <td><button className="btn btn-success" onClick={() => this.updateLearnClicked(myapp.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteLearnClicked(myapp.id)}>Delete</button></td>
                                    </tr>
                            )
                        }
                    </tbody>
                 </table> 
                 <div class="row">
                        <button className="btn btn-success" onClick={this.addLearningClicked}>Add</button>
                 </div>
                 </div>                   
               </div>
        )
    }

}

export default MyAppComponent