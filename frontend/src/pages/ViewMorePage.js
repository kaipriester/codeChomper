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
  Icon,
  Tab,
} from "semantic-ui-react";
import moment from "moment";

function ViewMorePage() {
  const panes = [
    { menuItem: "Graphs", render: () => <></> },
    {
      menuItem: "Students",
      render: () => (
        <Card.Group>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((r) => (
            <Card>
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  src="https://i.ibb.co/vxd7Rwc/abc-123-programmer-software-developer-generated.jpg"
                />
                <Card.Header>{"Aaron G"}</Card.Header>
                <Card.Meta>Submitted 20 files</Card.Meta>
                {/* <Card.Meta>Submitted 20 files</Card.Meta> */}
                {/* <Card.Meta>Submitted 20 files</Card.Meta> */}
                {/* <Card.Description textAlign="center">
            <Statistic label="detections" value={"4"} />
            <Statistic label="severity score" value={"9"} />
          </Card.Description> */}
              </Card.Content>
              <Card.Content extra>
                <Icon color={"blue"} name="user" />
                <span style={{ color: "blue" }}>16 Detections</span>
              </Card.Content>
              <Card.Content extra>
                <Icon color={"red"} name="exclamation triangle" />
                <span style={{ color: "red" }}>7 Severity Score</span>
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
      ),
    },
  ];

  return (
    <Grid style={{ padding: "3.5vw" }}>
      <Grid.Row>
        <Header as="h1">
          studentfiles.zip
          <Header.Subheader>
            Ran on {moment().format("D MMM, YYYY")}
          </Header.Subheader>
        </Header>
      </Grid.Row>
      <Grid.Row>
        <Card.Group>
          <Card>
            <Card.Content>
              <Card.Description textAlign="center">
                <Statistic label="number of files" value={"2"} />
              </Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Description textAlign="center">
                <Statistic label="number of detections" value={"49"} />
              </Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Description textAlign="center">
                <Statistic label="Severity Score" value={"1"} />
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
      </Grid.Row>
      <Grid.Row>
        {/* alphabetical, date, number of files, detections, severity score, reverse alphabetical (jk)) */}
        <Grid.Column style={{ width: "80%" }}>
          <Input style={{ width: "100%" }} placeholder="Search for student" />
        </Grid.Column>
        <Grid.Column>
          <Button icon="sort"></Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Tab menu={{ text: true, attached: false }} panes={panes} />
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

export default ViewMorePage;
