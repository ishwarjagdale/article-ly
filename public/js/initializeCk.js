// eslint-disable-next-line no-undef
BalloonBlockEditor.create(
    document.querySelector('#editor'), {
        removePlugins: ["Title"],
        title : {
            placeholder: "Title"
        },
        autosave: {
            save(editor) {
                window.handleEditorChange(editor.getData());
                return localStorage.setItem("new-story", editor.getData());
            }
        },
        simpleUpload: {
            // The URL that the images are uploaded to.
            uploadUrl: "https://journal-flask-server.herokuapp.com/static/",
            // Enable the XMLHttpRequest.withCredentials property.
            withCredentials: true,
        },
        placeholder: "Write your story"
    }
).then(editor => {
    editor.focus();
    console.log(editor);
    window.editor = editor;
}).catch(error => {
    console.error(error);
});