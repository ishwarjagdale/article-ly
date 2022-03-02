import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api"
const FOLLOW_URL = "/follow/"

axios.defaults.withCredentials = true;


async function checkFollow(profileID) {
    return await axios.get(API_URL + FOLLOW_URL + profileID).then(res => {
        if(res.data.resp_code === 200) {
            return res.data.response;
        }
    }).catch((error) => {
        console.log(error);
    })
}

async function follow(profileID) {
    return await axios.post(API_URL + FOLLOW_URL + profileID).then(res => {
        if(res.data.resp_code === 200) {
            return res.data.response;
        }
    }).catch((error) => {
        console.log(error)
    })
}

async function unfollow(profileID) {
    return await axios.delete(API_URL + FOLLOW_URL + profileID).then(res => {
        if(res.data.resp_code === 200) {
            return res.data.response;
        }
    }).catch((error) => {
        console.log(error)
    })
}

export {checkFollow, follow, unfollow};