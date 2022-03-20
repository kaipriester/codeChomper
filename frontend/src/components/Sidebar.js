import React from "react";
import { Icon, Menu, Input, Divider } from "semantic-ui-react";

function Sidebar(props) {
    console.log(`props: ${props}`);
    const { updateRouteHandler } = props;
    console.log(updateRouteHandler);

    return (
        <>
            <Menu inverted compact style={{ width: "100%" }}>
                <Menu.Item header>JSAnalyzer</Menu.Item>
            </Menu>
            <Menu
                vertical
                style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: "100vh",
                }}
            >
                <Menu.Item
                    name="gamepad"
                    active={false}
                    onClick={() => {
                        updateRouteHandler("main");
                        console.log("TESTTT");
                    }}
                >
                    <Icon name="globe" />
                    Overview
                </Menu.Item>

                <Menu.Item name="upload" active={false} onClick={() => updateRouteHandler("upload")}>
                    <Icon name="upload" />
                    Upload Code
                </Menu.Item>

                <Menu.Item name="bug" active={false} onClick={() => updateRouteHandler("BugListPage")}>
                    <Icon name="bug" />
                    Detectable Security Issues
                </Menu.Item>
                <Menu.Item name="video play" active={false} onClick={() => updateRouteHandler("MetricsPage")} >
                    <Icon name="chart bar" />
                    Metrics
                </Menu.Item>
                <Menu.Item></Menu.Item>
                {/* <Menu.Item>
          <Input icon="search" placeholder="Search code..." />
        </Menu.Item> */}
            </Menu>
        </>
    );
}

export default Sidebar;
