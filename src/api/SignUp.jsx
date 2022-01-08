import axios from "axios";
import {Navigate} from "react-router-dom";


const development_mode = false;
const AuthAPI = !development_mode ? "https://journal-flask-server.herokuapp.com/auth" : "http://localhost:5000/auth";
const SIGN_UP_URL = AuthAPI + "/";
const LOGIN_URL = AuthAPI + "/login";
const GET_USER_URL = AuthAPI + "/user";

axios.defaults.withCredentials = true;

function RegisterUser(name, email, password) {
    return axios.post(SIGN_UP_URL,
        {
        "name": name,
        "email": email,
        "password": password
        }
    ).then(res => {
        if(res.data["resp_code"] === 200) {
            return [true, res.data.user]
        } else {
            return [false, res.data.response]
        }
    })
}

function LoginUser(email, password, rememberMe) {
    return axios.post(LOGIN_URL, {"email": email, "password": password, "rememberMe": rememberMe}).then(res => {
        console.log("Server Response", res);
        if (res.data["resp_code"] === 200) {
            localStorage.setItem("user", JSON.stringify(res.data.user))
            console.log("userLoggedIn", res)
            return [true, res.data.user];
        } else {
            window.alert(res.data.response)
            console.log("failed", res["resp_code"]);
            return [false, res.data.response];
        }
    });
}

function LoadUser() {
    let user = localStorage.getItem("user")
    if(user) {
        user = JSON.parse(user);
    } else {
        user = false;
    }
    console.log("User Loaded", user);
    return user;
}

async function getUser(username) {
    return await axios.get(GET_USER_URL + "/" + username).then(res => {
        console.log(res);
        if(res.data["success"]) {
            return res.data;
        }
        return res.data;
    })
}

function ReloadUser() {
    axios.get("http://localhost:5000/api/settings").then(r => {
        if(r.data["resp_code"] === 200) {
            localStorage.setItem("user", JSON.stringify(r.data["settings"]));
        }
    })
}

function Logout(e) {
    localStorage.removeItem("user");
    axios.get("http://localhost:5000/auth/logout").then(r => console.log(r));
    return (
        <Navigate to={"/"} />
        )
}

function test() {
    axios.get(AuthAPI + "/secure", {
    }).then(r => console.log(r));
}

export {RegisterUser, LoginUser, LoadUser, Logout, getUser, test, ReloadUser};