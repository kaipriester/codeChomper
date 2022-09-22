import React from "react";
import { Dropdown, Icon, Menu } from "semantic-ui-react";
import { useCookies } from "react-cookie";
import { logout } from "../client/API.js";

function TopBar(props) {

  const { updateRouteHandler } = props;
  const [cookies, setCookie, removeCookie] = useCookies(["loggedIn"]);

	const logout_wrapper = async (updateRouteHandler) => {
		await logout();
		updateRouteHandler("LogIn");
    removeCookie("loggedIn", { path: "/" });
	};
	return (
		<div>
			<Menu inverted attached="top">
				<Menu.Menu position="right">
					{ (cookies.loggedIn) &&
						<Menu.Item
							name="logout"
							active
							onClick={() => logout_wrapper(updateRouteHandler) }
						></Menu.Item>
					}
					{ (!cookies.loggedIn) &&
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