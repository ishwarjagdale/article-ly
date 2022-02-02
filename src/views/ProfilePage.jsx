import React from 'react';
import {getUser, LoadUser} from "../api/AuthAPI";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer";
import "./ProfilePage.css";
import Article from "../components/Article/Article";
import Button from "../elements/Button/Button";
import SignUp from "../components/SignUp/SignUp";
import {checkFollow} from "../api/ProfilesAPI";
import FollowButton from "../components/FollowButton/FollowButton";


class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popState: false,
            email: "",
            activeTab: "login",
            user: LoadUser(),
            userProfile: {
                id: "",
                name: "",
                username: "",
                bio: "",
                email: "",
                image_url: "",
                followers: "...",
                posts: []
            },
            loaded: false
        };

        this.handlePopState = this.handlePopState.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll() {
        let e = document.getElementById("profile-sidebar");
        if(e) {
            if(window.scrollY > 455) e.classList.add("stick-side");
            else {
                e.classList.remove("stick-side");
            }
        }
    }


    handlePopState(args) {
        if(args)
            this.setState({popState: !this.state.popState, email: args["email"], activeTab: args["activeTab"]})
        else
            this.setState({popState: !this.state.popState})
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll)
        console.log(window.location.pathname);
        getUser(window.location.pathname.slice(2)).then(r => {
                console.log(r.response);
                this.setState({userProfile: r.response, loaded: true})
            }
        );
    }

    render() {
        return (
            <>
                <div className={"profile-header"}>
                    <div className={"profile-header-hero"}>
                        <div className={"profile-header-cover"}>
                            <Navigation parentState={this.state} handlePopState={this.handlePopState} navListLogo search/>
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
                                <span id={"followCount"}>{this.state.userProfile.followers} Followers</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={"page-wrapper"}>

                    { this.state.loaded && <div className={"overlapper"}>
                        <div className={"profile-sidebar"} id={"profile-sidebar"}>
                            <img src={this.state.userProfile.image_url} alt={this.state.userProfile.name}/>
                            <p className={"profile-name"}>{this.state.userProfile.name}</p>
                            <p className={"profile-bio"}>{this.state.userProfile.bio}</p>
                            <FollowButton user={this.state.user} profile={this.state.userProfile} handlePopState={this.handlePopState}/>
                        </div>
                    </div>
                    }
                    <div className={"content-wrapper"}>
                        <div className={"profile-posts"}>
                            {
                                this.state.userProfile.posts.map(post => {
                                    return <Article key={post} postID={post} size={0} />
                                })
                            }
                        </div>
                    </div>

                </div>

                { this.state.popState && !this.state.user &&
                <SignUp parentState={this.state} closePop={this.handlePopState} parentProps={this.props}/>
                }
                <Footer/>
            </>
        )
    }
}

export default ProfilePage;