import React from 'react';
import {
  Progress,
  Grid,
  Image,
  Button,
  Checkbox,
  Statistic,
  Form,
  Dropdown,
  Icon,
  Menu,
  Segment,
  Header,
  Card,
  Label,
  Input,
  Modal,
} from 'semantic-ui-react';

function Sidebar() {
  return (
    <>
      <Menu inverted compact style={{ width: '100%' }}>
        <Menu.Item header>JSAnalyzer</Menu.Item>
      </Menu>
      <Menu
        vertical
        style={{
          padding: 0, margin: 0, width: '100%', height: '100vh',
        }}
      >
        <Menu.Item name="gamepad" active={false}>
          <Icon name="globe" />
          Overview
        </Menu.Item>

        <Menu.Item name="video camera" active={false}>
          <Icon name="columns" />
          Violations
        </Menu.Item>

        <Menu.Item name="video play" active={false}>
          <Icon name="bug" />
          Complexity and Defects
        </Menu.Item>
        <Menu.Item name="video play" active={false}>
          <Icon name="chart bar" />
          Metrics
        </Menu.Item>
        <Menu.Item>
          <Input icon="search" placeholder="Search code..." />
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sidebar;
