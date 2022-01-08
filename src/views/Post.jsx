import React from "react";
import Article from "../components/Article/Article";
import Navigation from "../components/Navigation/Navigation";
import SignUp from "../components/SignUp/SignUp";
import Footer from "../components/Footer";
import {LoadUser} from "../api/SignUp";

class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popState: false,
            email: "",
            activeTab: "login",
            user: LoadUser(),
        }

        this.handlePopState = this.handlePopState.bind(this);
       // this.update = this.update.bind(this);
    }

    handlePopState(args) {
        if(args)
            this.setState({popState: !this.state.popState, email: args["email"], activeTab: args["activeTab"]})
        else
            this.setState({popState: !this.state.popState})
    }

    render() {
        return (
            <>
                <Navigation handlePopState={this.handlePopState} parentState={this.state}/>
                { this.state.popState && !this.state.user && <SignUp parentState={this.state} closePop={this.handlePopState} parentProps={this.props}/> }
                <div className="content-wrapper">
                    <Article postID={this.props.match.params.postURL.split("-").pop()}/>
                    <div className="sidebar">

                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}

export default Post;