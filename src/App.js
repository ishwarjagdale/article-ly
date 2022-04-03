import {BrowserRouter as Router, Routes, Route, useLocation, Navigate} from "react-router-dom";
import Home from "./views/Home";
import StoryPage from "./views/StoryPage";
import Profile from "./views/Profile";
import NewStory from "./views/NewStory";
import Settings from "./views/Settings";
import Register from "./Components/Register";
import React from "react";
import {LoadUser, Logout} from "./api/AuthAPI";

const AuthRoutes = ({children}) => {
    let location = useLocation();
    return (
        LoadUser() ?
            children :
            <Navigate to={"/"} state={{from: location}} replace/>
    )
}


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            registration: false,
            user: LoadUser(),
            activeTab: 0,
        };

        this.showPop = this.showPop.bind(this);
        this.hidePop = this.hidePop.bind(this);
        this.handleTab = this.handleTab.bind(this);
    }

    handleTab(tab) {
        this.setState({activeTab: tab})
    }

    showPop(tab) {
        this.setState({registration: true, activeTab: tab});
    }

    hidePop() {
        this.setState({registration: false});
    }

    componentDidMount() {
        console.log(this.state)
    }

    render() {
        return (
            <>
                <Router>
                    <Routes>
                        <Route path={"/"} element={<Home registerPop={this.showPop} appState={this.state}/>} />
                        <Route path={"/s/:postURL"} element={<StoryPage registerPop={this.showPop} appState={this.state}/>} />
                        <Route path={"/@:username"} element={<Profile registerPop={this.showPop} appState={this.state}/>} />
                        <Route path={"/logout"} element={<AuthRoutes><Logout appState={this.state}/></AuthRoutes>} />
                        <Route path={"/new-story"} element={<AuthRoutes><NewStory appState={this.state}/></AuthRoutes>} />
                        <Route path={"/settings"} element={<AuthRoutes><Settings appState={this.state}/></AuthRoutes>} />
                        <Route path={"/saved"} element={<Home registerPop={this.showPop} appState={this.state} saved />} />
                        <Route path={"/s/:postURL/edit"} element={<AuthRoutes><NewStory edit appState={this.state}/></AuthRoutes>} />
                    </Routes>
                </Router>
                <Register activeTab={this.state.activeTab} handleTab={this.handleTab} showPop={this.showPop} hidePop={this.hidePop} visible={this.state.registration}/>
            </>
        )
    }

}

export default App;
