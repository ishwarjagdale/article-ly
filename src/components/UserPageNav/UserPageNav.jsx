import React from 'react';
import Button from "../../elements/Button/Button";
import {Link} from "react-router-dom";

class UserPageNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hoverActive: false,
        }

        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleHover = this.handleHover.bind(this);
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

    componentDidMount() {
        console.log("HH: ", this.props.parentState.user);
    }


    render() {
        const UserDropDown = () => {
            return (
                <>
                    <div className="drop-down-container">
                        <ul>
                            <li><Link to={`/@${this.props.parentState.user.username}`}><i className="fas fa-user"/><span>Profile</span></Link></li>
                            <li><Link to={"/setting"}><i className="fas fa-gear"/><span>Settings</span></Link></li>
                            <li><Link to={"/logout"}><i className="fas fa-sign-out-alt"/><span>Logout</span></Link></li>
                        </ul>
                    </div>
                </>
            )
        }

        return (
            <>
                <div className="navigation">
                    <div className="nav-wrapper">
                        <a href="/" className="nav-brand">
                            <span>{this.props.parentState.user.name}</span>
                        </a>
                        <ul className="nav-list">
                            {this.props.parentState.user === false ? <>
                                    <li className="nav-item">
                                        <Button buttonStyle="btn-o btn-o-rnd" onClick={this.handleSignUp}>Get
                                            Started</Button>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/sign-in" onClick={this.handleSignIn}>Sign in</a>
                                    </li>
                                </> :
                                <>
                                    <li className="nav-item">
                                        <img className={`nav-user${this.state.hoverActive ? " hoverAn" : ""}`}
                                             src={this.props.parentState.user.image_url} onClick={this.handleHover}/>
                                        <div onMouseLeave={this.handleHover}>
                                            {this.state.hoverActive ? <UserDropDown/> : null}
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a className="btn-o btn-o-rnd"><i className="fas fa-plus-circle"/> New Story</a>
                                    </li>
                                </>}
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}

export default UserPageNav;
