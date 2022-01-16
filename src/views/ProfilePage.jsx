import React from 'react';
import {getUser, LoadUser} from "../api/AuthAPI";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer";
import "./ProfilePage.css";
import Article from "../components/Article/Article";
import Button from "../elements/Button/Button";


class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: LoadUser(),
            userProfile: {
                id: "",
                name: "",
                username: "",
                bio: "",
                email: "",
                image_url: "",
                posts: []
            },
            loaded: false
        };
    }

    componentDidMount() {
        console.log(window.location.pathname);
        getUser(window.location.pathname.slice(2)).then(r => {
                console.log(r.response);
                this.setState({userProfile: r.response})
            }
        );
    }

    render() {
        return (
            <>
                <div className={"profile-header"}>
                    <div className={"profile-header-hero"}>
                        <div className={"profile-header-cover"}>
                            <Navigation parentState={this.state}/>
                            <h1 id={"userName"}>{this.state.userProfile.name}</h1>
                        </div>
                    </div>
                    <div className={"profile-interactions"}>
                        { /* <ul className={"nav-list no-mar"}>
                            <li className={"nav-item p-interact"}>
                                <i className={"fas fa-envelope"}/>
                            </li>
                        </ul> */}
                        <ul className="nav-list">
                            <li className={"nav-item"}>
                                <a href={"/about"}>About</a>
                            </li>
                            <li className={"nav-item"}>
                                <a href={"/"}>4K Followers</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={"page-wrapper"}>
                    <div className={"content-wrapper"}>
                        <div className={"profile-posts"}>
                            {
                                this.state.userProfile.posts.map(post => {
                                    return <Article key={post} postID={post} size={0} />
                                })
                            }
                        </div>
                    </div>
                    <div className={"overlapper"}>
                        <div className={"profile-sidebar"}>
                            <img src={this.state.userProfile.image_url} alt={this.state.userProfile.name}/>
                            <p className={"profile-name"}>{this.state.userProfile.name}</p>
                            <p className={"profile-bio"}>{this.state.userProfile.bio}</p>
                            <a href={"/"}>Follow Me</a>
                        </div>
                    </div>
                </div>

                <Footer/>
            </>
        )
    }
}

export default ProfilePage;