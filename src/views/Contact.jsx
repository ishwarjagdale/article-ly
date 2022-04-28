import React from "react";
import Navigation from "../Components/Navigation";
import HeroSection from "../Components/HeroSection";
import Footer from "../Components/Footer";
import axios from "axios";
import {post_message} from "../api/DashAPI";

class Contact extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            bug_report: false,
            message: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        if(e.target.type === "checkbox")
            this.setState((state) => {state[e.target.name] = e.target.checked})
        else
        this.setState((state) => {state[e.target.name] = e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault()
        post_message(this.state).then((res) => {
            if(res) {
                document.getElementById("submitBtn").classList.add("success")
            } else {
                document.getElementById("submitBtn").classList.add("failed")
            }
        })
    }

    validateEmail() {
        axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.REACT_APP_ABS_API}&email=` + this.state.email)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <>
                <Navigation transparent appState={this.props.appState} registerPop={this.props.registerPop} className={"text-white"}/>
                <HeroSection appState={this.props.appState} registerPop={this.props.registerPop}/>
                <div id={"content"} className={"md:mt-12 container md:my-8 p-4 md:p-0 w-full max-w-[1440px] h-full mx-auto"}>
                    <form onSubmit={this.handleSubmit} className={"font-[monospace] flex flex-col text-[20px] max-w-[720px] mx-auto"}>
                        <input onChange={this.handleChange} type={"text"} name={"name"} className={"my-2 outline-none border border-gray-500 rounded-2xl px-4 py-2"} placeholder={"Name"} required={true} />
                        <input onChange={this.handleChange} type={"email"} name={"email"} className={"my-2 outline-none border border-gray-500 rounded-2xl px-4 py-2"} placeholder={"Email"} required={true} />
                        <div className={"flex items-center py-4"}>
                            <input onChange={this.handleChange} type={"checkbox"} className={"w-8 h-4 outline-none"} id={"bug_report"} name={"bug_report"}/>
                            <label htmlFor={"bug_report"} className={"text-[20px] text-gray-600"}>Is it about a bug? 🥲</label>
                        </div>
                        <textarea onChange={this.handleChange} name={"message"} maxLength={1000} className={"my-2 outline-none min-h-[200px] border border-gray-500 rounded-2xl px-4 py-2"} required={true} placeholder={"Your message..."}/>
                        <div className={"my-2"}>
                            <button id={"submitBtn"} type={"submit"} className={"text-[20px] border border-gray-500 font-bold px-4 py-2 rounded-2xl text-gray-200 bg-black hover:text-white"}>Submit</button>
                        </div>
                    </form>
                </div>
                <Footer />
            </>
        )
    }
}

export default Contact;