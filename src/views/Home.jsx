import React from "react";
import Navigation from "../Components/Navigation";
import HeroSection from "../Components/HeroSection";
import StoryCard from "../Components/StoryCard";
import Footer from "../Components/Footer";
import {get_populars, get_posts, get_tags, getSaved} from "../api/ArticlesAPI";
import {notify} from "../js/notifier";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            loaded: false,
            populars: false,
            tag: this.props.tag ? window.location.pathname.split("/").pop() : null,
            tags: false,
        };
    }

    componentDidMount() {
        document.title = "Journal";
        let data = this.props.saved ? getSaved() : this.props.tag ? get_posts(this.state.tag) : get_posts();
        data.then(res => {
            console.log(res);
            this.setState({
                posts: res,
                loaded: true
            })
        }).then(() => {
            if(!this.props.saved) {
                get_populars().then((res) => {
                    console.log(res);
                    this.setState({populars: res});
                });

                get_tags().then((res) => {
                    console.log(res);
                    this.setState({tags: res});
                });
            }
        });

        // notify("Welcome!", "success");

    }

    render() {
        return (
            <>
                <Navigation transparent appState={this.props.appState} registerPop={this.props.registerPop} className={"text-white"}/>
                <HeroSection appState={this.props.appState} registerPop={this.props.registerPop}/>
                <div className={`flex flex-wrap flex-col lg:flex-row lg:mx-20 mt-4 justify-center`}>
                    <div id={"content"} className={`md:mt-12 container md:my-8 p-4 md:p-0 flex-[2] ${this.props.saved ? "max-w-[1200px]" : "max-w-[1024px]"} h-full flex flex-col`}>
                        { this.props.saved && <h2 className={"p-4 text-2xl font-bold font-ssp border-b-2 mb-4 md:mb-8"}>Saved Stories</h2> }
                        { this.props.tag && <h2 className={"p-4 text-2xl font-bold font-ssp border-b-2 mb-4 md:mb-8"}>Tag: <i>{this.state.tag}</i></h2> }
                        {/* <StoryCard featured/><hr className={"my-4"}/> */}
                        {
                            this.state.loaded ?
                                this.state.posts.map((post) => {
                                    return <StoryCard saved={this.props.saved} id={post.id} post={post} key={post.id}/>
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
                    {
                        !this.props.saved && <div id={"side-content"} className={"flex-1 md:mt-8 w-full xl:max-w-[400px] min-w-[350px]"}>
                            {
                                this.state.populars || this.state.populars.length ?
                                    <>
                                        <div id={"pops-section"} className={"p-8 w-full"}>
                                            <h3 className={"font-bold font-ssp text-xl pb-4 border-b w-full "}>Popular Posts</h3>
                                            <ul className={"flex mt-4 flex-col"}>
                                                {
                                                    this.state.populars.map((pop) => {
                                                        return <li>
                                                            <a href={pop.url} className={"flex my-2"}>
                                                                <img src={pop.thumbnail.url} className={"aspect-[3/2] max-h-[40px] rounded-sm object-cover"} />
                                                                <h2 className={"font-bold ml-4 font-ssp text-[18px]"}>{pop.title}</h2>
                                                            </a>
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </>
                                    :
                                    <div className={"md:p-4 flex-col w-full max-w-[600px] px-6"}>
                                        <div className={"flex flex-col my-2"}>
                                            <div className={"h-[20px] w-6/12 mr-4 loading"}/>
                                            <div className={"h-[8px] w-full my-2 loading"}/>
                                        </div>
                                        <div className={"flex mb-3 items-center"}>
                                            <div className={"aspect-[3/2] h-[40px] rounded-sm object-cover loading"} />
                                            <div className={"h-[40px] ml-4 w-9/12  loading"}/>
                                        </div>
                                        <div className={"flex mb-3 items-center"}>
                                            <div className={"aspect-[3/2] h-[40px] rounded-sm object-cover loading"} />
                                            <div className={"h-[40px] ml-4 w-4/12 loading"}/>
                                        </div>
                                        <div className={"flex mb-3 items-center"}>
                                            <div className={"aspect-[3/2] h-[40px] rounded-sm object-cover loading"} />
                                            <div className={"h-[40px] ml-4 w-full loading"}/>
                                        </div>
                                    </div>
                            }
                            {
                                this.state.tags || this.state.tags.length ?
                                    <>
                                        <div id={"pops-section"} className={"p-8 w-full"}>
                                            <h3 className={"font-bold font-ssp text-xl pb-4 border-b w-full "}><i>#</i> Tags</h3>
                                            <div className={"flex flex-wrap w-full mt-4"}>
                                                {
                                                    this.state.tags.map((tag) => {
                                                        return <a href={"/tag/" + tag} className={"p-2 px-4 m-2 mx-1 bg-gray-200 rounded-2xl text-[12px] hover:bg-[#e4e4e4]"}>{tag.toString()}</a>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <div className={"md:p-4 flex-col w-full max-w-[600px] px-6"}>
                                        <div className={"flex flex-col my-2"}>
                                            <div className={"h-[20px] w-6/12 mr-4 loading"}/>
                                            <div className={"h-[8px] w-full my-2 loading"}/>
                                        </div>
                                        <div className={"flex mb-3 items-center"}>
                                            <div className={"aspect-[3/2] h-[40px] rounded-sm object-cover loading"} />
                                            <div className={"h-[40px] ml-4 w-9/12  loading"}/>
                                        </div>
                                        <div className={"flex mb-3 items-center"}>
                                            <div className={"aspect-[3/2] h-[40px] rounded-sm object-cover loading"} />
                                            <div className={"h-[40px] ml-4 w-4/12 loading"}/>
                                        </div>
                                        <div className={"flex mb-3 items-center"}>
                                            <div className={"aspect-[3/2] h-[40px] rounded-sm object-cover loading"} />
                                            <div className={"h-[40px] ml-4 w-full loading"}/>
                                        </div>
                                    </div>
                            }
                        </div>
                    }
                </div>
                <Footer/>
            </>
        )
    }
}

export default Home;