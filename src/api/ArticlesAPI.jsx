import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api";
const NEW_POST_URL = "/new-story";
const GET_POSTS_URL = "/posts";
const GET_POST_URL = "/post/";
const SEARCH_URL = "/search";
const SAVED_URL = "/saved";

axios.defaults.withCredentials = true;

async function new_post(title, subtitle, content, thumbnailURL, tags, wordCount, user_id, draft, edit=false, postID=0) {
    let URL = API_URL + NEW_POST_URL;
    if(edit)
        URL = API_URL + GET_POST_URL + postID + "/edit"
    return await axios.post(URL,
        {
            "title": title,
            "subtitle": subtitle,
            "content": content,
            "thumbnailURL": thumbnailURL,
            "author": user_id,
            "tags": tags,
            "wordCount": wordCount,
            "draft": draft
        }).then(res => {
        if (res.data["resp_code"] === 200) {
            localStorage.removeItem("new-story");
            if(edit)
                if(draft)
                    window.location.href = "/";
                else
                    window.location.href = window.location.pathname.replace("/edit", "");
            else
                window.location.href = `/s/${title.replace(" ", "-")}-${res.data["response"]}`;
        } else {
            window.alert("An error occurred while publishing your story. Please save it and try again later.");
        }
    });
}

async function get_posts() {
    return await axios.get(
        API_URL + GET_POSTS_URL
    ).then(
        (res) => {
            if(res.data.resp_code === 200)
                return res.data.response;
            else
                return []
        }
    );
}

async function get_post(postID) {
    return await axios.get(
        API_URL + GET_POST_URL + postID
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

async function del_post(postID, action) {
    let URL = API_URL + GET_POST_URL + postID + "/edit"
    if(action === 'delete') {
        return await axios.delete(
            URL
        ).then(res => {
            if(res.data.resp_code === 200) {
                console.log("STORY ID:", postID, "DELETED");
                return true;
            } else {
                window.alert("ERROR: " + res.data.response);
                return false;
            }
        });
    }
    else if(action === 'patch') {
        return await axios.patch(
            URL
        ).then(res => {
            if(res.data.resp_code === 200) {
                console.log("STORY ID:", postID, "Drafted");
                return true;
            } else {
                window.alert("ERROR: " + res.data.response);
                return false;
            }
        });
    }
    else {
        return await axios.get(
            URL
        ).then(res => {
            if(res.data.resp_code === 200) {
                return res.data.response
            } else {
                window.alert("ERROR: " + res.data.response);
            }
        });
    }
}

async function search(string) {
    return await axios.get(API_URL + SEARCH_URL + "?query=" + string).then((res) => {
        if(res.data.resp_code === 200)
            return res.data.response;
        else
            return [];
    })
}

async function likePost(postID) {
    return await axios.get(
        API_URL + GET_POST_URL + postID + "/like"
    ).then(r => {
        return r.data["resp_code"] === 200 ? r.data.likes : false;
    });
}

async function getSaved() {
    return await axios.get(
        API_URL + SAVED_URL + "?stories=" + (localStorage.hasOwnProperty("saved-stories") ? localStorage.getItem("saved-stories").split(" ").join("%20") : "")
    ).then((res) => {
        return res.data.resp_code === 200 ? res.data.response : false;
    })
}


async function get_populars() {
    return await axios.get(
        API_URL + "/populars"
    ).then((res) => {
        if(res.data["resp_code"] === 200) {
            return res.data.response;
        }
    }).catch((e) => {
        console.log(e);
        return [];
    });
}

export { new_post, get_posts, get_post, likePost, search, getSaved, del_post, get_populars };