import React from 'react';
import Navigation from "../components/Navigation/Navigation";
import {LoadUser} from "../api/AuthAPI";
import "./NewStory.css";
//import {CKEditor} from "@ckeditor/ckeditor5-react";
//import * as BalloonEditor from "@ckeditor/ckeditor5-build-balloon";
//import {Editor} from "@tinymce/tinymce-react";
import Button from "../elements/Button/Button";
import {new_post} from "../api/ArticlesAPI";
import Footer from "../components/Footer";

class NewStory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: LoadUser(),
            previewState: false,
            content: "",
            characterCount: 0,
            wordCount: 0,
            title: "",
            subtitle: "",
            thumbnailURL: "./img/thumbnail.png",
            tags: "",
        };

        this.togglePreview = this.togglePreview.bind(this);
        this.handleChange = this.handleChange.bind(this);
        window.handleEditorChange = this.handleChange;
        this.handlePublish = this.handlePublish.bind(this);
        this.handlePreviewChange = this.handlePreviewChange.bind(this);
    }

    togglePreview() {
        this.setState({previewState: !this.state.previewState});
    }

    handleChange(data) {
        const ele = document.createElement('div');
        ele.innerHTML = data;
        if(ele.innerText.length <= 10000) {
            this.setState({content: data, wordCount: ele.innerText.split(" ").length});
        } else {
            window.editor.setData(this.state.content);
            alert("Oh Sorry, seems likes you have a lot to write, but we can't take that much a time. Consider writing a Part II of your story.")
        }
    }

    handlePublish() {
        let {content, title, subtitle, thumbnailURL, tags, wordCount} = this.state;
        return new_post(title, subtitle, content, thumbnailURL, tags, wordCount, this.state.user.id)
    }

    handlePreviewChange(e) {
        this.setState(state => {
            state[e.target.name] = e.target.value
        })
    }

    componentDidMount() {
        const script = document.createElement("script");
        script.src = "js/ckeditor.js";
        script.crossOrigin = "anonymous";
        script.onload = () => {
            const loader = document.createElement("script");
            loader.src = "js/initializeCk.js";
            document.body.append(loader);
        }
        document.head.append(script);

    }

    render() {
        const StoryPreview = () => {
            return (
                <>
                    <div className={"preview-pop"}>
                        <div className={"preview-container"}>
                            <i className={"fas fa-close close-button"} onClick={this.togglePreview}/>
                            <div className={"story-preview"}>
                                <div>
                                    <span>Story Preview</span>
                                    <div className={"story-thumbnail"}/>
                                </div>
                                <input className={"preview-inp"} type={"text"} name={"title"}
                                       placeholder={"Write a preview title"} onChange={this.handlePreviewChange}/>
                                <input className={"preview-inp"} type={"text"} name={"subtitle"}
                                       placeholder={"Write a preview subtitle"} onChange={this.handlePreviewChange}/>
                            </div>
                            <div className={"story-details"}>
                                <p className={"mb-10"}>Publishing to: <strong>{this.state.user.name}</strong></p>
                                <p>Add or change tags (up to 5) so readers know what your story is about</p>
                                <input type={"text"} name={"tags"} placeholder={"Add a tag..."} className={"tags-inp"}
                                       onChange={this.handlePreviewChange}/>
                                <p>Learn more about what happens to your post when you publish.</p>
                                <div className={"d-flex-inline"}>
                                    <Button buttonStyle={"btn-o btn-o-rnd green-accent"} id={"publishPost"}
                                            onClick={this.handlePublish}>Publish Now</Button>


                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        return (
            <>
                {this.state.previewState && <StoryPreview/>}
                <Navigation parentState={this.state} disableNewStory publishStory={this.togglePreview} widebrand={"dark"}/>
                <div className={"story-content"}>
                    <div id={"editor"}/>
                </div>
                <Footer/>
            </>
        )
    }

}

export default NewStory;