import React from 'react';
import './Article.css';
import ShareButtons from '../../elements/ShareButtons/ShareButtons';
import {returnGetPost} from "../../api/Posts";

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: returnGetPost(this.props.postID)
        }
    }

    render() {
        return(
            <article>
                <div className="article-info">
                    <h1 className="article-title">{ this.state.post.title }</h1>
                    <h3 className="article-subtitle">{ this.state.post.subtitle }</h3>
                    <div className="article-meta">
                        <div className="author">
                            <div className="author-img">
                                <img src={ this.state.post.author.img } alt={ this.state.post.title }/>
                            </div>
                            <div className="author-info">
                                <span className="author-name">{ this.state.post.author.name }</span>
                                <span className="article-date">{ new Date(Date.parse(this.state.post.meta.date_published)).toDateString() } . 4 min read</span>
                            </div>
                        </div>
                        <ShareButtons/>
                    </div>
                </div>
                <div className="article-body">

                    <div className={"ck-content"} dangerouslySetInnerHTML={{__html: this.state.post.content}} />
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
                    <div className="article-meta">
                        <div className="article-interactions">
                            <div className="article-interact">
                                <i className="far fa-heart"/>
                                <span>{ this.state.post.meta.likes }</span>
                            </div>
                            <div className="article-interact">
                                <i className="far fa-eye"/>
                                <span>{ this.state.post.meta.response + 1 }</span>
                            </div>
                        </div>
                        <ShareButtons/>
                    </div>
                </div>
            </article>
        )
    }
}

export default Article;