import React from 'react';
import './Article.css';
import ShareButtons from '../../elements/ShareButtons/ShareButtons';
import {get_post, likePost} from "../../api/ArticlesAPI";

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            loading: true,
            size: this.props.size === undefined ? 1 : this.props.size
        }

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
            if(this.props.size) document.title = res.title;
            this.setState({
                post: res,
                loading: false
            })
        })
    }

    render() {
        if(!this.state.loading)
            return(
                <article key={this.props.postID}>
                    <div className="article-info">
                        { this.state.size ? <h1 className="article-title">{this.state.post.title}</h1>
                        : <a className={"no-decor"} href={`/s/${this.state.post.title.replaceAll(" ", "-")}-${this.state.post.id}`}><h1 className="article-title">{this.state.post.title}</h1></a>
                        }
                        <h3 className="article-subtitle">{this.state.post.subtitle}</h3>
                        { this.state.size ? <div className="article-meta">
                            <div className="author">
                                <a href={this.state.post.author.url} className="author-img">
                                    <img src={this.state.post.author.img} alt={this.state.post.title}/>
                                </a>
                                <div className="author-info">
                                    <a href={this.state.post.author.url}
                                       className="author-name">{this.state.post.author.name}</a>
                                    <span
                                        className="article-date">{new Date(Date.parse(this.state.post.meta.date_published)).toDateString()} . 4 min read</span>
                                </div>
                            </div>
                            <ShareButtons parentState={this.state}/>
                        </div> : null }
                    </div>
                    <div className="article-body">

                        <div className={this.state.size ? "ck-content" : "ck-content shrink"} dangerouslySetInnerHTML={{__html: this.state.post.content}} />
                        {this.state.size ? null : "..."}
                    </div>
                    <div className="article-footer">
                        <div className="article-tags">
                            <span>Tags: </span>
                            <ul>
                                {
                                    this.state.post.meta.tag.split(",").map(tag => {
                                        return (
                                            <li><a href={"/tag/" + tag.trim()}>{ tag.trim() }</a></li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        { this.state.size ? <div className="article-meta">
                            <div className="article-interactions">
                                <div className="article-interact" onClick={this.handleLikes}>
                                    <i className="fas fa-hands-clapping"/>
                                    <span id={"likeCounter"}>{this.state.post.meta.likes}</span>
                                </div>
                                <div className="article-interact">
                                    <i className="far fa-eye"/>
                                    <span id={"viewCounter"}>{this.state.post.meta.response}</span>
                                </div>
                            </div>
                            <ShareButtons parentState={this.state}/>
                        </div> : <div className={"separator"}/>}
                    </div>
                </article>
            )
        return (
            <>
                <div className={"titleBlock loading"}/>
                <div className={"subtitleBlock loading"}/>
                <div className={"postInfoBlock loading"}/>
                <div className={"postBodyBlock loading"}/>
                <div className={"postFooterBlock loading"}/>
            </>
        )
    }
}

export default Article;