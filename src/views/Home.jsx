import React from "react";
import Navigation from "../Components/Navigation";
import HeroSection from "../Components/HeroSection";
import StoryCard from "../Components/StoryCard";
import Footer from "../Components/Footer";
import {get_posts, getSaved} from "../api/ArticlesAPI";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            loaded: false,
        };
    }

    componentDidMount() {
        document.title = "Journal";
        let data = this.props.saved ? getSaved() : get_posts();
        data.then(res => {
            console.log(res);
            this.setState({
                posts: res,
                loaded: true
            })
        })

    }

    render() {
        return (
            <>
                <Navigation transparent appState={this.props.appState} registerPop={this.props.registerPop} className={"text-white"}/>
                <HeroSection appState={this.props.appState} registerPop={this.props.registerPop}/>
                <div className={"flex flex-wrap flex-col lg:flex-row lg:mx-20 mt-4 justify-center"}>
                    <div id={"content"} className={"md:mt-12 container md:my-8 p-4 md:p-0 flex-[2] max-w-[1024px] h-full flex flex-col"}>
                        { this.props.saved && <h2 className={"p-4 text-2xl font-bold font-ssp border-b-2 mb-4 md:mb-8"}>Saved Stories</h2> }
                        {/* <StoryCard featured/><hr className={"my-4"}/> */}
                        {
                            this.state.loaded ?
                                this.state.posts.map((post) => {
                                    return <StoryCard id={post.id} post={post} key={post.id}/>
                                })
                                :
                                <>
                                    <div className={`flex flex-wrap md:flex-nowrap md:px-4 justify-center lg:justify-start pb-4 border-b mb-4 md:mb-0 md:border-0`}>
                                        <div className={"md:h-[168px] h-[200px] w-full md:w-[300px] mb-2 md:m-4 loading rounded"} />
                                        <div className={"md:p-4 flex-col w-full md:w-6/12 lg:max-w-[600px] px-2"}>
                                            <div className={"flex my-2"}>
                                                <div className={"h-[20px] w-[20px] mr-4 loading rounded-full"}/>
                                                <div className={"h-[20px] w-[100px] mr-4 loading"}/>
                                            </div>
                                            <div className={"h-[30px] my-4 w-[250px] loading"}/>
                                            <div className={"flex my-2 items-center"}>
                                                <div className={"h-[16px] w-[100px] mr-4 loading"}/>
                                                <div className={"h-[16px] w-[100px] mr-4 loading"}/>
                                                <div className={"h-[16px] w-[100px] loading"}/>
                                            </div>
                                            <div className={"h-[36px] mt-4 w-full flex-1 md:max-w-[500px] loading"}/>
                                        </div>
                                    </div>
                                </>
                        }
                    </div>
                    <div id={"side-content"} className={"flex-1 md:mt-8 w-full max-w-[450px] min-w-[350px]"}>

                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}

export default Home;