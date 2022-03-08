import React, {Fragment} from "react";
import {Menu, Transition} from "@headlessui/react";
import {LoadUser} from "../api/AuthAPI";
import Search from "./Search";

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchVisible: false,
        };

        this.handleScroll = this.handleScroll.bind(this);
        this.showSearch = this.showSearch.bind(this);
        this.hideSearch = this.hideSearch.bind(this);
    }

    handleScroll(e) {
        if(this.props.transparent) {
            let element = document.getElementById("navigation");
            if(window.scrollY > document.querySelector("[aria-label='nav-switch']").clientHeight - element.clientHeight) {
                if(element.classList.contains("transparent-nav"))
                    element.classList.remove("transparent-nav");
            } else {
                element.classList.add("transparent-nav");
            }
        }
    }

    showSearch() {
        this.setState({searchVisible: true});
    }

    hideSearch() {
        this.setState({searchVisible: false});
    }

    componentDidMount() {
        window.addEventListener('scroll', (e) => this.handleScroll(e))
    }



    render() {
        return (
            <>
                { this.state.searchVisible && <Search hideSearch={this.hideSearch} /> }
                <div id={"navigation"}
                     className={`${this.props.transparent && "transparent-nav"}`}>
                    <div className={"w-full md:w-10/12 m-auto flex items-center"}>
                        <a href={"/"}>
                            <img id={"nav-brand"} src={"/img/journal-1b.png"} className={
                                "h-12"
                            } alt={"journal-logo"}/>
                        </a>
                        <Menu as={"div"} id={"side-nav"} className={"ml-auto md:hidden"}>
                            <Menu.Button as={"div"}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-6 rotate-180" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M4 6h16M4 12h8m-8 6h16"/>
                                </svg>
                            </Menu.Button>
                            <Menu.Items as={"ul"} className={"side-nav"}>
                                <Menu.Button as={"li"} className={"side-toggle flex flex-row-reverse w-full"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 rotate-180" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M4 6h16M4 12h8m-8 6h16"/>
                                    </svg>
                                </Menu.Button>
                                <Menu.Item as={"li"} className={"flex-col items-center"}>
                                    { this.props.appState.user ? <>
                                        <a href={`/@${this.props.appState.user.username}`}>
                                            <img className={"w-24 mb-4 rounded-3xl"}
                                                 src={this.props.appState.user.image_url} alt={"user"}/>
                                            <h3 className={"tracking-wide font-medium font-ssp mb-4"}>{this.props.appState.user.name}</h3>
                                        </a>
                                        <a href={"/new-story"} className={"w-[50%] justify-center mb-4 inline-flex items-center py-1.5 px-3 font-medium transition-all duration-300 ease text-sm hover:bg-black hover:text-white border-2 border-white hover:border-black rounded-3xl"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                            </svg> <span>New Story</span>
                                        </a>
                                        <a href={"/logout"} className={"lo-b w-[50%] justify-center mb-4 inline-flex items-center py-1.5 px-3 font-medium text-sm border-2 rounded-3xl"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg> <span>Logout</span>
                                        </a>
                                    </> : <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-4" viewBox="0 0 20 20" fill="currentColor">

                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                                        </svg>
                                        <button
                                            onClick={() => this.props.registerPop(1)}
                                            className={"py-1.5 px-3 mb-4 font-medium transition-all duration-300 ease text-sm border-black hover:bg-black hover:text-white hover:border-black border-2 rounded-3xl"}>
                                            Sign in
                                        </button>
                                    </>
                                    }
                                </Menu.Item>
                                <Menu.Item as={"ul"} className={"flex mx-auto justify-evenly"}>
                                    <li onClick={this.showSearch}>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="h-5 w-5 mx-2" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                        </svg>
                                    </li>
                                    <li>
                                        {
                                            this.props.appState.user && <a href={"/settings"}><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg></a>
                                        }
                                    </li>
                                    <li>
                                        <a href={"/saved"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                            </svg>
                                        </a>
                                    </li>
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                        <ul id={"nav-links"} className={"hidden md:flex ml-auto justify-evenly items-center"}>
                            {
                                this.props.submit && <li>
                                    <button onClick={this.props.handleSubmit}
                                            className={"inline-flex items-center py-1 px-2 font-medium transition-all duration-300 ease text-sm hover:bg-black hover:text-white border-2 border-black rounded-full"}>
                                        <span>Save</span>
                                    </button>
                                </li>
                            }
                            {
                                !this.props.publishStory &&
                                <>
                                    <li onClick={this.showSearch}>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="icons" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                        </svg>
                                    </li>
                                    <li>
                                        <a href={"/saved"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icons" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                            </svg>
                                        </a>
                                    </li>
                                </>
                            }
                            {this.props.appState.user ?
                                <>
                                    <li>
                                        {
                                            this.props.publishStory ?
                                                 !this.props.popState && <button onClick={this.props.showPop}
                                                         className={"inline-flex items-center py-1 px-2 font-medium transition-all duration-300 ease text-sm hover:bg-black hover:text-white border-2 border-black rounded-3xl"}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1"
                                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                    </svg>
                                                    <span>Publish</span>
                                                </button>
                                                :
                                                <a href={"/new-story"} className={"inline-flex items-center py-1.5 px-3 font-medium transition-all duration-300 ease text-sm hover:bg-black hover:text-white border-2 border-black rounded-3xl"}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                                    </svg> <span>New Story</span>
                                                </a>
                                        }
                                    </li>
                                    <li>
                                        <Menu as={"div"} id={"user-menu"} className={"flex justify-center"}>
                                            <Menu.Button as={"div"}>
                                                <img className={"w-9 border-2 border-black rounded-3xl border-2"} src={this.props.appState.user.image_url} alt={"user"} />
                                            </Menu.Button>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items as={"ul"} static className={"dropdown"}>
                                                    <Menu.Item>
                                                        <a href={`/@${this.props.appState.user.username}`}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            Profile
                                                        </a>
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        <a href={"/settings"}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            Settings
                                                        </a>
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        <a href={"/logout"}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                            </svg>
                                                            Logout
                                                        </a>
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </li>
                                </>
                                :
                                <li>
                                    <div className={"sm:hidden lg:block md:block"}>
                                        <button
                                            onClick={() => this.props.registerPop(1)}
                                            className={"py-1.5 px-3 font-medium transition-all duration-300 ease text-sm border-black hover:bg-black hover:text-white hover:border-black border-2 rounded-3xl"}>
                                            Sign in
                                        </button>
                                    </div>
                                </li>}
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}

export default Navigation;