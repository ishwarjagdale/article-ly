import React from "react";
import {uploadImage} from "../../api/DashAPI";
import "./FIleUpload.css";

class FileUpload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.getFile = this.getFile.bind(this);

    }

    getFile(e) {
        window.busy = true
        let file = e.target.files[0]
        console.log(file)
        uploadImage(file, this.props.for).then((data) => {
            console.log(data);
            document.getElementById(this.props.for).src = data.url;
            window.busy = false;
        })
    }

    render() {
        return (
            <>
                <div className={"file-uploader " + this.props.className} onClick={() => document.getElementById("input" + this.props.for).click()}>
                    <input type={"file"} id={"input" + this.props.for} name={"file"} onInput={this.getFile} hidden/>
                    {this.props.children}
                </div>
            </>
        )
    }
}

export default FileUpload;