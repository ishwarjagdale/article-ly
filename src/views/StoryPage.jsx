import React from "react";
import Navigation from "../Components/Navigation";
import Footer from "../Components/Footer";
import Story from "../Components/Story";

class StoryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <>
                <Navigation appState={this.props.appState} registerPop={this.props.registerPop}/>
                <Story postID={window.location.pathname.split("-").pop()} appState={this.props.appState}/>
                <Footer/>
            </>
        )
    }
}

export default StoryPage;