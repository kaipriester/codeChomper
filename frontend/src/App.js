import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import {
  Progress,
  Grid,
  Image,
  Button,
  Statistic,
  Form,
  Dropdown,
  Icon,
  Menu,
  Header,
  Card,
  Modal,
} from 'semantic-ui-react';
import axios from 'axios';
import moment from 'moment';
import TopBar from './TopBar';
import Sidebar from './Sidebar';

function App() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('');
  const [status, setStatus] = useState(0);
  const [modalMessages, setModalMessages] = useState('');
  const [activeStatus, setActiveStatus] = useState(false);
  const [processedFiles, setProcessedFiles] = useState([]);
  const [open, setOpen] = React.useState(false);

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    setActiveStatus(true);
    setStatus(0);
    setStatus(3);
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
  const removeStatus = async () => {
    await new Promise((r) => setTimeout(r, 5000));
    setActiveStatus(false);
  };
  return (
    <Grid>
      <Grid.Column width={3} style={{ paddingRight: 0 }}>
        <Sidebar />
      </Grid.Column>
      <Grid.Column width={13} style={{ paddingLeft: 0 }}>
        <TopBar />

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
          <Grid.Row>
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
          </Grid.Row>
        </Grid>
      </Grid.Column>
      <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="small"
        trigger={<Button>Basic Modal</Button>}
      >
        <Header icon>
          <Icon name="archive" />
          Errors
        </Header>
        <Modal.Content>
          <p>{modalMessages}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={() => setOpen(false)}>
            <Icon name="remove" />
            {' '}
            close
          </Button>
        </Modal.Actions>
      </Modal>
    </Grid>
  );
}

export default App;
