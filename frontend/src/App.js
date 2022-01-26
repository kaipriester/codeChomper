import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import {
  Progress,
  Grid,
  Image,
  Button,
  Checkbox,
  Statistic,
  Form,
  Dropdown,
  Icon,
  Menu,
  Segment,
  Header,
  Card,
  Label,
  Input
} from "semantic-ui-react";
import axios from "axios";

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
      const res = await axios.post("http://localhost:8080/upload", formData);
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <Grid>
      <Grid.Column width={3} style={{ paddingRight: 0 }}>
        <Menu inverted compact style={{ width: "100%" }}>
          <Menu.Item header>JSAnalyzer</Menu.Item>
        </Menu>
        <Menu vertical style={{ padding: 0, margin: 0, width: '100%', height: '100vh' }}>
        <Menu.Item
          name='gamepad'
          active={false}
        >
          <Icon name='globe' />
          Overview
        </Menu.Item>

        <Menu.Item
          name='video camera'
          active={false}
        >
          <Icon name='columns' />
          Violations
        </Menu.Item>

        <Menu.Item
          name='video play'
          active={false}
        >
          <Icon name='bug' />
          Complexity and Defects
        </Menu.Item>
        <Menu.Item
          name='video play'
          active={false}
        >
          <Icon name='chart bar' />
          Metrics
        </Menu.Item>
        <Menu.Item>
          <Input icon='search' placeholder='Search code...' />
        </Menu.Item>
      </Menu>
      </Grid.Column>
      <Grid.Column width={13} style={{ paddingLeft: 0 }}>
        <div>
          <Menu inverted attached="top">
            <Dropdown item icon="wrench" simple>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Icon name="dropdown" />
                  <span className="text">New</span>

                  <Dropdown.Menu>
                    <Dropdown.Item>Document</Dropdown.Item>
                    <Dropdown.Item>Image</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>Open</Dropdown.Item>
                <Dropdown.Item>Save...</Dropdown.Item>
                <Dropdown.Item>Edit Permissions</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Export</Dropdown.Header>
                <Dropdown.Item>Share</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Menu.Menu position="right">
              <Menu.Item name="logout" active={true} />
            </Menu.Menu>
          </Menu>
        </div>

        <Grid style={{ padding: "3.5vw" }}>
          <Grid.Row>
            <Card.Group>
              <Card>
                <Card.Content>
                  <Image
                    floated="right"
                    size="mini"
                    src="https://i.ibb.co/vxd7Rwc/abc-123-programmer-software-developer-generated.jpg"
                  />
                  <Card.Header>XSS</Card.Header>
                  <Card.Meta>Unsanitized user input</Card.Meta>
                  <Card.Description textAlign="center">
                  <Statistic label='detections' value='5,550' />
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button basic color="primary">
                      view more
                    </Button>
                  </div>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Image
                    floated="right"
                    size="mini"
                    src="https://i.ibb.co/vxd7Rwc/abc-123-programmer-software-developer-generated.jpg"
                  />
                  <Card.Header>XSS</Card.Header>
                  <Card.Meta>Unsanitized user input</Card.Meta>
                  <Card.Description textAlign="center">
                  <Statistic label='detections' value='5,550' />
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button basic color="primary">
                      view more
                    </Button>
                  </div>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Image
                    floated="right"
                    size="mini"
                    src="https://i.ibb.co/vxd7Rwc/abc-123-programmer-software-developer-generated.jpg"
                  />
                  <Card.Header>XSS</Card.Header>
                  <Card.Meta>Unsanitized user input</Card.Meta>
                  <Card.Description textAlign="center">
                  <Statistic label='detections' value='5,550' />
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button basic color="primary">
                      view more
                    </Button>
                  </div>
                </Card.Content>
              </Card>
              
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
            <Grid style={{ width: "100%", margin: "0" }}>
              <Grid.Row>
                <Header>Processing Status</Header>
              </Grid.Row>
              <Grid.Row>
                <Progress
                  value="4"
                  total="5"
                  progress="percent"
                  indicating
                  style={{ width: "80%" }}
                />
              </Grid.Row>
            </Grid>
          </Grid.Row>
        </Grid>
      </Grid.Column>
    </Grid>
  );
}

export default App;
