import React, {Component} from "react"
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import withNavigation from './WithNavigation.jsx' 
import withParams from "./WithParams.jsx";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx"
import LoginComponent from "./LoginComponent.jsx";
import MyAppComponent from "./MyAppComponent.jsx";
import HeaderComponent from "./HeaderComponent.jsx";
import FooterComponent from "./FooterComponent.jsx";
import LogoutComponent from "./LogoutComponent.jsx";
import WelcomeComponent from "./WelcomeComponent.jsx";
import ErrorComponent from "./ErrorComponent.jsx";
import MyAppsComponent from "./MyAppsComponent.jsx";

class MyApp extends Component{
    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
        const MyAppComponentWithParamsAndNavigation = withParams(withNavigation(MyAppsComponent));
        const MyAppComponentWithNavigation = withNavigation(MyAppComponent)
        return (
            <div className="MyApp">
                <Router>
                    <HeaderComponentWithNavigation/> 
                        <Routes>
                            <Route path="/" element={<LoginComponentWithNavigation />} />
                            <Route path="/login" element={<LoginComponentWithNavigation />} />
                            <Route path="/logout" element={<AuthenticatedRoute><LogoutComponent/></AuthenticatedRoute> } />
                            <Route path="/myApp/:id" element={<AuthenticatedRoute><MyAppComponentWithParamsAndNavigation/></AuthenticatedRoute>} />
                            <Route path="/myApp" element={<AuthenticatedRoute><MyAppComponentWithNavigation/></AuthenticatedRoute>} />
                            <Route path="*" element={<ErrorComponent />} />
                            <Route path="/welcome/:name" element={<AuthenticatedRoute><WelcomeComponentWithParams /></AuthenticatedRoute>} />
                        </Routes>
                    <FooterComponent/>     
                </Router>
            </div>
        );
    }
}

export default MyApp
