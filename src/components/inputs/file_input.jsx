import React from "react";

import Button from "@material-ui/core/Button";

function FileInput(props) {
  const { files, setFiles } = props;
  const [fileCount, setFileCount] = React.useState(0);

  return (
    <div>
      <span>File size must be lesser than 500KB.</span>

      <div>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="imageInput"
          onChange={(e) => {
            var filesize = (e.target.files[0].size / 1024 / 1024).toFixed(4);
            if (filesize < 0.6) {
              setFileCount(e.target.files.length);
              setFiles(e.target.files);
            }
          }}
          required={true}
          type="file"
        />
        <label htmlFor="imageInput">
          <Button variant="outlined" component="span">
            Upload Image
          </Button>
        </label>

        <span style={{ paddingLeft: "8px" }}>
          {fileCount === 0
            ? "No image selected"
            : fileCount + " image selected"}
        </span>
      </div>
      <div>
        <img
          src={files[0] ? URL.createObjectURL(files[0]) : ""}
          alt="preview"
          width="200"
          style={{
            marginTop: "8px",
            display: files[0] !== undefined ? "block" : "none",
          }}
        />
      </div>
    </div>
  );
}

export default FileInput;
