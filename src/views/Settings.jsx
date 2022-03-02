import React from "react";
import Navigation from "../Components/Navigation";
import Footer from "../Components/Footer";
import {getUserSettings, uploadImage} from "../api/DashAPI";
import axios from "axios";
import {ReloadUser} from "../api/AuthAPI";


class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            setting: {
                name: '',
                bio: '',
                image_url: '',
                username: '',
                email: '',
            },
            loaded: false,
            enableSubmit: false,
            bak: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.toggleSubmit = this.toggleSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState(state => {state.setting[e.target.name] = e.target.value});
        this.toggleSubmit();
    }

    componentDidMount() {
        document.title = "Settings | Journal"
        getUserSettings().then((res) => {
            console.log(res);
            this.setState({setting: {...res}, loaded: true, bak: {...res}});
        });
        console.log(this.state);
    }

    toggleSubmit() {
        if(this.state.bak !== this.state.setting) {
            if (this.state.enableSubmit === false) this.setState({enableSubmit: true})
        }
        else {
            if (this.state.enableSubmit) this.setState({enableSubmit: false})
        }
    }

    handleSubmit(e) {
        this.setState({enableSubmit: false});
        return axios.post( process.env.REACT_APP_API_URL + "/auth/settings", {...this.state.setting}, {withCredentials: true}
        ).then(r => {
            console.log("sett's", r.data);
            if (r.data) {
                ReloadUser();
                window.location.reload();
            }
        } )
    }

    getFile(e) {
        window.busy = true
        let file = e.target.files[0]
        console.log(file)
        uploadImage(file, e.target.ariaLabel).then((data) => {
            console.log(data);
            document.getElementById("profileImage").src = data.url;
            window.busy = false;
        })
    }

    render() {
        return (
            <>
                <Navigation appState={this.props.appState} submit={this.state.enableSubmit} handleSubmit={this.handleSubmit} className={"text-white fixed"}/>
                <div id={"content"} className={"font-ssp container md:my-24 p-4 md:p-0 flex flex-col items-center w-full max-w-[1440px] h-full mx-auto mt-20"}>
                    <div className={"mx-4 w-full md:w-10/12 max-w-[720px] flex-col relative"}>
                        <h2 className={"text-3xl font-bold font-ssp bbr"}>
                            Settings
                        </h2>
                        {
                            this.state.loaded ?
                                <>
                                    <div className={"flex-col p-4 w-full flex w-full md:max-w-md"}>
                                        <h3 className={"font-bold text-lg py-2"}>Name</h3>
                                        <input onChange={this.handleChange} defaultValue={this.state.setting.name} type={"text"} className={"font-medium outline-0 py-2 border-b-2 border-dotted"} name={"name"} placeholder={"Your Name"} required/>
                                        <p className={"pt-2 text-sm text-gray-600 max-w-md"}>Your name appears on your Profile page, as your byline, and in your responses. It is a required field.</p>
                                    </div>
                                    <div className={"flex-col p-4 w-full flex w-full md:max-w-md"}>
                                        <h3 className={"font-bold text-lg py-2"}>Bio</h3>
                                        <input onChange={this.handleChange} defaultValue={this.state.setting.bio} type={"text"} className={"font-medium outline-0 py-2 border-b-2 border-dotted"} name={"bio"} placeholder={"Your Bio"} required/>
                                        <p className={"pt-2 text-sm text-gray-600 max-w-md"}>Your bio appears on your Profile and next to your stories. Max 160 characters.</p>
                                    </div>
                                    <div className={"flex-col p-4 w-full flex w-full"}>
                                        <h3 className={"font-bold text-lg py-2"}>Photo</h3>
                                        <div className={"flex justify-between flex-wrap"}>
                                            <div className={"flex-1"}>
                                                <p className={"pt-2 text-sm text-gray-600 min-w-sm"}>Your photo appears on your Profile page and with your stories across Journal.</p>
                                                <p className={"pt-2 text-sm text-gray-600 min-w-sm"}>Recommended size: Square, at least 1000 pixels per side. File type: JPG, PNG or GIF.</p>
                                            </div>
                                            <div className={"relative flex-1 justify-center flex"}>
                                                <input onInput={this.getFile} aria-label={"profileImage"} type={"file"} accept={"image/*"} name={"image_url"} id={"profile-picker"} hidden/>
                                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => document.getElementById("profile-picker").click()} className="h-full w-24 p-8 absolute bg-black bg-opacity-75 opacity-0 hover:opacity-100 cursor-pointer transition-all duration-300 ease"  fill="none" viewBox="0 0 24 24" stroke="white">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <img className={`w-32 mx-auto md:w-24 w-auto rounded-md`}
                                                     src={this.state.setting.image_url}
                                                     id={"profileImage"}
                                                     alt={"profile image"}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"flex-col p-4 w-full flex w-full md:max-w-md"}>
                                        <h3 className={"font-bold text-lg py-2"}>Username & URL</h3>
                                        <div className={"flex items-center"}>
                                            <label className={"mr-2"}>Username:</label>
                                            <input onChange={this.handleChange} defaultValue={this.state.setting.username} type={"text"} className={"font-medium flex-1 outline-0 py-2 border-b-2 border-dotted"} name={"username"} placeholder={"Your Username"} required/>
                                        </div>
                                        <p className={"pt-2 text-sm text-gray-600 max-w-md"}>Profile URL: https://article-ly.pages.dev/@{this.state.setting.username}</p>
                                    </div>
                                    <div className={"flex-col p-4 w-full flex w-full md:max-w-md"}>
                                        <h3 className={"font-bold text-lg py-2"}>Email Address</h3>
                                        <input onChange={this.handleChange} defaultValue={this.state.setting.email} type={"email"} className={"font-medium flex-1 outline-0 py-2 border-b-2 border-dotted"} name={"email"} placeholder={"Your Email"} required/>
                                        <p className={"pt-2 text-sm text-gray-600 max-w-md"}>Your email address to contact you, announcements and stuff!</p>
                                    </div>
                                </>
                                :
                                <>
                                    <div className={"flex-col p-4 w-full flex w-full"}>
                                        <div className={"my-2 h-12 max-w-[200px] loading"}/>
                                        <div className={"h-8 loading"}/>
                                        <div className={"mt-2 h-8 w-md max-w-md loading"}/>
                                    </div>
                                    <div className={"flex-col p-4 w-full flex w-full"}>
                                        <div className={"my-2 h-12 max-w-[200px] loading"}/>
                                        <div className={"h-8 loading"}/>
                                        <div className={"mt-2 h-8 w-md max-w-md loading"}/>
                                    </div>
                                    <div className={"flex-col p-4 w-full flex w-full"}>
                                        <div className={"my-2 h-12 max-w-[200px] loading"}/>
                                        <div className={"h-8 loading"}/>
                                        <div className={"mt-2 h-8 w-md max-w-md loading"}/>
                                    </div>
                                </>
                        }
                    </div>
                </div>
                <Footer />
            </>
        )
    }

}

export default Settings;