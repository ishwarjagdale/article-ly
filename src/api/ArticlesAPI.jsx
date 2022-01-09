import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api"
const NEW_POST_URL = "/new-story";
const GET_POSTS_URL = "/posts";
const GET_POST_URL = "/post/";

async function new_post(title, subtitle, content, thumbnailURL, tags, user_id) {
    return await axios.post(API_URL + NEW_POST_URL,
        {
            "title": title,
            "subtitle": subtitle,
            "content": content,
            "thumbnailURL": thumbnailURL,
            "author": user_id,
            "tags": tags
        }).then(res => {
        if (res.data["resp_code"] === 200) {
            let postURL = `/s/${title.replace(" ", "-")}-${res.data["response"]}`;
            window.location.href = postURL;
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
        } else {
            window.alert("ERROR: " + res.data.response);
        }
    });
}

export { new_post, get_posts, get_post };