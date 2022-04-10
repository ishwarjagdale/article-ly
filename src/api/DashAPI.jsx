import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
const userSettings = "/auth/settings";
const staticURL = "/static/"

axios.defaults.withCredentials = true;

async function getUserSettings() {
    return await axios(
        API_URL + userSettings,
        {withCredentials: true}
    ).then((res) => {
            if(res.data.resp_code === 200) {
                return res.data.settings;
            } else {
                console.log(res.data.response);
            }
        }
    );
}

async function uploadImage(image, fileCat) {
    let data = new FormData();
    data.append("upload", image);
    data.append("fileCat", fileCat);
    return await axios.post(
        API_URL + staticURL, data
    ).then((res) => {
        if(res.status === 200) {
            return res.data;
        } else {
            alert("Something went wrong while uploading...")
            return false;
        }
    })
}

async function get_drafts(userID) {
    return await axios.get(
        API_URL + "/api/drafts/" + userID
    ).then(res => {
        if(res.data.resp_code === 200) {
            return res.data.response
        } else if(res.data.resp_code === 401) {
            return false
        } else {
            window.alert("ERROR: " + res.data.response);
        }
    });
}

export {getUserSettings, uploadImage, get_drafts};