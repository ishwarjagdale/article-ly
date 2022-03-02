import React from "react";

class HeroSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            enableInput: false,
            newUser: "",
            enableSubmit: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleHeroAction = this.handleHeroAction.bind(this);
    }

    handleChange(e) {
        sessionStorage.setItem("newUser", e.target.value);
        this.setState({newUser: e.target.value, enableSubmit: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)})
    }

    handleHeroAction(e) {
        console.log(e.type);
        if((e.type === 'blur' && this.state.newUser === "") || e.type === 'click')
        this.setState({enableInput: !this.state.enableInput})
    }

    render() {
        return (
            <>
                <header aria-label={"nav-switch"} className={`w-screen h-screen md:h-[480px] hero font-['Source Sans Pro'] ${this.props.appState.user && "hidden"} sm:block`}>
                    <div className={"w-full h-full backdrop-blur-md bg-black bg-opacity-60 flex justify-center items-center"}>
                        <div
                            className={"flex-col md:p-20 lg:p-42 z-20 lg:max-w-[1680px] w-full"}>
                            <img src={"/img/journal-1.png"} className={"w-96 mb-2 mx-auto md:mx-0"} alt={"journal-logo"}/>
                            <h3 className={"font-bold text-2xl ml-8 text-white hidden md:block"}>is a place to write, read,
                                and connect</h3>
                            <p className={"text-white text-md ml-8 pt-3 tracking-wide leading-6 hidden md:block"}>It's
                                easy and free to post your thinking on any topic and connect with <br/> millions of readers.</p>

                            { !this.props.appState.user && <div
                                className={"text-white mx-auto w-fit md:mx-8 mt-8 md:mt-4 border-2 border-x-white rounded-full flex items-center text-sm hover:bg-white hover:bg-opacity-10"}>
                                {
                                    !this.state.enableInput ? <button onClick={this.handleHeroAction}
                                                                      className={"outline-0 border-0 font-semibold py-3 px-5 transition-all duration-300 ease"}>Get Started</button> :
                                        <input autoFocus={true} onBlur={this.handleHeroAction}
                                               onChange={this.handleChange}
                                               className={"outline-0 border-0 bg-transparent py-3 px-5 placeholder:text-gray-200 rounded-full placeholder:font-medium font-semibold text-center transition-all duration-300 ease"}
                                               type={"email"} name={"email"} defaultValue={""}
                                               placeholder={"Your Email"}/>

                                }
                                {this.state.enableSubmit &&
                                    <svg onClick={this.props.registerPop} xmlns="http://www.w3.org/2000/svg"
                                         className="h-8 w-8 md:h-7 md:w-7 text-white mr-2" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                                              clipRule="evenodd"/>
                                    </svg>
                                }
                            </div>}
                        </div>
                    </div>
                </header>
            </>
        )
    }
}

export default HeroSection;