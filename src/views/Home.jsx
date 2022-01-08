import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import PostCard from '../components/PostCard/PostCard';
import SignUp from "../components/SignUp/SignUp";
import Footer from "../components/Footer";
import {LoadUser} from "../api/SignUp";
import {returnGetPosts} from "../api/Posts";

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: returnGetPosts(),
            popState: false,
            email: "",
            activeTab: "login",
            user: LoadUser()
        }

        this.handlePopState = this.handlePopState.bind(this);
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
                <HeroSection handleHeroSubmit={this.handlePopState} parentState={this.state}/>
                <div className="content-wrapper">
                    <div id="posts-container">
                        {this.state.posts.map((post) => {
                            return <PostCard id={post.id} post={post}/>
                        })}
                    </div>
                    <div className="sidebar">

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

export default Home;