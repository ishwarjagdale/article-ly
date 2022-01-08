import './PostCard.css';


function PostCard({post, id}) {
    return (
        <div className="post-card" id={id}>
            <div className="post-thumbnail">
                <a href={post.url}>
                    <img src={post.thumbnail.url} alt={"postThumbnail:" + id}/>
                </a>
            </div>
            <div className="post">
                <div className="post-author">
                    <a href={post.author.url}>
                        <img src={ post.author.img } alt={"authorImage:" + post.author.id}/>
                        <span>{post.author.name}</span>
                    </a>
                </div>
                <a href={post.url}><h2>{post.title}</h2></a>
                <a href={post.url}><p>{post.subtitle}</p></a>
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