import React from 'react';
import './ShareButtons.css';

class ShareButtons extends React.Component {
    render() {
        return (
            <div className="article-share">
                <ul>
                    <li><a href="/"><i className="fab fa-twitter-square"/></a></li>
                    <li><a href="/"><i className="fab fa-facebook-square"/></a></li>
                    <li><a href="/"><i className="fab fa-linkedin"/></a></li>
                </ul>
            </div>
        )
    }
}

export default ShareButtons;