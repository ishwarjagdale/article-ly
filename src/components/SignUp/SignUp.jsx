import React from 'react';
import './SignUp.css';
import Button from "../../elements/Button/Button";
import {LoginUser, RegisterUser} from "../../api/AuthAPI";

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.parentState.user,
            activeTab: this.props.parentState.activeTab,
            email: this.props.parentState.email || "",
            name: "",
            password: "",
            rememberMe: false,
        }
        this.closePop = this.closePop.bind(this);
        this.forgotPassTab = this.forgotPassTab.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    closePop(e) {
        if(e.target.id === "popUpOverlay") {
            this.props.closePop();
        }
    }

    forgotPassTab(e) {
        e.preventDefault();
        this.setState({activeTab: "forgotpass"})
    }

    handleChange(e) {
        this.setState((state) => {state[e.target.name] = e.target.value});
    }

    handleSignIn(e) {
        e.preventDefault();
        LoginUser(this.state.email, this.state.password, this.state.rememberMe).then(res => {
            console.log(res);
            if (res[0]) {
                window.location.reload();
            } else {
                console.log(res[1]);
            }
        })

    }
    handleSignUp(e) {
        e.preventDefault();
        RegisterUser(this.state.name, this.state.email, this.state.password).then(
            res => {
                if(res[0]) {
                    this.handleSignIn(e);
                } else {
                    console.log(res[1]);
                }
            }
        )
    }

    render() {
        const SignUpForm = () => {
            return <div className="pop-up-container">
                <div className="pop-up-title">
                    <h3>
                        Join
                    </h3>
                    <div className="nav-brand">
                        <span>journal</span><span className="period">.</span>
                    </div>
                </div>
                <p className="pop-up-desc">
                    Create an account!
                </p>
                <form id={"signup-form"} onSubmit={this.handleSignUp}>
                    <fieldset>
                        <i className="fas fa-user" />
                        <input type="text" name="name" required={true} placeholder="Name" onChange={this.handleChange} autoFocus={true}/>
                    </fieldset>
                    <fieldset>
                        <i className="fas fa-envelope" />
                        <input type="text" name="email" required={true} placeholder="Email" defaultValue={this.state.email} onChange={this.handleChange}/>
                    </fieldset>
                    <fieldset>
                        <i className="fas fa-key" />
                        <input type="password" name="password" required={true} placeholder="Password" onChange={this.handleChange}/>
                    </fieldset>
                    <Button buttonStyle="btn-o btn-o-rnd blue" type="submit" onClick={this.handleSignUp}>Sign up</Button>
                </form>
            </div>
        }
        const LoginForm = () => {
            return <div className="pop-up-container">
                <div className="pop-up-title">
                    <h3 className="bold-alt">
                        Welcome Back!
                    </h3>
                </div>
                <p className="pop-up-desc">

                </p>
                <form id={"signin-form"} onSubmit={this.handleSignIn}>
                    <fieldset>
                        <i className="fas fa-user" />
                        <input type="text" name="email" onChange={this.handleChange} required={true} autoFocus={true} placeholder="Email"/>
                    </fieldset>
                    <fieldset>
                        <i className="fas fa-key" />
                        <input type="password" name="password" onChange={this.handleChange} required={true} placeholder="Password"/>
                    </fieldset>
                    <fieldset className="inline-padded jc-sb ai-c">
                        <div>
                            <input type="checkbox" name="rememberMe" onChange={this.handleChange}/>
                            <label>Remember me</label>
                        </div>
                        <div>
                            <a href="/" onClick={this.forgotPassTab}>Forgot Password</a>
                        </div>
                    </fieldset>
                    <Button buttonStyle="btn-o btn-o-rnd blue" type="submit" onClick={this.handleSignIn}>Login</Button>
                </form>
            </div>
        }
        const ForgotPassForm = () => {
            return <></>
        }

        return (

            <div className="pop-up" id="popUpOverlay" onClick={this.closePop}>
            {
                this.state.activeTab === "signup" ? <SignUpForm/> :
                    this.state.activeTab === "forgotpass" ? <ForgotPassForm/> :
                        <LoginForm/>
            }
        </div>
        )
    }
}

export default SignUp;