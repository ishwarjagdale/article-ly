import React from 'react';
import {getUser, LoadUser} from "../api/SignUp";
import Navigation from "../components/Navigation/Navigation";

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: LoadUser(),
            userProfile: getUser(this.props.match.params.username)
        };
    }

    render() {
        return (
            <>
                <Navigation parentState={this.state}/>
            </>
        )
    }
}

export default ProfilePage;