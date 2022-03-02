import React from "react";
import Navigation from "../Components/Navigation";
import Footer from "../Components/Footer";
import {Menu} from "@headlessui/react";
import {getUser} from "../api/AuthAPI";
import {get_post} from "../api/ArticlesAPI";
import {checkFollow, follow, unfollow} from "../api/ProfilesAPI";


class StorySnip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            loaded: false,
        };
    }

    componentDidMount() {
        let article = get_post(this.props.postID);
        article.then(res => {
            this.setState({
                post: res,
                loaded: true
            })
        })
    }

    render() {
        return (
            <>
                {
                    this.state.loaded && <article className={"w-full md:w-10/12 max-w-[720px] z-10"}>
                        <div className={"pt-6 pb-2"}>
                            <a href={this.state.post.url}>
                                <h1 className={"text-4xl md:text-5xl font-bold font-ssp"}>{this.state.post.title}</h1>
                            </a>
                            <h3 className={"text-lg mt-4 font-light md:text-2xl font-ssp"}>{this.state.post.subtitle}</h3>
                            <a href={this.state.post.url}>
                                <img className={"py-4"} src={this.state.post.thumbnail.url} alt={this.state.post.title}/>
                            </a>
                        </div>
                        <div className={`border-b-2`}>
                            <div className={"flex items-center mb-4 justify-between"}>
                                <div className={"flex items-center"}>
                                            <span className={"story-meta"}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg> {new Date(this.state.post.meta.date_published).toDateString()}
                            </span>
                                    <span className={"separator-dot"}/>
                                    <span className={"story-meta"}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                        {Math.ceil(this.state.post.meta.read_time / 200)} min read
                            </span>
                                </div>
                                <div className={"hidden md:flex items-center"}>
                                    <span className={"text-sm font-ssp font-medium mr-2"}>Tags: </span>
                                    <div className={"story-meta"}>
                                        {
                                            this.state.post.meta.tag.split(",").map((tag) => <span className={"tag mx-2 p-2 rounded-md"}>{String(tag).trim()}</span>)
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className={"flex items-center justify-between mb-4"}>
                                <div className={"flex items-center"}>
                                    <div className={"m-2 flex items-center"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        <span className={"font-medium text-sm mx-2"}>{this.state.post.meta.likes}</span>
                                    </div>
                                    <div className={"m-2 flex items-center"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span className={"font-medium text-sm mx-2"}>{this.state.post.meta.response}</span>
                                    </div>
                                </div>
                                <div className={"text-2xl"}>
                                    <a className={"fab fa-twitter-square mr-3"} href={`https://twitter.com/share?text=${this.state.post.title}&url=${this.state.post.url}&hashtags=${this.state.post.meta.tag.replace(" ", "")}`}/>
                                    <a className={"fab fa-facebook-square mr-3"} href={"https://www.facebook.com/sharer/sharer.php?u=" + this.state.post.url}/>
                                    <a className={"fab fa-linkedin mr-3"} href={"/"}/>
                                </div>
                            </div>
                        </div>
                    </article>
                }
            </>
        )
    }
}


class FollowButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            doFollow: false
        }

        this.handleFollow = this.handleFollow.bind(this);
        this.handleUnFollow = this.handleUnFollow.bind(this);
    }

    handleFollow(e) {
        if(!this.props.appState.user) return this.props.registerPop();
        if(this.props.profile.id === this.props.appState.user.id) return window.alert("Haha!, nice try but you can't follow yourself. ;)");
        e.target.innerText = "...";
        let status = follow(this.props.profile.id);
        status.then(res => {
            e.target.innerText = res ? "Following" : "Follow";
            this.setState({doFollow: res});
        });
    }

    handleUnFollow(e) {
        e.target.innerText = "...";
        let status = unfollow(this.props.profile.id);
        status.then(res => {
            e.target.innerText = res ? "Following" : "Follow";
            this.setState({doFollow: res});
        });
    }

    componentDidMount() {
        checkFollow(this.props.profile.id).then(res => {
            console.log("FOLLOW", res);
            this.setState({doFollow: res});
        })
    }

    render() {
        return (
            <>
                {
                    this.state.doFollow ?
                        <button onClick={this.handleUnFollow} className={"justify-center cursor-pointer p-4 mt-4 inline-flex w-full items-center py-1.5 px-3 font-medium transition-all duration-300 ease text-sm hover:bg-black hover:text-white border-2 border-black rounded-3xl"}>
                            Unfollow
                        </button>
                        :
                        <button onClick={this.handleFollow} className={"justify-center cursor-pointer p-4 mt-4 inline-flex w-full items-center py-1.5 px-3 font-medium transition-all duration-300 ease text-sm hover:bg-black hover:text-white border-2 border-black rounded-3xl"}>
                            Follow
                        </button>
                }
            </>
        )
    }
}


