import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const userSettings = "/auth/settings";

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

export {getUserSettings};