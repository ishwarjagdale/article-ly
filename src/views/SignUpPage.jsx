import React from "react";
import SignUp from "../components/SignUp/SignUp";
import {Navigate} from "react-router-dom";

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: JSON.parse(sessionStorage.getItem("user")) || false,
            from: this.props.location.from === undefined ? "/" : this.props.location.from,
        }

        this.closePop = this.closePop.bind(this);
    }

    closePop() {
        return null
    }

    componentDidMount() {
        console.log(this.state.from);
        if(this.state.user && this.state.from) {
            return <Navigate to={this.state.from } />
        }
    }

    render() {
        return (
            <>
                <SignUp parentState={this.state} closePop={this.closePop} parentProps={this.props}/>
            </>
        )
    }
}
export default SignUpPage;