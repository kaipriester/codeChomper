import React from "react";
import { Menu } from "semantic-ui-react";
//TODO move the banner component here and add it to the main page and have it recieve either the current page or the info to put in the banner IE the ICON/ Text to display
function Banner() {
    return (
        <div>
            <Menu inverted attached="top">
                <Menu.Menu position="right">
                    <Menu.Item name="logout" active /*onClick={() => logout(updateRouteHandler) }*/>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </div>
    );
}

export default TopBar;
