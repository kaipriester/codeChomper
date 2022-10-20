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
import SignUp from "./pages/SignUp";
import Landing from "./pages/Landing";
import DownloadReportPage from "./pages/DownloadReportPage";
import { useCookies } from "react-cookie";

function App() {
	const [cookies, setCookie] = useCookies(["loggedIn"]);
	let defaultRoute = "LogIn";
	if (cookies.loggedIn) {defaultRoute = "main";}
	const [currentRoute, setCurrentRoute] = useState(defaultRoute);
	const [currentZipFileId, setCurrentZipFileId] = useState("undefined");

	const getCurrentRoute = () => {
		if (currentZipFileId !== "undefined") {
			return (
				<ViewMorePage
					id={currentZipFileId}
					updateRouteHandler={setCurrentRoute}
					updateZipFileHandler={setCurrentZipFileId}
				/>
			);
		}

		switch (currentRoute) {
			case "LogIn":
				return <LogIn updateRouteHandler={setCurrentRoute} />;
			case "SignUp":
				return <SignUp updateRouteHandler={setCurrentRoute} />;
			case "Landing":
				return <Landing updateRouteHandler={setCurrentRoute}/>;
			case "main":
				return (
					<MainPage
						updateRouteHandler={setCurrentRoute}
						updateZipFileHandler={setCurrentZipFileId}
					/>
				);
			case "upload":
				return <UploadPage />;
			case "BugListPage":
				return <BugListPage />;
			case "MetricsPage":
				return <MetricsPage />;
			case "DownloadReportPage":
				return <DownloadReportPage/>
		}
	};

	return (
		<div>
			{(cookies.loggedIn) && (
			<Grid>
				<Grid.Column width={3} style={{ paddingRight: 0 }}>
						<Sidebar
							updateZipFileHandler={setCurrentZipFileId}
							updateRouteHandler={setCurrentRoute}
							style={{ width: "100%" }}
						/>
				</Grid.Column>
				<Grid.Column width={13} style={{ paddingLeft: 0 }}>
					<TopBar
						updateZipFileHandler={setCurrentZipFileId}
						updateRouteHandler={setCurrentRoute}
					/>
					{getCurrentRoute()}
				</Grid.Column>
				</Grid>
			)}
			{(!cookies.loggedIn) && (
				<>
					<TopBar updateRouteHandler={setCurrentRoute} />
					<div style={{paddingLeft: "20%", paddingRight: "15%", paddingTop: "5%"}}>
						{getCurrentRoute()}
					</div>
				</>
				)
			}
		</div>
		
	);
}

export default App;