import axios from "axios"

class HelloWorldService {
    executeHelloWorld() {
        return axios.get('http://localhost:8080/hello');
    }

    executeHelloWorldBean() {
        return axios.get('http://localhost:8080/hello-bean');
    }

    executeHelloWorldBeaWithPathVariable(name) {
        return axios.get(`http://localhost:8080/hello/${name}`);
    }

}

export default new HelloWorldService()