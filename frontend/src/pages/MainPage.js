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
  Tab,
  Icon,
} from "semantic-ui-react";
import { Range } from 'react-range';
import moment from "moment";

function UploadPage() {
  const [files, setFiles] = useState([1, 2, 3, 4, 5]);

  const panes = [
    { menuItem: "Zip folders", render: () => getStudentFilesCards() },
    { menuItem: "Graphs", render: () => <></> },
  ];

  const getStudentFilesCards = () => {
    return (
      <Card.Group>
        {files.map((file) => (
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
    );
  };

  return (
    <Grid style={{ padding: "1.5vw" }}>
      <Grid.Row>
        <Segment style={{ width: "100%" }} fluid>
          <div>
            <Header as="h2" icon textAlign="center">
              <Icon name="users" circular />
              <Header.Content>Dashboard</Header.Content>
            </Header>
          </div>
        </Segment>
      </Grid.Row>
      <Grid.Row style={{width: '100%', padding: 0}}>
        {/* alphabetical, date, number of files, detections, severity score, reverse alphabetical (jk)) */}
        <Grid.Column style={{ width: "100%", padding: 0 }} width={15}>
          <Input style={{ width: "100%", padding: 0 }} placeholder="Search for zip file" />
        </Grid.Column>
        <Grid.Column width={1}>
          <Button fluid icon="sort"></Button>
        </Grid.Column>
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
            closeOnBlur={false}
              closeOnEscape={false}
              closeOnChange={false}
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
              <Range
        step={0.1}
        min={0}
        max={100}
        values={[50]}
        onChange={(values) => {}}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
              backgroundColor: '#ccc'
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '42px',
              width: '42px',
              backgroundColor: '#999'
            }}
          />
        )}
      />
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
        <Tab menu={{ text: true, attached: false }} panes={panes} />
      </Grid.Row>
    </Grid>
  );
}

export default UploadPage;
