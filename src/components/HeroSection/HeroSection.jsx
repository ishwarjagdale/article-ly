import React from 'react';
import Button from '../../elements/Button/Button';
import './HeroSection.css';
import Navigation from "../Navigation/Navigation";

class HeroSection extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            enableInput: false,
            enableSubmit: false,
            email: ""
        }

        this.handleStartWriting = this.handleStartWriting.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleHeroInput = this.handleHeroInput.bind(this);
    }

    handleStartWriting() {
        this.setState({enableInput: !this.state.enableInput});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.handleHeroSubmit({email: this.state.email, activeTab: "signup"})
    }

    handleHeroInput(e) {
        this.setState({email: e.target.value, enableSubmit: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)})
    }


    render() {
        return(
            <>
                <div className="header">
                    <div className="back-effect">
                        <Navigation handlePopState={this.props.handleHeroSubmit} parentState={this.props.parentState}/>
                        <div className="wrapper">
                            <div className="header-content">
                                    <a href="/" className="title"><i className="fab fa-typo3"/>journal.</a>
                                    <h2 className="subtitle"> is a place to write, read, and connect</h2>
                                    <p>It's easy and free to post your thinking on any topic and connect with millions of readers.</p>

                                {!this.props.parentState.user && <div className="hero-interact">
                                    {!this.state.enableInput ? <Button buttonStyle="btn-o btn-o-rnd" id="getStarted"
                                                                       onClick={this.handleStartWriting}>Start
                                        Writing</Button> : null}
                                    {this.state.enableInput ?
                                        <form onSubmit={this.handleSubmit}><input className="hero-input" type="text"
                                                                                  placeholder="example@org.com"
                                                                                  onChange={this.handleHeroInput}
                                                                                  autoFocus={true}/>
                                            {this.state.enableSubmit ? <button type="submit"
                                                                               className="fas fa-arrow-right btn-o btn-o-rnd"/> : null}
                                        </form> : null}
                                </div>}
                            </div>
                        </div>
                    </div>
                    
                </div>
            </>
        )
    }
}

export default HeroSection;