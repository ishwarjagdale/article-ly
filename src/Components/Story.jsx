import React from "react";
import {get_post, likePost} from "../api/ArticlesAPI";

class Story extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post: [],
            loaded: false,
        };
        this.handleLikes = this.handleLikes.bind(this);
    }

    handleLikes() {
        likePost(this.state.post.id).then(r=> {});
        this.setState({
            post: {
                ...this.state.post,
                meta: {
                    ...this.state.post.meta,
                    likes: this.state.post.meta.likes + 1
                }
            }
        });
    }

    componentDidMount() {
        let article = get_post(this.props.postID);
        article.then(res => {
            document.title = res.title + " | Journal";
            this.setState({
                post: res,
                loaded: true
            })
        })
    }

    render() {
        return (
            <>
                <div id={"content"}
                     className={"mt-16 container p-4 md:p-0 w-full max-w-[1440px] mx-auto flex justify-center flex-col items-center"}>
                    {
                        this.state.loaded ?
                        <article className={"w-full md:w-10/12 max-w-[720px]"}>
                        <div className={"pt-6 pb-2"}>
                            <h1 className={"text-4xl md:text-5xl font-bold font-ssp"}>{this.state.post.title}</h1>
                            <h3 className={"text-lg mt-4 font-light md:text-2xl font-ssp"}>{this.state.post.subtitle}</h3>

                                <div className={"flex justify-between items-center my-4 flex-wrap"}>
                                    <div className={"flex my-4 items-center w-full md:w-6/12"}>
                                        <a href={this.state.post.author.url}>
                                            <img
                                                className={"w-10 h-10 border-2 mr-3 p-[2px] border-black rounded-3xl border-2"}
                                                src={this.state.post.author.img}
                                                alt={"author"}/>
                                        </a>
                                        <div className={"flex-col "}>
                                            <a href={this.state.post.author.url} className={"font-medium text-sm "}>{this.state.post.author.name}</a>
                                            <div className={"flex items-center"}>
                                            <span className={"story-meta"}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                                                {new Date(this.state.post.meta.date_published).toDateString()}
                            </span>
                                                <span className={"separator-dot"}/>
                                                <span className={"story-meta"}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                                    {Math.ceil(this.state.post.meta.read_time / 200)} min read
                            </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"text-2xl w-full md:w-6/12 text-center md:w-fit"}>
                                        <a className={"fab fa-twitter-square mr-3"} href={`https://twitter.com/share?text=${this.state.post.title}&url=${window.location.href}&hashtags=${this.state.post.meta.tag.replace(" ", "")}`}/>
                                        <a className={"fab fa-facebook-square mr-3"} href={"https://www.facebook.com/sharer/sharer.php?u=" + window.location.href}/>
                                        <a className={"fab fa-linkedin mr-3"} href={"/"}/>
                                    </div>
                                </div>
                        </div>
                        <div className={"ck-content w-full"} dangerouslySetInnerHTML={{__html: this.state.post.content}}>

                        </div>
                            <div className={"mx-auto flex justify-center"}>...</div>
                        <div className={`border-b-2 mt-8`}>
                            <div className={"flex my-4 items-center"}>
                                <span className={"text-sm font-ssp font-medium mr-2"}>Tags: </span>
                                <div className={"story-meta"}>
                                    {
                                        this.state.post.meta.tag.split(",").map((tag) => <span className={"tag mx-2 p-2 rounded-md"}>{String(tag).trim()}</span>)
                                    }
                                </div>
                            </div>

                            <div className={"flex items-center justify-between mb-4"}>
                                    <div className={"flex items-center"}>
                                        <div className={"m-2 flex items-center"}>
                                            <svg onClick={this.handleLikes} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                            </svg>
                                            <span className={"font-medium text-sm mx-2"}>{this.state.post.meta.likes}</span>
                                        </div>
                                        <div className={"m-2 flex items-center"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                            </svg>
                                            <span className={"font-medium text-sm mx-2"}>{this.state.post.meta.response}</span>
                                        </div>
                                    </div>
                                    <div className={"text-2xl"}>
                                        <a className={"fab fa-twitter-square mr-3"} href={`https://twitter.com/share?text=${this.state.post.title}&url=${window.location.href}&hashtags=${this.state.post.meta.tag.replace(" ", "")}`}/>
                                        <a className={"fab fa-facebook-square mr-3"} href={"https://www.facebook.com/sharer/sharer.php?u=" + window.location.href}/>
                                        <a className={"fab fa-linkedin mr-3"} href={"/"}/>
                                    </div>
                                </div>

                        </div>
                    </article>
                            :
                        <>

                        </>
                    }
                </div>
            </>
        )
    }

}

export default Story;