import React from 'react';
import Navigation from "../components/Navigation/Navigation";
import {LoadUser} from "../api/AuthAPI";
import "./NewStory.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import * as BalloonEditor from "@ckeditor/ckeditor5-build-balloon";
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
            title: "",
            subtitle: "",
            thumbnailURL: "./img/thumbnail.png",
            tags: "",
        };

        this.editor = null;
        this.togglePreview = this.togglePreview.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePublish = this.handlePublish.bind(this);
        this.handlePreviewChange = this.handlePreviewChange.bind(this);
    }

    togglePreview() {
        this.setState({previewState: !this.state.previewState});
    }
    handleChange(data) {
        this.setState({content: data});
    }
    handlePublish() {
        let {content, title, subtitle, thumbnailURL, tags} = this.state;
        return new_post(title, subtitle,content, thumbnailURL, tags, this.state.user.id)
    }
    handlePreviewChange(e) {
        this.setState(state => {state[e.target.name] = e.target.value})
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
                                <input className={"preview-inp"} type={"text"} name={"title"} placeholder={"Write a preview title"} onChange={this.handlePreviewChange}/>
                                <input className={"preview-inp"} type={"text"} name={"subtitle"} placeholder={"Write a preview subtitle"} onChange={this.handlePreviewChange}/>
                            </div>
                            <div className={"story-details"}>
                                <p className={"mb-10"}>Publishing to: <strong>{ this.state.user.name }</strong></p>
                                <p>Add or change tags (up to 5) so readers know what your story is about</p>
                                <input type={"text"} name={"tags"} placeholder={"Add a tag..."} className={"tags-inp"} onChange={this.handlePreviewChange}/>
                                <p>Learn more about what happens to your post when you publish.</p>
                                <div className={"d-flex-inline"}>
                                    <Button buttonStyle={"btn-o btn-o-rnd green-accent"} id={"publishPost"} onClick={this.handlePublish}>Publish Now</Button>


                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        return (
            <>
                { this.state.previewState && <StoryPreview/> }
                <Navigation parentState={this.state} disableNewStory publishStory={this.togglePreview} />
                <div id={"editor"} className={"story-content"}>
                    <CKEditor
                        editor={BalloonEditor}
                        data=""
                        config={
                            {
                                placeholder: "Write your story"
                            }
                        }
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            this.editor = editor;
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            this.handleChange(data);
                            localStorage.setItem(
                                "newStory", data
                            )
                            console.log({event, editor, data});
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    />
                </div>

                <Footer />
            </>
        )
    }

}

export default NewStory;