import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'
import { Grid, Image, Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';

function App() {

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
      const res = await axios.post(
        "http://localhost:8080/upload",
        formData
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <Grid>
    <Grid.Column width={3}>
      cool left tab
    </Grid.Column>
    <Grid.Column width={13}>
      cool right tab

      <Form>
    <Form.Field>
      <label>Code</label>
      <input type="file" onChange={saveFile} />
    </Form.Field>
    <Button type='submit' onClick={uploadFile}>Submit</Button>
  </Form>
    </Grid.Column>
  </Grid>
  );
}

export default App;
