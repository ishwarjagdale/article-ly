import React from "react";
import {search} from "../api/ArticlesAPI";
import StoryCard from "./StoryCard";

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: "",
            content: [],
            finding: false
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        if(e.target.value.trim())
        setTimeout(() => {
            this.setState({finding: true, query: e.target.value.trim()});
            search(e.target.value).then(res => {
                this.setState({content: res, finding: false})
            })
        }, 1000);
    }

    render() {
        return (
            <>
                <div className={"w-full h-full fixed top-0 flex justify-center bg-black z-[1000] bg-opacity-80 backdrop-blur-sm"}>
                    <div className={"mx-4 mt-48 items-center flex w-full md:w-10/12 max-w-[800px] flex-col"}>
                        <div className={"flex flex-wrap w-full items-center justify-center"}>
                            <input onChange={this.handleChange} className={"p-4 text-3xl border-b-2 focus:border-b-3 focus:border-white outline-none text-white font-medium bg-transparent w-full"} autoComplete={"off"} autoFocus type={"text"} name={"search"} required placeholder={"So, what are we looking for?"} />
                            <svg onClick={this.props.hideSearch} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 m-12 hover:stroke-white" fill="none" viewBox="0 0 24 24" stroke="grey">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className={"flex flex-col justify-center items-center w-full mt-12 overflow-y-scroll bg-white rounded-2xl"}>
                            {
                                !this.state.finding ? !this.state.content.length ?
                                        this.state.query && <p className={"text-white text-center w-full font-bold"}>uhh... nothing here '_'</p>
                                    :
                                    this.state.content.map((post) => {
                                        return <StoryCard className={"mb-2"} id={post.id} post={post} key={post.id}/>
                                    })
                                    :
                                    <>
                                        <p className={"text-center w-full font-bold p-4"}>Searching</p>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default Search;