class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.handleProfile = this.handleProfile.bind(this);
    }

    handleProfile() {
        if(window.scrollY >= 402) {
            document.getElementById("side-profile").classList.add("side-profile");
        } else {
            document.getElementById("side-profile").classList.remove("side-profile");
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleProfile);
        console.log(window.location.pathname);
        getUser(window.location.pathname.slice(2)).then(r => {
                console.log(r.response);
                document.title = r.response.name;
                this.setState({userProfile: r.response, loaded: true})
            }
        );
    }

    render() {
        return (
            this.state.loaded ?
                <>
                    <Navigation appState={this.props.appState} registerPop={this.props.registerPop} transparent className={"text-white fixed"}/>
                    <header aria-label={"nav-switch"} className={"w-full h-96 md:h-[400px] profile-header"}>
                        <div className={"backdrop-blur-[4px] w-full h-full flex items-center justify-center"}>
                            <h1 className={"text-4xl whitespace-pre-wrap px-8 text-center md:-mb-20 md:text-5xl cascadia-code-pl font-extrabold text-white"}>{this.state.userProfile.name}</h1>
                        </div>
                    </header>
                    <div className={"flex-1 md:min-h-[500px]"}>
                        <div className={"py-8 px-[10vw] lg:px-[10vw] w-full border-b-2 mx-auto flex items-center justify-between"}>
                            <ul className={"interactions"}><li className={"font-medium"}>{this.state.userProfile.followers} Followers</li><li><button>About</button></li></ul>
                            <Menu as={"div"} id={"user-menu"}>
                                <Menu.Button as={"button"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                </Menu.Button>
                            </Menu>
                        </div>
                        <div className={"flex flex-col items-center relative w-full"}>
                            <div className={"xl:absolute xl:pt-6 top-0 container md:my-8 py-8 px-2 md:p-4 md:p-0 w-full max-w-[1440px]"} id={"side-profile"}>
                                <div className={"w-full justify-center xl:w-60 flex flex-wrap xl:flex-col xl:ml-6 2xl:ml-8"}>
                                    <img className={"w-44"} src={this.state.userProfile.image_url} alt={"author"}/>
                                    <div className={"flex-col"}>
                                        <span className={"font-bold py-2 block text-lg font-ssp"}>{this.state.userProfile.name}</span>
                                        <p className={"text-sm text-gray-600 w-44 md:w-60"}>
                                            {this.state.userProfile.bio}
                                        </p>
                                        <FollowButton appState={this.props.appState} registerPop={this.props.registerPop} profile={this.state.userProfile}/>
                                    </div>
                                </div>
                            </div>
                            <div id={"content"} className={"container md:my-8 p-4 md:p-0 w-full max-w-[1440px] mx-auto flex justify-center flex-col items-center"}>
                                {
                                    this.state.userProfile.posts.map((post) => <StorySnip postID={post}/>)
                                }
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </>
                :
                <>

                </>
        )
    }

}

export default Profile;