import React, { useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  Form,
  Button,
  Image,
  Header,
  Input,
  Segment,
  Statistic,
  Dropdown,
} from "semantic-ui-react";
import moment from "moment";

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
    <Grid style={{ padding: "1.5vw" }}>
      <Grid.Row>
        <Segment style={{ width: "100%", height: "10vh" }} fluid>
          <Header>Dashboard</Header>
        </Segment>
      </Grid.Row>
      <Grid.Row>
          {/* alphabetical, date, number of files, detections, severity score, reverse alphabetical (jk)) */}
          <Grid.Column style={{ width: "80%" }}><Input style={{ width: "100%" }} placeholder="Search for zip file" /></Grid.Column>
          <Grid.Column><Button icon="sort"></Button></Grid.Column>

      </Grid.Row>
      <Grid.Row>
        <Grid columns={4}>
          <Grid.Column>
            <Dropdown
              text="Filter"
              icon="filter"
              floating
              labeled
              button
              className="icon"
            >
              <Dropdown.Menu>
                <Dropdown.Header icon="tags" content="Filter by tag" />
                <Dropdown.Divider />
                <Dropdown.Item
                  label={{ color: "red", empty: true, circular: true }}
                  text="Important"
                />
                <Dropdown.Item
                  label={{ color: "blue", empty: true, circular: true }}
                  text="Announcement"
                />
                <Dropdown.Item
                  label={{ color: "black", empty: true, circular: true }}
                  text="Discussion"
                />
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
          <Grid.Column>
            <Dropdown
              text="Range of file number"
              icon="filter"
              floating
              labeled
              button
              className="icon"
            >
              <Dropdown.Menu>
                <Dropdown.Header icon="tags" content="≥" />
                <Dropdown.Header content="Range of detections" />
                <Input icon="search" iconPosition="left" name="search" />
                <Dropdown.Header icon="tags" content="Filter by tag" />
                <Dropdown.Divider />
                <Dropdown.Item
                  label={{ color: "red", empty: true, circular: true }}
                  text="Important"
                />
                <Dropdown.Item
                  label={{ color: "blue", empty: true, circular: true }}
                  text="Announcement"
                />
                <Dropdown.Item
                  label={{ color: "black", empty: true, circular: true }}
                  text="Discussion"
                />
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
          <Grid.Column>
          <Dropdown
              text="Min # of files"
              icon="filter"
              floating
              labeled
              button
              className="icon"
            >
              <Dropdown.Menu>
                <Dropdown.Header icon="tags" content="≥" />
                <Dropdown.Header content="Min # of files" />
                <Input icon="search" iconPosition="left" name="search" />
                <Dropdown.Header icon="tags" content="Filter by tag" />
                <Dropdown.Divider />
                <Dropdown.Item
                  label={{ color: "red", empty: true, circular: true }}
                  text="Important"
                />
                <Dropdown.Item
                  label={{ color: "blue", empty: true, circular: true }}
                  text="Announcement"
                />
                <Dropdown.Item
                  label={{ color: "black", empty: true, circular: true }}
                  text="Discussion"
                />
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
          <Grid.Column>
          <Dropdown
              text="Date Range"
              icon="filter"
              floating
              labeled
              button
              className="icon"
            >
              <Dropdown.Menu>
                <Dropdown.Header icon="tags" content="≥" />
                <Dropdown.Header content="Range of detections" />
                <Input icon="search" iconPosition="left" name="search" />
                <Dropdown.Header icon="tags" content="Filter by tag" />
                <Dropdown.Divider />
                <Dropdown.Item
                  label={{ color: "red", empty: true, circular: true }}
                  text="Important"
                />
                <Dropdown.Item
                  label={{ color: "blue", empty: true, circular: true }}
                  text="Announcement"
                />
                <Dropdown.Item
                  label={{ color: "black", empty: true, circular: true }}
                  text="Discussion"
                />
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
        </Grid>
      </Grid.Row>
      <Grid.Row>
        <Card.Group>
          {[1, 2, 3, 4, 5, 6].map((e) => (
            <Card>
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  src="https://i.ibb.co/vxd7Rwc/abc-123-programmer-software-developer-generated.jpg"
                />
                <Card.Header>{"studentfiles.zip"}</Card.Header>
                <Card.Meta>Ran on {moment().format("D MMM, YYYY")}</Card.Meta>
                <Card.Description textAlign="center">
                  <Statistic label="number of files" value={"2"} />
                  <Statistic label="detections" value={"4"} />
                  <Statistic label="severity score" value={"9"} />
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="primary" onClick={() => {}}>
                    view more
                  </Button>
                </div>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Grid.Row>
    </Grid>
  );
}

export default UploadPage;
