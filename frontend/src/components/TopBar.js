import React from "react";
import { Dropdown, Icon, Menu } from "semantic-ui-react";
import { useCookies } from "react-cookie";

function TopBar(props) {

    const { updateRouteHandler } = props;
    const [cookies, setCookie] = useCookies(["user"]);

	console.log(updateRouteHandler);
	const logout = (updateRouteHandler) => {
		//Remove Users Cookies to remove their login Credentials
		updateRouteHandler("LogIn");
        setCookie("password", "", { path: "/" });
	};
	return (
		<div>
			<Menu inverted attached="top">
				<Menu.Menu position="right">
					<Menu.Item
						name="logout"
						active
                        onClick={() => logout(updateRouteHandler) }
					></Menu.Item>
				</Menu.Menu>
			</Menu>
		</div>
	);
}

export default TopBar;
