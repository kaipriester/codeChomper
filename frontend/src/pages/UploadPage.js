import React, { useState } from "react";
import axios from "axios";
import { Grid, Card, Form, Button } from "semantic-ui-react";

function UploadPage() {
  const [processedFiles, setProcessedFiles] = useState([]);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);

    try {
      const res = await axios.post("http://localhost:8080/upload", formData);
      setProcessedFiles(res.data);
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
    setStatus(5);
    removeStatus();
  };

  return (
    <Grid style={{ paddingLeft: "2.5vw", paddingTop: "2.5vh" }}>
      <Grid.Row>
        <Form>
          <Form.Field>
            <label>Code</label>
            <input type="file" onChange={saveFile} />
          </Form.Field>
          <Button type="submit" onClick={uploadFile}>
            Submit
          </Button>
        </Form>
      </Grid.Row>
    </Grid>
  );
}

export default UploadPage;
