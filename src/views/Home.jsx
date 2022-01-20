import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import PostCard from '../components/PostCard/PostCard';
import SignUp from "../components/SignUp/SignUp";
import Footer from "../components/Footer";
import {LoadUser} from "../api/AuthAPI";
import {get_posts} from "../api/ArticlesAPI";

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            popState: false,
            email: "",
            activeTab: "login",
            user: LoadUser(),
            loaded: false
        }

        this.handlePopState = this.handlePopState.bind(this);
    }
    componentDidMount() {
        console.log(this.state.user);
        let data = get_posts();
        data.then(res => {
            this.setState({
                posts: res,
                loaded: true
            })
        })

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
                        {
                            this.state.loaded ?
                                this.state.posts.map((post) => {
                                    return <PostCard id={post.id} post={post} key={post.id}/>
                                })
                            :
                                <>
                                    <div className={"a"}>
                                        <div className={"b"}>
                                            <div className={"d loading"}/>
                                            <div className={"e loading"}/>
                                        </div>
                                        <div className={"c loading"}/>
                                    </div>
                                    <div className={"a"}>
                                        <div className={"b"}>
                                            <div className={"d loading"}/>
                                            <div className={"e loading"}/>
                                        </div>
                                        <div className={"c loading"}/>
                                    </div>
                                </>
                        }
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