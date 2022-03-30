import React from "react";
import { Grid } from "semantic-ui-react";

function LogIn(props) {
	console.log(`props: ${props}`);
	const { updateRouteHandler } = props;
	console.log(updateRouteHandler);
	return (
		<Grid style={{ padding: "1.5vw" }}>
			<Grid.Row>
				TODO Someone needs to make this page
				{updateRouteHandler("upload")}
			</Grid.Row>
		</Grid>
	);
}

export default LogIn;
