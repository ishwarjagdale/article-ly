import './PostCard.css';
import {Link} from "react-router-dom";


function PostCard({post, id}) {
    return (
        <div className="post-card" id={id}>
            <div className="post-thumbnail">
                <Link to={post.url} state={{postID: post.id, from: 'home'}}>
                    <img src={post.thumbnail.url} alt={"postThumbnail:" + id}/>
                </Link>
            </div>
            <div className="post">
                <div className="post-author">
                    <Link to={post.author.url}>
                        <img src={ post.author.img } alt={"authorImage:" + post.author.id}/>
                        <span>{post.author.name}</span>
                    </Link>
                </div>
                <Link to={post.url} state={{postID: post.id, from: 'home'}}><h2>{post.title}</h2></Link>
                <Link to={post.url} state={{postID: post.id, from: 'home'}}><p>{post.subtitle}</p></Link>
                <div className="post-meta">
                    <span>{new Date(Date.parse(post.meta.date_published)).toDateString()}</span>
                    <span className="separator-dot"/>
                    <span>{post.meta.read_time}</span>
                    <span className="separator-dot"/>
                    <span className="post-tag"><a href={`${post.meta.tag.split(",")[0]}`}>{post.meta.tag.split(",")[0]}</a></span>
                </div>
            </div>
        </div>
    )
}

export default PostCard;