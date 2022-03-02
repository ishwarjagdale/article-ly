import React, {Fragment} from "react";
import Navigation from "../Components/Navigation";
import Footer from "../Components/Footer";
import {Dialog, Transition} from "@headlessui/react";
import {new_post} from "../api/ArticlesAPI";
import {uploadImage} from "../api/DashAPI";


class NewStory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            publishPop: false,
            title: "",
            subtitle: "",
            tags: "",
            thumbnail: "https://storage.googleapis.com/dotted-tube-339407.appspot.com/assets/img/thumbnail.png",
            content: "",
            characterCount: 0,
            wordCount: 0,
        };

        this.showPop = this.showPop.bind(this);
        this.hidePop = this.hidePop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleContent = this.handleContent.bind(this);
        this.handlePublish = this.handlePublish.bind(this);
        window.handleEditorChange = this.handleContent;
        this.getFile = this.getFile.bind(this);
    }

    handleChange(e) {
        this.setState(state => { state[e.target.name] = e.target.value });
    }

    handleContent(data) {
        if(data.length <= 10000) {
            const ele = document.createElement('div');
            ele.innerHTML = data;
            this.setState({content: data, wordCount: ele.innerText.split(" ").length});
        } else {
            window.editor.setData(this.state.content);
            alert("Oh Sorry, seems likes you have a lot to write, but we can't take that much a time. Consider writing a Part II of your story.")
        }
    }

    getFile(e) {
        window.busy = true
        let file = e.target.files[0]
        console.log(file)
        uploadImage(file, e.target.ariaLabel).then((data) => {
            console.log(data);
            document.getElementById("thumbnail_image").src = data.url;
            window.busy = false;
        })
    }

    handlePublish() {
        if(!window.busy) {
            if(this.state.title !== "" && this.state.content !== "") {
                document.getElementById("publishPost").setAttribute("disabled", "true")
                let thumbnail_image = document.getElementById("thumbnail_image").getAttribute("src")
                let {content, title, subtitle, tags, wordCount} = this.state;
                return new_post(title, subtitle, content, thumbnail_image, tags, wordCount, this.props.appState.user.id)
            }
            return alert("Your Story must have a title and proper content!")
        } else {
            return alert("Please wait, while we save your changes")
        }
    }

    showPop() {
        this.setState({publishPop: true});
    }

    hidePop() {
        this.setState({publishPop: false});
    }

    componentDidMount() {
        document.title = "New Story | Journal"
        const script = document.createElement("script");
        script.src = "js/ckeditor.js";
        script.crossOrigin = "anonymous";
        script.onload = () => {
            const loader = document.createElement("script");
            loader.src = "js/initializeCk.js";
            document.body.append(loader);
        }
        document.body.append(script);

    }

    render() {

        const StoryPreview = () => {
            return <>
                <Transition appear show={this.state.publishPop} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-md"
                        onClose={this.hidePop}
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
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Publish Your Story
                                    </Dialog.Title>
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={this.hidePop} className="cursor-pointer absolute right-0 top-0 m-6 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <div className="mt-8 preview">
                                        <div className={"relative"}>
                                            <input onChange={this.getFile} aria-label={"thumbnail_image"} type={"file"} name={"thumbnail"} id={"thumb-picker"} hidden/>
                                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => document.getElementById("thumb-picker").click()} className="h-full w-full absolute bg-black bg-opacity-75 opacity-0 hover:opacity-100 p-[30%] cursor-pointer transition-all duration-300 ease"  fill="none" viewBox="0 0 24 24" stroke="white">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <img className={`w-full w-auto rounded-md`}
                                                 src={this.state.thumbnail || "/img/thumbnail.png"}
                                                 alt={"thumbnail-preview"}
                                                 id={"thumbnail_image"}
                                            />
                                        </div>
                                        <input type={"text"} name={"title"} className={"text-xl font-bold"} placeholder={"Title"} required
                                               onChange={this.handleChange} />
                                        <input type={"text"} name={"subtitle"} className={"font-ssp font-light"} placeholder={"Subtitle"} required
                                               onChange={this.handleChange} />
                                        <div className={"story-meta my-4"}>
                                            <input type={"text"} name={"tags"} className={"font-ssp font-medium text-[14px]"} placeholder={"Tags ( comma separated )"} required
                                                onChange={this.handleChange} />
                                        </div>

                                    </div>

                                    <div className="mt-4">
                                        <button id={"publishPost"} onClick={this.handlePublish} className={"inline-flex w-full justify-center items-center py-1 px-2 font-medium transition-all duration-300 ease text-sm hover:bg-black hover:text-white border-2 border-black rounded-3xl"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg> <span>Publish</span>
                                        </button>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>
            </>
        }

        return (
            <>
                <Navigation appState={this.props.appState} publishStory showPop={this.showPop} hidePop={this.hidePop} popState={this.state.publishPop}/>
                <div id={"content"}
                     className={"container relative md:my-16 p-4 md:p-0 w-full max-w-[1440px] mx-auto flex justify-start flex-col items-center"}>
                    <StoryPreview/>
                    <div id={"ck-editor"} autoFocus={true} className={"ck-content mx-4 w-10/12 md:w-10/12 max-w-[720px]"}>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }

}

export default NewStory;