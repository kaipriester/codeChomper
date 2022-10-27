import React, { useContext } from "react";
import { Dropdown, Icon, Menu } from "semantic-ui-react";
import { useCookies } from "react-cookie";
import { logout } from "../client/API.js";
import { appContext } from "../Context";

function TopBar(props) {

	const { updateZipFileHandler, updateRouteHandler } = props;
	const userObject = useContext(appContext);
	const logout_wrapper = async (updateRouteHandler) =>
	{
		await logout();
		
		updateZipFileHandler("undefined");
		window.location.reload();
	};
	return (
		<div>
			<Menu inverted attached="top">
				<Menu.Menu position="right">
					{ (userObject) &&
						<Menu.Item
							name="logout"
							active
							onClick={() => logout_wrapper(updateRouteHandler) }
						></Menu.Item>
					}
					{ (!userObject) &&
						<>
							<Menu.Item
								name="SignUp"
								active
								onClick={() => updateRouteHandler("SignUp") }
							></Menu.Item>
							<Menu.Item
								name="LogIn"
								active
								onClick={() => updateRouteHandler("LogIn") }
							></Menu.Item>
						</>
					}
				</Menu.Menu>
			</Menu>
		</div>
	);
}

export default TopBar;