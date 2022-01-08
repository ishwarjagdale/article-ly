import axios from "axios";

const development_mode = false;
const API_URL = !development_mode ? "https://journal-flask-server.herokuapp.com/api" : "http://localhost:5000/api";
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
    await axios.get(
        API_URL + GET_POSTS_URL
    ).then(res => {
        if(res.data["resp_code"] === 200) {
            localStorage.setItem(
                "posts", JSON.stringify(res.data.response)
            );
        }
    });
}

function returnGetPosts() {
    get_posts();
    return JSON.parse(localStorage.getItem("posts"));
}

async function get_post(postID) {
    await axios.get(
        API_URL + GET_POST_URL + postID
    ).then(res => {
        if(res.data.resp_code === 200) {
            localStorage.setItem(postID, JSON.stringify(res.data.response));
        } else {
            window.alert("ERROR: " + res.data.response);
        }
    });
}
function returnGetPost(postID) {
    get_post(postID)
    return JSON.parse(localStorage.getItem(postID));
}

export { new_post, get_posts, returnGetPosts, get_post, returnGetPost };