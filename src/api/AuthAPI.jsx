import axios from "axios";
import {Navigate} from "react-router-dom";

const API = process.env.REACT_APP_API_URL + "/api"
const AuthAPI = process.env.REACT_APP_API_URL + "/auth";
const SIGN_UP_URL = AuthAPI + "/";
const LOGIN_URL = AuthAPI + "/login";
const GET_USER_URL = API + "/user";

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
        if (res.data["resp_code"] === 200) {
            if(rememberMe === "on") localStorage.setItem("user", JSON.stringify(res.data.user));
            else sessionStorage.setItem("user", JSON.stringify(res.data.user));
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

    if(localStorage.hasOwnProperty("user")) {
        let token = document.cookie.split(";").filter((cookie) => cookie.startsWith("remember_token"))[0];
        if(token) {
            let user = JSON.parse(localStorage.getItem("user"));
            if(user.id.toString() === token.split("=")[1].split("|")[0]) {
                return user;
            }
        } else {
            localStorage.removeItem("user");
            return false;
        }
    } else if(sessionStorage.hasOwnProperty("user")) {
        return JSON.parse(sessionStorage.getItem("user"));
    } else {
        return false;
    }

}

async function getUser(username) {
    return await axios.get(GET_USER_URL + "/" + username).then(res => {
        if(res.data["resp_code"] === 200) {
            return res.data;
        }
        return res.data;
    })
}

function ReloadUser() {
    axios.get(AuthAPI + "/settings").then(r => {
        if(r.data["resp_code"] === 200) {
            localStorage.hasOwnProperty("user") ? localStorage.setItem("user", JSON.stringify(r.data["settings"])) :
                sessionStorage.setItem("user", JSON.stringify(r.data["settings"]));
        }
    })
}

function Logout(e) {
    localStorage.removeItem("user"); sessionStorage.removeItem("user");
    axios.get(AuthAPI + "/logout", {withCredentials: true}).then(r => console.log("loggedOut", r));
    return (
        <Navigate to={"/"} />
        )
}

function test() {
    axios.get(AuthAPI + "/secure", {
    }).then(r => console.log(r));
}

export {RegisterUser, LoginUser, LoadUser, Logout, getUser, test, ReloadUser};