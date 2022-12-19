import axios from "axios";

class AuthenticationService {
    registerSuccessfulLogin(username,password){

        let basicAuthHeaders = 'Basic ' + window.btoa(username + ":" + password);
        console.log('registeredSuccessfulLogin')
        sessionStorage.setItem('authenticatedUser', username);
        this.setUpAxiosInterceptors(basicAuthHeaders)
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser')
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if(user == null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem('authenticatedUser')
        if(user == null) return ''
        return user
    }

    setUpAxiosInterceptors(basicAuthHeaders) {

        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()){
                    config.headers.authorization = basicAuthHeaders
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()