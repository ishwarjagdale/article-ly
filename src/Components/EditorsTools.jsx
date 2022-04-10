import React from "react";

class EditorsTools extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <>
                <div className={`w-full ${this.props.v2 ? "" : "border-y-2 rounded-2xl mb-8"} flex justify-center items-center`}>
                    <a href={this.props.editURL || `${window.location.pathname}/edit`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="m-4 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </a>
                    <svg onClick={() => {
                        if(window.confirm("This will permanently delete this story and won't be able to recover. Are you sure you want to continue?")) return this.props.action('delete')
                    }} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer m-4 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="red" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <svg onClick={() => {
                        if(window.confirm(this.props.patch ? "This will publish story and will be publicly visible. Are you sure you want to continue?" : "This will revert story to draft and will not be publicly visible. Are you sure you want to continue?")) return this.props.action('patch')
                    }} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer m-4 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    <svg onClick={this.props.download} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer m-4 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </div>
            </>
        )
    }

}

export default EditorsTools;