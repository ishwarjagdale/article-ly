import React, {Fragment} from "react";
import {Transition, Dialog, Tab} from "@headlessui/react";
import {LoginUser, RegisterUser} from "../api/AuthAPI";

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: sessionStorage.getItem("newUser"),
            name: "",
            password: "",
            rememberMe: false,
        };

        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState((state) => {state[e.target.name] = e.target.value});
    }

    handleSignIn(e) {
        e.preventDefault();
        LoginUser(this.state.email, this.state.password, 'on').then(res => {
            console.log(res);
            if (res[0]) {
                window.location.reload();
            } else {
                console.log(res[1]);
            }
        })

    }
    handleSignUp(e) {
        e.preventDefault();
        RegisterUser(this.state.name, this.state.email, this.state.password).then(
            res => {
                if(res[0]) {
                    this.handleSignIn(e);
                } else {
                    console.log(res[1]);
                }
            }
        )
    }

    render() {
        return (
            <>
                <Transition appear show={this.props.visible} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-sm bg-black bg-opacity-40"
                        onClose={this.props.hidePop}
                    >
                        <div className="min-h-screen px-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0" />
                            </Transition.Child>

                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span
                                className="inline-block h-screen align-middle"
                                aria-hidden="true"
                            />
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                    <img alt={"journal-logo"}
                                         src={"/img/journal-1b.png"}
                                         className="h-12 mb-4"/>
                                    <Tab.Group selectedIndex={this.props.activeTab}>
                                        <Tab.List hidden>
                                            <Tab>Sign Up</Tab>
                                            <Tab>Log in</Tab>
                                            <Tab>Forgot Password</Tab>
                                        </Tab.List>
                                        <Tab.Panels>
                                            <Tab.Panel as={"form"} onSubmit={this.handleSignUp}>
                                                <Dialog.Title as={"i"} className={"text-sm font-ssp"}>
                                                    Create a new account.
                                                </Dialog.Title>
                                                <div className={"mt-4 w-full font-ssp"}>
                                                    <div className={"flex items-center border-2 rounded-full mb-3"}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 absolute ml-3" fill="none" viewBox="0 0 24 24" stroke="#535353">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <input onChange={this.handleChange} type={"text"} className={"text-sm flex-1 outline-0 py-2.5 rounded-full pl-12"} name={"name"} placeholder={"Your Name"} required/>
                                                    </div>

                                                    <div className={"flex items-center border-2 rounded-full mb-3"}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mr-2 absolute ml-3" fill="none" viewBox="0 0 24 24" stroke="#535353">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                                        </svg>
                                                        <input onChange={this.handleChange} type={"email"} className={"text-sm flex-1 outline-0 py-2.5 rounded-full pl-12"} name={"email"} placeholder={"Your Email"} defaultValue={sessionStorage.getItem("newUser")} required/>
                                                    </div>
                                                    <div className={"flex items-center border-2 rounded-full"}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mr-2 absolute ml-3" fill="none" viewBox="0 0 24 24" stroke="#535353">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                                        </svg>
                                                        <input onChange={this.handleChange} type={"password"} className={"text-sm flex-1 outline-0 py-2.5 rounded-full pl-12"} name={"password"} placeholder={"Password"} required/>
                                                    </div>
                                                    <div className={"flex items-center px-3 py-2 justify-between"}>
                                                        <div className={"flex items-center"}>
                                                            <input type={"checkbox"} className={"text-sm outline-0 mr-2"} name={"terms"} required/>
                                                            <span className={"text-sm"}>Agree to the terms.</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-center">
                                                    <button type={"submit"} className={"cursor-pointer p-4 mt-4 inline-flex w-full md:w-6/12 items-center py-1.5 px-3 font-medium transition-all duration-300 ease text-sm hover:bg-black hover:text-white border-2 border-black rounded-3xl"}>
                                                        <span className={"mx-auto"}>Sign Up</span>
                                                    </button>
                                                    <p className={"text-sm mt-2"}>Already have an account? <button className={"text-blue-600 hover:text-gray-400"} onClick={() => this.props.handleTab(1)}>Log in</button></p>
                                                </div>
                                            </Tab.Panel>
                                            <Tab.Panel as={"form"} onSubmit={this.handleSignIn}>
                                                <Dialog.Title as={"i"} className={"text-sm font-ssp"}>
                                                    Welcome back, you have to log in.
                                                </Dialog.Title>
                                                <div className={"mt-4 w-full font-ssp"}>
                                                    <div className={"flex items-center border-2 rounded-full mb-3"}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mr-2 absolute ml-3" fill="none" viewBox="0 0 24 24" stroke="#535353">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                                        </svg>
                                                        <input onChange={this.handleChange} type={"email"} className={"text-sm flex-1 outline-0 py-2.5 rounded-full pl-12"} name={"email"} placeholder={"Your Email"} required/>
                                                    </div>
                                                    <div className={"flex items-center border-2 rounded-full"}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mr-2 absolute ml-3" fill="none" viewBox="0 0 24 24" stroke="#535353">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                                        </svg>
                                                        <input onChange={this.handleChange} type={"password"} className={"text-sm flex-1 outline-0 py-2.5 rounded-full pl-12"} name={"password"} placeholder={"Password"} required/>
                                                    </div>
                                                    <div className={"flex items-center px-3 py-2 justify-between"}>
                                                        <div className={"flex items-center"}>
                                                            <input onChange={this.handleChange} type={"checkbox"} className={"text-sm outline-0 mr-2"} name={"rememberMe"}/>
                                                            <span>Remember Me</span>
                                                        </div>
                                                        <button className={"text-blue-600 hover:text-blue-400"} onClick={() => this.props.handleTab(2)}>
                                                            Forgot Password
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-center">
                                                    <button type={"submit"} className={"cursor-pointer p-4 mt-4 inline-flex w-full md:w-6/12 items-center py-1.5 px-3 font-medium transition-all duration-300 ease text-sm hover:bg-black hover:text-white border-2 border-black rounded-3xl"}>
                                                        <span className={"mx-auto"}>Log in</span>
                                                    </button>
                                                    <p className={"text-sm mt-2"}>New here? <button className={"text-blue-600 hover:text-gray-400"} onClick={() => this.props.handleTab(0)}>Sign up</button></p>
                                                </div>
                                            </Tab.Panel>
                                            <Tab.Panel>
                                                <Dialog.Title as={"i"} className={"text-sm font-ssp"}>
                                                    Forgot Password? No worries, we'll email you the way back into your account.
                                                </Dialog.Title>
                                                <div className={"mt-4 w-full font-ssp"}>
                                                    <div className={"flex items-center border-2 rounded-full mb-3"}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mr-2 absolute ml-3" fill="none" viewBox="0 0 24 24" stroke="#535353">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                                        </svg>
                                                        <input onChange={this.handleChange} type={"email"} className={"text-sm flex-1 outline-0 py-2.5 rounded-full pl-12"} name={"email"} placeholder={"Your Email"} required/>
                                                    </div>
                                                    <div className={"flex items-center pb-4"}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <p className={"text-sm"}>Enter the email address connected to the your Journal account.</p>
                                                    </div>
                                                </div>

                                                <div className="flex justify-center">
                                                    <button onClick={this.props.hidePop} className={"cursor-pointer p-4 mt-4 inline-flex w-full md:w-6/12 items-center py-1.5 px-3 font-medium transition-all duration-300 ease text-sm hover:bg-black hover:text-white border-2 border-black rounded-3xl"}>
                                                        <span className={"mx-auto"}>Recover Password</span>
                                                    </button>
                                                </div>
                                            </Tab.Panel>
                                        </Tab.Panels>
                                    </Tab.Group>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>
            </>
        )
    }

}

export default Register;