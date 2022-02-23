import React, { useState } from 'react';
import axios from 'axios';
import {
  Grid,
  Card,
  Form,
  Button
} from 'semantic-ui-react';

function UploadPage() {
    const [processedFiles, setProcessedFiles] = useState([]);
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState('');

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        };
    

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', fileName);
    
        try {
            const res = await axios.post('http://localhost:8080/upload', formData);
            setProcessedFiles(res.data);
            console.log(res);
        } catch (ex) {
            console.log(ex);
        }
        setStatus(5);
        removeStatus();
        };

  return (
    <Grid style={{ padding: '3.5vw' }}>
      <Grid.Row>
        {processedFiles.length == 0 && <>There are no files available</>}
        <Card.Group>
          {processedFiles.map((processedFile) => (
            <Card>
              <Card.Content>
                <Image
                        floated="right"
                        size="mini"
                        src="https://i.ibb.co/vxd7Rwc/abc-123-programmer-software-developer-generated.jpg"
                      />
                <Card.Header>{processedFile.filePath}</Card.Header>
                <Card.Meta>
                        Ran on
                      {' '}
                        {moment().format('D MMM, YYYY')}
                      </Card.Meta>
                <Card.Description textAlign="center">
                        <Statistic
                        label="detections"
                        value={processedFile.errorCount}
                      />
                      </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                        <Button
                        basic
                        color="primary"
                        onClick={() => {
                          setModalMessages(
                            JSON.stringify(processedFile.messages),
                          );
                          setOpen(true);
                        }}
                      >
                        view more
                      </Button>
                      </div>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Grid.Row>
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
      {/* <Grid.Row>
        <Grid style={{ width: '100%', margin: '0' }}>
          <Grid.Row>
            {activeStatus && <Header>Processing Status</Header>}
          </Grid.Row>
          <Grid.Row>
            {activeStatus && (
            <Progress
              value={status}
              total="5"
              progress="percent"
              indicating
              style={{ width: '80%' }}
            />
            )}
          </Grid.Row>
        </Grid>
      </Grid.Row> */}
    </Grid>
  );
}

export default UploadPage;
