import React from 'react';
import {
  Progress,
  Grid,
  Image,
  Button,
  Statistic,
  Form,
  Dropdown,
  Icon,
  Menu,
  Header,
  Card,
  Modal,
} from 'semantic-ui-react';

function TopBar() {
  return (
    <div>
      <Menu inverted attached="top">
        <Dropdown item icon="wrench" simple>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Icon name="dropdown" />
              <span className="text">New</span>

              <Dropdown.Menu>
                <Dropdown.Item>Document</Dropdown.Item>
                <Dropdown.Item>Image</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item>Open</Dropdown.Item>
            <Dropdown.Item>Save...</Dropdown.Item>
            <Dropdown.Item>Edit Permissions</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Export</Dropdown.Header>
            <Dropdown.Item>Share</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Menu position="right">
          <Menu.Item name="logout" active />
        </Menu.Menu>
      </Menu>
    </div>
  );
}

export default TopBar;
