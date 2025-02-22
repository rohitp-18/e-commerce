import React from "react";
import JoditEditor from "jodit-react";
import { Button, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const TextEditor = ({
  description,
  setDescription,
  heading,
  loading,
  submitHandler,
  setTextEditor,
}) => {
  return (
    <section className="create-products">
      <form
        className="text-editor"
        style={{ width: "450px" }}
        onSubmit={submitHandler}
      >
        <IconButton
          className="back-button"
          onClick={() => setTextEditor(false)}
        >
          <ArrowBack />
        </IconButton>
        <h2>{heading === "Create" ? "Add" : "Update"} Description</h2>
        <JoditEditor
          value={description}
          config={{
            toolbarButtonSize: "small",
            readonly: false,
            placeholder: "Start typings...",
            toolbar: {
              buttons: [
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "superscript",
                "subscript",
                "ul",
                "ol",
                "outdent",
                "indent",
                "font",
                "fontsize",
                // "paragraph",
                // "image",
                // "video",
                "table",
                "link",
                "align",
                "undo",
                "redo",
                "cut",
                "hr",
                "eraser",
                "copyformat",
                // "symbol",
                "fullsize",
                "print",
                "source",
                "selectall",
                // "about",
              ],
            },
          }}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => setDescription(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {}}
          className="text-editor"
        />
        <Button disabled={loading} className="button" type="submit">
          {heading === "Create" ? "Create Product" : "Update Product"}
        </Button>
      </form>
    </section>
  );
};

export default TextEditor;
