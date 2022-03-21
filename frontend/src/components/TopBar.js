import React from "react";
import { Dropdown, Icon, Menu } from "semantic-ui-react";

function TopBar(props) {
    console.log(`props: ${props}`);
    const { updateRouteHandler } = props;
    console.log(updateRouteHandler);
    const logout = () => {
        //Remove Users Cookies to remove their login Credentials
        updateRouteHandler("LogIn")
    }
    return (
        <div>
            <Menu inverted attached="top">
                <Menu.Menu position="right">
                    <Menu.Item name="logout" active /*onClick={() => updateRouteHandler("BugListPage") }*/>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </div>
    );
}

export default TopBar;
