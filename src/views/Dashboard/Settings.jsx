import React from 'react';
import Navigation from "../../components/Navigation/Navigation";
import {LoadUser, ReloadUser} from "../../api/AuthAPI";
import './Settings.css';
import Footer from "../../components/Footer";
import Button from "../../elements/Button/Button";
import axios from "axios";
import {getUserSettings} from "../../api/DashAPI";
import FileUpload from "../../components/FIleUpload/FileUpload";

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            value: this.props.value || "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e) {
        this.setState({edit: true, value: e.target.value});
    }
    handleSubmit(e) {
        this.setState({edit: false});
        e.preventDefault()

        return axios.post( process.env.REACT_APP_API_URL + "/auth/settings", {key: [this.props.id, this.state.value]}, {withCredentials: true}
        ).then(r => {
            console.log("sett's", r.data);
            if (r.data) {
                ReloadUser();
                window.location.reload();
            }
        } )
    }

    render(props) {
        const Photo = () => {
            return (
                <>
                    <div className="form-element">
                        <div className="form-element-header">
                            <h3 className="element-title">
                                {this.props.name}
                            </h3>

                        </div>
                        <div className="form-element-content">
                            <div className="left-col">
                                { this.props.description.map(p => <p>{p}</p>) }
                            </div>
                            {
                                this.props.image && <>
                                    <div className="right-col">
                                        <FileUpload for={this.props.id}><img src={this.props.image} id={this.props.id} alt={"image:" + this.props.name}/></FileUpload>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </>
            )
        }
        const Setting = () => {
            return (
                <>
                    <div className="form-element">
                        <div className="form-element-header">
                            <h3 className="element-title">
                                {this.props.name}
                            </h3>
                        </div>
                        <div className="form-element-content">
                            <div className="left-col">
                                <form className="inline-flex" onSubmit={this.handleSubmit}>
                                    { this.props.label && <label>{this.props.label}</label> }
                                    <input id={this.props.id} name={this.props.name} type="text" placeholder={"Add your " + this.props.name}
                                           value={this.state.value}
                                           onChange={this.handleChange}
                                           autoFocus={this.state.edit}
                                    />
                                    {this.state.edit && <div className={"inline-flex"}><Button buttonStyle={"btn-o btn-o-rnd"} onClick={this.handleSubmit}>Save</Button>
                                        <Button buttonStyle={"btn-o btn-o-rnd editB"} onClick={() => {
                                            this.setState({edit: false, value: this.props.value
                                            })
                                        }}>Cancel</Button>
                                    </div>
                                    }
                                </form>
                                { this.props.description.map(p => <p>{p}</p>) }
                            </div>
                            {
                                this.props.image && <>
                                    <div className="right-col">
                                        <img src={this.props.image} alt={"image:" + this.props.name}/>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </>
            )
        }
        return (
            this.props.image ? <Photo/> : <Setting/>
        )
    }

}

class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: LoadUser(),
            settings:  {
                "id": "",
                "name": "",
                "username": "",
                "bio": "",
                "email": "",
                "image_url": ""
            },
            loading: true
        }

        //this.handleChange = this.handleChange.bind(this);
    }
/*
    handleChange(e) {
        console.log(this.state.settings);
        this.setState(state => {state.settings[e.target.id] = e.target.value});
    }
*/
    componentDidMount() {
        let settings = getUserSettings();
        settings.then(res => {
            this.setState({
                settings: res,
                loading: false
            })
        })
    }

    render() {

        return (
            <>
                <Navigation parentState={this.state} fixed widebrand={"dark"}/>
                <div className="page-wrapper mt-60">
                    <div className="overlapper settingAccord">
                        <h2>Settings</h2>
                        <a href={"#profile"}><h3>Profile</h3></a>
                        <a href={"#about"}><h3>About</h3></a>
                    </div>
                    {   !this.state.loading && <div className="content-wrapper setting-container">
                        <h2 id={"profile"}>Profile</h2>
                        <Setting name={"Name"}
                                 id={"name"}
                                 key={"Name"}
                                 value={this.state.settings.name}
                                 description={["Your name appears on your Profile page, as your byline, and in your responses. It is a required field."]}/>
                        <Setting name={"Bio"}
                                 id={"bio"}
                                 key={"Bio"}
                                 value={this.state.settings.bio}
                                 description={["Your bio appears on your Profile and next to your stories. Max 160 characters."]}/>
                        <Setting name={"Photo"}
                                 id={"profileImage"}
                                 key={"Photo"}
                                 image={this.state.settings.image_url}
                                 description={["Your photo appears on your Profile page and with your stories across Journal.", "Recommended size: Square, at least 1000 pixels per side. File type: JPG, PNG or GIF."]}/>
                        <Setting name={"Username & URL"}
                                 id={"username"}
                                 key={"Username & URL"}
                                 value={this.state.settings.username} label={"Username: "}
                                 description={[`Profile URL: ${document.location.origin}/@${this.state.settings.username}`]}/>
                        <Setting name={"Email"}
                                 id={"email"}
                                 key={"Email"}
                                 value={this.state.settings.email}
                                 label={"Your Email: "}
                                 description={["Your email address to contact you, announcements and stuff!"]}/>
                    </div>  }
                </div>
                <Footer />
            </>
        )
    }
}

export default Settings;