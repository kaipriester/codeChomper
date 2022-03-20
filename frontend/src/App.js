import "./App.css";
import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import moment from "moment";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import UploadPage from "./pages/UploadPage";
import MainPage from "./pages/MainPage";
import BugListPage from "./pages/BugsDisplayPage";
import ViewMorePage from "./pages/ViewMorePage";
import MetricsPage from "./pages/Metrics";
import LogIn from "./pages/LogIn";

function App() {
    const [currentRoute, setCurrentRoute] = useState("LogIn");

    const getCurrentRoute = () => {
        switch (currentRoute) {
            case "main":
                return <MainPage />;
                break;
            case "upload":
                return <UploadPage />;
                break;
            case "BugListPage":
                return <BugListPage />;
                break;
            case "MetricsPage":
                return <MetricsPage />;
                break;
            case "LogIn":
                return <LogIn updateRouteHandler={setCurrentRoute} />;
                break;
        }
    };

    return (
        <Grid>

            <Grid.Column width={3} style={{ paddingRight: 0 }}>
                {currentRoute != "LogIn" && <Sidebar updateRouteHandler={setCurrentRoute} />}
            </Grid.Column>
            <Grid.Column width={13} style={{ paddingLeft: 0 }}>
                {currentRoute != "LogIn" && <TopBar />}
                {getCurrentRoute()}
            </Grid.Column>
        </Grid>
    );
}

export default App;
