import React from 'react';

class StoryCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className={this.props.className}>
                <div className={`flex flex-wrap md:flex-nowrap md:px-4 md:py-2 rounded-2xl flex-row-reverse justify-between max-w-3xl pb-4 border-b mb-4 md:mb-0 md:border-0 bg-white`}>
                    <a href={this.props.post.url}>
                        <img className={`md:h-[150px] md:w-[250px] object-cover w-full w-auto mb-2 md:m-4 rounded-md`}
                             src={this.props.post.thumbnail.url}
                             alt={"featured-story-thumbnail"}/>
                    </a>
                    <div className={"md:p-4 flex-1 flex-col w-full md:w-6/12 lg:max-w-[600px] px-2"}>
                        <div className={"flex my-2"}>
                            <a href={this.props.post.author.url} className={"flex items-center"}>
                                <img className={"rounded-full mr-2 w-[1.6rem] h-6 border-2 border-black"}
                                     src={this.props.post.author.img}
                                     alt={"author"}/>
                                <span className={"mr-2 text-sm font-semibold"}>{this.props.post.author.name}</span>
                            </a>
                        </div>
                        <a href={this.props.post.url}>
                            <h3 className={"text-xl font-ubuntu mt-2 font-bold"}>{this.props.post.title}</h3>
                        </a>
                        <p className={`mt-2 font-medium text-[#535353] font-ssp text-[15px] w-full max-h-[20px] md:max-h-[44px] lg:h-auto lg:overflow-visible overflow-hidden`}>{this.props.post.subtitle}
                        </p>
                        <div className={"flex my-2 items-center"}>
                            <span className={"story-meta"}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                                <i>{new Date(this.props.post.meta.date_published).toDateString()}</i>
                            </span>
                            <span className={"separator-dot"}/>
                            <span className={"story-meta"}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <i>{Math.ceil(this.props.post.meta.read_time / 200)} min read</i>
                            </span>
                            <span className={"separator-dot"}/>
                            <div className={"story-meta"}>
                                <span>{this.props.post.meta.tag.split(" ")[0]}</span>
                            </div>
                        </div>
                        { this.props.featured && <div className={"view-btn"}>
                            <hr className={"backline"}/>
                            <span>View Story</span></div>
                        }
                        { this.props.featured && <div className={"flex mt-4"}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                            </svg>
                        </div>}
                    </div>
                </div>
            </div>
        )
    }

}

export default StoryCard;