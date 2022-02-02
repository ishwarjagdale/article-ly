import React from 'react';
import Button from '../../elements/Button/Button';
import './Navigation.css';
import Search from "../Search/Search";

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hoverActive: false,
            disableNewStory: this.props.hasOwnProperty('disableNewStory'),
            publishStory: this.props.hasOwnProperty('publishStory'),
            email: "",
            activeTab: "login",
            searchVisible: false,
        }

        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleHover = this.handleHover.bind(this);
        this.handleSearchWindow = this.handleSearchWindow.bind(this);
    }

    handleSearchWindow() {
        document.body.classList.toggle("stop-scrolling")
        this.setState({searchVisible: !this.state.searchVisible});
    }
    handleSignIn(e) {
        e.preventDefault();
        this.props.handlePopState({email: this.state.email, activeTab: "login"});
    }
    handleSignUp() {
        this.props.handlePopState({email: "", activeTab: "signup"})
    }
    handleHover() {
        this.setState({hoverActive: !this.state.hoverActive});
    }

    render() {
        const UserDropDown = () => {
            return (
                <>
                    <div className="drop-down-container">
                        <ul>
                            <li><a href={`/@${this.props.parentState.user.username}`}><i className="fas fa-user"/><span>Profile</span></a></li>
                            <li><a href={"/settings"}><i className="fas fa-gear"/><span>Settings</span></a></li>
                            <li><a href={"/logout"}><i className="fas fa-sign-out-alt"/><span>Logout</span></a></li>
                        </ul>
                    </div>
                </>
            )
        }

        return(
            <>
                <div className={this.props.fixed ? "navigation fix-nav" : "navigation"}>
                    <div className="nav-wrapper">
                        { this.props.widebrand &&
                            <a href="/" className="nav-brand">
                                <img src={this.props.widebrand === "dark" ? "/journal-1b.png" : "/journal-1.png"}/>
                            </a>
                        }
                        <ul className="nav-list">

                            { this.props.navListLogo &&
                                <li className="nav-item">
                                    <a href="/"><img className={"nav-logo"} src={"/journal-2.png"}/></a>
                                </li>
                            }

                            {this.props.parentState.user === false ? <>

                                <li className="nav-item">
                                    <Button buttonStyle="btn-o btn-o-rnd" onClick={this.handleSignUp}>Get
                                        Started</Button>
                                </li>

                                <li className="nav-item">
                                    <a href="/" onClick={this.handleSignIn}>Sign in</a>
                                </li>

                            </> :
                            <>
                                <li className="nav-item">
                                    <img className={`nav-user${this.state.hoverActive ? " hoverAn" : ""}`}
                                         src={this.props.parentState.user.image_url} alt={"userImage"} onClick={this.handleHover}/>
                                <div onMouseLeave={this.handleHover}>
                                    {this.state.hoverActive ? <UserDropDown/> : null}
                                </div>

                                </li>
                                <li className="nav-item">
                                    <i className="fas fa-bookmark navi-icon"/>
                                </li>

                                {
                                    !this.state.disableNewStory && <li className="nav-item">
                                    <a className="btn-o btn-o-rnd" href={"/new-story"}><i
                                        className="fas fa-plus-circle"/> New Story</a>
                                    </li>
                                }
                                {
                                    this.state.publishStory && <li className="nav-item">
                                        <Button buttonStyle={"btn-o btn-o-rnd green-accent"} onClick={this.props.publishStory}>Publish</Button>
                                    </li>
                                }

                            </>}
                            {
                                this.props.search &&
                                <li className="nav-item">
                                    <i onClick={this.handleSearchWindow} className="fas fa-search navi-icon"/>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
                {
                    this.state.searchVisible && <Search toggleWindow={this.handleSearchWindow}/>
                }
            </>
        )
    }
}

export default Navigation;