import React from "react";
import {checkFollow, follow, unfollow} from "../../api/ProfilesAPI";
import Button from "../../elements/Button/Button";


class FollowButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            doFollow: false
        }

        this.handleFollow = this.handleFollow.bind(this);
        this.handleUnFollow = this.handleUnFollow.bind(this);
    }

    handleFollow(e) {
        e.target.innerText = "...";
        let status = follow(this.props.profile.id);
        status.then(res => {
            e.target.innerText = res ? "Following" : "Follow";
            this.setState({doFollow: res});
        });
    }

    handleUnFollow(e) {
        e.target.innerText = "...";
        let status = unfollow(this.props.profile.id);
        status.then(res => {
            e.target.innerText = res ? "Following" : "Follow";
            this.setState({doFollow: res});
        });
    }

    componentDidMount() {
        checkFollow(this.props.profile.id).then(res => {
            console.log("FOLLOW", res);
            this.setState({doFollow: res});
        })
    }

    render() {
        if(!this.props.user) {
            return <>
                <Button buttonStyle={"btn-o btn-o-rnd"} onClick={this.props.handlePopState} children={"Follow"}/>
            </>
        }else if(this.props.profile.id === this.props.user.id) {
            return <>
                <Button buttonStyle={"btn-o btn-o-rnd"} onClick={() => alert("Haha!, nice try but you can't follow yourself. ;)")} children={"Follow"}/>
            </>

        } else {
            return this.state.doFollow ?
                <Button buttonStyle={"btn-o btn-o-rnd"} onClick={this.handleUnFollow} children={"Following"}/>
                :
                <Button buttonStyle={"btn-o btn-o-rnd"} onClick={this.handleFollow} children={"Follow"}/>
        }
    }
}

export default FollowButton;