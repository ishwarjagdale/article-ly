// eslint-disable-next-line no-undef
BalloonEditor.create(
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
        placeholder: "Write your story"
    }
).then(editor => {
    console.log(editor);
    window.editor = editor;
}).catch(error => {
    console.error(error);
});