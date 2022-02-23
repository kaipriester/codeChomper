import './App.css';
import React, { useState } from 'react';
import {
  Grid
} from 'semantic-ui-react';
import moment from 'moment';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import UploadPage from './pages/UploadPage';

function App() {
  return (
    <Grid>
      <Grid.Column width={3} style={{ paddingRight: 0 }}>
        <Sidebar />
      </Grid.Column>
      <Grid.Column width={13} style={{ paddingLeft: 0 }}>
        <TopBar />

        <UploadPage />
      </Grid.Column>
      {/* <Modal
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
      </Modal> */}
    </Grid>
  );
}

export default App;
