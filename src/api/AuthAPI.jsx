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
            window.alert(res.data.response)
            console.log("failed", res["resp_code"]);
            return [false, res.data.response]
        }
    })
}

function LoginUser(email, password, rememberMe) {
    return axios.post(LOGIN_URL, {"email": email, "password": password, "rememberMe": rememberMe}).then(res => {
        if (res.data["resp_code"] === 200) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
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
        authUser(user.id).then(res => {
            if(res.data.resp_code !== 200) {
                localStorage.removeItem("user");
                window.location.reload();
            }
        })
    } else {
        user = false;
    }
    console.log("User Loaded", user);
    return user;
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
            localStorage.setItem("user", JSON.stringify(r.data["settings"]));
        }
    })
}

function Logout(e) {
    axios.get(AuthAPI + "/logout", {withCredentials: true}).then((resp) => {
        if(resp.data.resp_code === 200) {
            localStorage.removeItem("user");
            console.log("loggedOut", resp.data)
            window.location.reload();
        }
    });
}

function authUser(id) {
    return axios.post(AuthAPI + "/secure", {
        "userId": id
    }).catch(() => {
        localStorage.removeItem("user");
        window.location.reload();
        return <></>
    });
}

export {RegisterUser, LoginUser, LoadUser, Logout, getUser, authUser, ReloadUser};