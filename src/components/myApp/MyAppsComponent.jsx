import React,{ Component } from "react";
import moment from "moment";
import { Formik, Form, Field, ErrorMessage } from "formik";
import MyAppLearningService from "../../api/myAppLearningapi/MyAppLearningService.js";
import AuthenticationService from "./AuthenticationService.js";

class MyAppsComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {

        if(this.state.id===-1) {
            return
        }

        let username = AuthenticationService.getLoggedInUserName()
        MyAppLearningService.retieveLearning(username, this.state.id)
            .then(response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            }))
    }

    onSubmit(values) {
        console.log(values)
        let username = AuthenticationService.getLoggedInUserName()
        let learning = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }
        
        if(this.state.id===-1) {

            MyAppLearningService.createLearning(username, learning)
                .then(() =>  this.props.navigate('/myApp'))

        } else {

            MyAppLearningService.updateLearning(username, this.state.id, learning)
                .then(() =>  this.props.navigate('/myApp'))
            
        }

    }

    validate(values) {
        let errors = {}
        if(!values.description) {
            errors.description = 'Enter a description'
        } else if(values.description.length<5){
            errors.description = 'Enter atleast 5 characters in description'
        }

        if(!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid targetDate'
        }

        return errors;
    }

    render() {
        let {description, targetDate} = this.state
        return (
            <div>
                <h1>MY LEARNING</h1>
                <div className="container">
                    <Formik 
                        initialValues= {{description, targetDate}} 
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                        >
                        {
                            (props) =>(
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}

export default MyAppsComponent