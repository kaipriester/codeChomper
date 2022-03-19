import "./App.css";
import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import moment from "moment";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import UploadPage from "./pages/UploadPage";
import MainPage from "./pages/MainPage";
import ViewMorePage from "./pages/ViewMorePage";

function App() {
  const [currentRoute, setCurrentRoute] = useState("main");

  const getCurrentRoute = () => {
    switch (currentRoute) {
      case "main":
        return <MainPage />;
        break;
      case "upload":
        return <UploadPage />;
        break;
    }
  };

  return (
    <Grid>
      <Grid.Column width={3} style={{ paddingRight: 0 }}>
        <Sidebar updateRouteHandler={setCurrentRoute} />
      </Grid.Column>
      <Grid.Column width={13} style={{ paddingLeft: 0 }}>
        <TopBar />
        {getCurrentRoute()}
      </Grid.Column>
    </Grid>
  );
}

export default App;
