import React, {Fragment} from "react";
import Navigation from "../Components/Navigation";
import Footer from "../Components/Footer";
import {Dialog, Menu, Transition, Tab} from "@headlessui/react";
import {getUser, ReloadUser} from "../api/AuthAPI";
import {del_post, get_post} from "../api/ArticlesAPI";
import {checkFollow, follow, unfollow} from "../api/ProfilesAPI";
import {get_drafts, uploadImage} from "../api/DashAPI";
import EditorsTools from "../Components/EditorsTools";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


class StorySnip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            loaded: false,
        };
    }

    componentDidMount() {
        if(sessionStorage.hasOwnProperty(this.props.postID)) {
            this.setState({
                post: JSON.parse(sessionStorage.getItem(this.props.postID)),
                loaded: true
            })
        } else {
            let article = get_post(this.props.postID);
            article.then(res => {
                sessionStorage.setItem(this.props.postID, JSON.stringify(res));
                this.setState({
                    post: res,
                    loaded: true
                })
            })
        }
    }

    render() {
        return (
            <>
                {
                    this.state.loaded && this.state.post && <article className={"w-full md:w-10/12 max-w-[720px] z-10"}>
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

        this.state = {
            profileSettings: false,
            error: false,
        };
        this.handleProfile = this.handleProfile.bind(this);
        this.showPop = this.showPop.bind(this);
        this.hidePop = this.hidePop.bind(this);
        this.getFile = this.getFile.bind(this);
        this.story_action = this.story_action.bind(this);
    }

    showPop() {
        this.setState({profileSettings: true});
    }

    hidePop() {
        this.setState({profileSettings: false});
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
        if(!this.state.loaded)
        getUser(window.location.pathname.slice(2)).then(r => {
                if(r.resp_code === 200) {
                    console.log(r.response);
                    document.title = r.response.name;
                    if(r.response.id === this.props.appState.user.id) {
                        get_drafts(r.response.id).then(q => {
                            this.setState({userProfile: { ...r.response, drafts: q}, loaded: true})
                            if(r.response.bg_image_url) document.getElementById("profile-header").style.backgroundImage = `url('${r.response.bg_image_url + "?today=" + (new Date()).toDateString()}')`
                        })
                    } else {
                        this.setState({userProfile: r.response, loaded: true})
                        if(r.response.bg_image_url) document.getElementById("profile-header").style.backgroundImage = `url('${r.response.bg_image_url + "?today=" + (new Date()).toDateString()}')`
                    }
                } else {
                    this.setState({error: r});
                }
            }
        )
    }

    getFile(e) {
        window.busy = true
        let file = e.target.files[0]
        console.log(file)
        uploadImage(file, e.target.ariaLabel).then((data) => {
            console.log(data);
            if(data) {
                this.setState(state => {state.userProfile.bg_image_url = data.url})
                document.getElementById("profile-header").style.backgroundImage = `url('${data.url + "?no-cache-" + Date.now()}')`
                document.getElementById(e.target.ariaLabel).src = data.url + "?no-cache-" + Date.now();
                e.target.value = ""
            }
            window.busy = false;
        })
    }

    story_action(id, action) {
        del_post(id, action).then((res) => {
            if(res) {
                window.location.href = "/";
            } else {
                window.location.reload();
            }
        })
    }

    render() {

        const ProfileSettings = () => {
            return <>
                <Transition appear show={this.state.profileSettings} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-md"
                        onClose={this.hidePop}
                    >
                        <div className="min-h-screen px-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0" />
                            </Transition.Child>

                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span
                                className="inline-block h-screen align-middle"
                                aria-hidden="true"
                            />
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div className="inline-block w-full max-w-[720px] p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Edit Profile
                                    </Dialog.Title>
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={this.hidePop} className="cursor-pointer absolute right-0 top-0 m-6 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <div className={"mt-4"}>
                                        <div className={"relative flex-1 justify-center flex"}>
                                            <input onInput={this.getFile} aria-label={"bg_image"} type={"file"} accept={"image/*"} name={"image_url"} id={"bg_image-picker"} hidden/>
                                            { this.state.userProfile.bg_image_url ?
                                                <>
                                                    <div onClick={() => document.getElementById("bg_image-picker").click()}
                                                         className={"p-8 w-full h-full absolute flex items-center justify-center bg-black bg-opacity-75 opacity-0 hover:opacity-100 cursor-pointer transition-all duration-300 ease"}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                                             viewBox="0 0 24 24" stroke="white">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                                        </svg>
                                                    </div>
                                                    <img src={this.state.userProfile.bg_image_url + `?${Date.now()}`} id={"bg_image"} className={"rounded aspect-[18/4] object-cover object-bottom"} />
                                                </> :
                                                <>
                                                    <div onClick={() => document.getElementById("bg_image-picker").click()}
                                                        className={"border-dashed rounded aspect-[18/4] cursor-pointer w-full border-2 flex items-center justify-center"}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#535353" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                    { /* <div className={"flex mt-2"}>
                                        <div className={"relative justify-center flex"}>
                                            <input onInput={this.getFile} aria-label={"profileImage"} type={"file"}
                                                   accept={"image/*"} name={"image_url"} id={"profile-picker"} hidden/>
                                            <div onClick={() => document.getElementById("profile-picker").click()}
                                                 className={"p-8 w-full h-full absolute flex items-center justify-center bg-black bg-opacity-75 opacity-0 hover:opacity-100 cursor-pointer transition-all duration-300 ease"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                                     viewBox="0 0 24 24" stroke="white">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                                </svg>
                                            </div>
                                            <img className={`w-32 mx-auto md:w-44 w-auto rounded-md`}
                                                 src={this.state.userProfile.image_url + "?no-cache"}
                                                 id={"profileImage"}
                                                 alt={"profile image"}/>
                                        </div>
                                        <div className={"relative px-4 pt-4 flex-1 flex flex-col"}>
                                            <div className={"pb-4 w-full h-fit flex-col w-full"}>
                                                <h3 className={"font-bold text-md"}>Name</h3>
                                                <input defaultValue={this.state.userProfile.name} type={"text"}
                                                       className={"font-medium w-full flex-1 outline-0 py-2 border-b-2 border-dotted"}
                                                       name={"name"} placeholder={"Your Name"} required/>
                                            </div>
                                            <div className={"pb-4 w-full h-fit flex-col w-full"}>
                                                <h3 className={"font-bold text-md"}>Bio</h3>
                                                <input defaultValue={this.state.userProfile.bio} type={"text"}
                                                       className={"font-medium w-full flex-1 outline-0 py-2 border-b-2 border-dotted"}
                                                       name={"bio"} placeholder={"Your Bio"} required/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <button id={"saveProfileSettings"} className={"inline-flex w-full justify-center items-center py-1 px-2 font-medium transition-all duration-300 ease text-sm hover:bg-black hover:text-white border-2 border-black rounded-3xl"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg> <span>Save</span>
                                        </button>
                                    </div>
                                    */ }
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>
            </>
        }

        return (
            this.state.loaded ?
                    <>
                    {this.props.appState.user.id === this.state.userProfile.id && <ProfileSettings/>}
                    <Navigation appState={this.props.appState} registerPop={this.props.registerPop} transparent className={"text-white fixed"}/>
                        {
                            this.state.error ?
                                "404"
                                :
                                <>
                                    <header id={"profile-header"} aria-label={"nav-switch"} className={`w-full h-96 md:h-[400px] profile-header bg-gradient-to-r from-cyan-500 to-blue-500`}>
                                        <div className={"backdrop-blur-[4px] w-full h-full flex items-center justify-center"}>
                                            <h1 className={"text-4xl whitespace-pre-wrap px-8 text-center md:-mb-20 md:text-5xl cascadia-code-pl font-extrabold text-white"}>{this.state.userProfile.name}</h1>
                                        </div>
                                    </header>
                                    <div className={"py-8 px-[10vw] lg:px-[10vw] w-full border-b-2 mx-auto flex items-center justify-between"}>
                                        <ul className={"interactions"}><li className={"font-medium"}>{this.state.userProfile.followers} Followers</li><li><button>About</button></li></ul>
                                        <div id={"user-menu"}>
                                            {this.props.appState.user.id === this.state.userProfile.id && <button onClick={this.showPop}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                                                </svg>
                                            </button>}
                                        </div>
                                    </div>
                                    <div className={"w-full h-full flex flex-wrap flex-1 md:min-h-[500px] justify-center"}>
                                        <div className={"xl:flex-1 p-4 h-full w-full"}>
                                            <div id={"side-profile"} className={"w-full hidden xl:block justify-center xl:w-60 flex flex-wrap xl:flex-col xl:ml-auto xl:m-4"}>
                                                <img className={"w-full rounded-2xl aspect-square object-cover"} src={this.state.userProfile.image_url + "?today=" + (new Date()).toDateString()} alt={"author"}/>
                                                <div className={"flex-col"}>
                                                    <span className={"font-bold py-2 block text-lg font-ssp"}>{this.state.userProfile.name}</span>
                                                    <p className={"text-sm text-gray-600 w-44 md:w-60"}>
                                                        {this.state.userProfile.bio}
                                                    </p>
                                                    <FollowButton appState={this.props.appState} registerPop={this.props.registerPop} profile={this.state.userProfile}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={"xl:flex-[2] p-4 pt-0 h-auto flex flex-col items-center w-fit border-x"}>
                                            {
                                                this.state.userProfile.id === this.props.appState.user.id ?
                                                    <Tab.Group as={"div"} className={"w-full transition-all duration-300 ease-in"}>
                                                        <Tab.List className={"flex justify-center items-center"}>
                                                            <Tab key={0} className={({selected}) => classNames("rounded-bl-3xl border-2 w-[110px] border-black px-4 py-2 font-medium border-r-0", selected && "bg-black text-white")}>
                                                                Published
                                                            </Tab>
                                                            <Tab key={1} className={({selected}) => classNames("rounded-br-3xl border-2 w-[110px] border-black px-4 py-2 font-medium border-l-0", selected && "bg-black text-white")}>
                                                                Draft
                                                            </Tab>
                                                        </Tab.List>
                                                        <Tab.Panels>
                                                            <Tab.Panel key={0} className={"flex flex-col items-center"}>
                                                                {
                                                                    this.state.userProfile.posts.map((post) => <StorySnip key={post.id} postID={post}/>)
                                                                }
                                                            </Tab.Panel>
                                                            <Tab.Panel key={1} className={"flex flex-col items-center"}>
                                                                {
                                                                    this.state.userProfile.drafts ? this.state.userProfile.drafts.length === 0 ? <i>No drafts</i> : this.state.userProfile.drafts.map((draft) => <>
                                                                        <article className={"w-full md:w-10/12 max-w-[720px] z-10 border-b"}>
                                                                            <div className={"pt-6 pb-2 flex flex-col items-center"}>
                                                                                <a href={draft.url + "/edit"} className={"w-full"}>
                                                                                    <h1 className={"text-4xl md:text-2xl font-bold mb-2 font-ssp"}>{draft.title}</h1>
                                                                                    <span className={"story-meta"}>
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                        viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                                                    </svg> {new Date(draft.meta.date_published).toDateString()}
                                                                </span>
                                                                                </a>
                                                                                <EditorsTools download={() => {
                                                                                    let data = JSON.stringify(draft);
                                                                                    console.log(data);
                                                                                    let anchor = document.createElement('a');
                                                                                    const file = new Blob([data], {type: 'text/json'});
                                                                                    anchor.href = URL.createObjectURL(file);
                                                                                    anchor.download = `${draft.title}-${draft.id}.json`;
                                                                                    anchor.style.visibility = "hidden";
                                                                                    anchor.click()
                                                                                }} v2={true} action={(a) => this.story_action(draft.id, a)} patch={true} editURL={draft.url + "/edit"} />
                                                                            </div>
                                                                        </article>
                                                                    </>) : null
                                                                }
                                                            </Tab.Panel>
                                                        </Tab.Panels>
                                                    </Tab.Group> :
                                                    this.state.userProfile.posts.map((post) => <StorySnip key={post.id} postID={post}/>)
                                            }
                                        </div>
                                        <div className={"xl:flex-1 p-4 w-full h-full"}/>
                                    </div>
                                </>
                        }
                    <Footer/>
                </>
                :
                <div className={"w-screen h-screen loading"}/>
        )
    }

}

export default Profile;