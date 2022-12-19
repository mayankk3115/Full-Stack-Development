import axios from "axios"

class MyAppLearningService {
    retieveAllLearnings(name) {
        return axios.get(`http://localhost:8080/jpa/user/${name}/learnings`);
    }

    retieveLearning(name, id) {
        return axios.get(`http://localhost:8080/jpa/user/${name}/learnings/${id}`);
    }

    deleteLearning(name, id) {
        return axios.delete(`http://localhost:8080/jpa/user/${name}/learnings/${id}`);
    }

    updateLearning(name, id, myApp) {
        return axios.put(`http://localhost:8080/jpa/user/${name}/learnings/${id}`, myApp);
    }

    createLearning(name, myApp) {
        return axios.post(`http://localhost:8080/jpa/user/${name}/learnings`, myApp);
    }
}

export default new MyAppLearningService()