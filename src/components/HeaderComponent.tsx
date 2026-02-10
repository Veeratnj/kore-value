import React, { useState } from "react";
import {
  Avatar,
  Dropdown,
  Menu,
  Space,
  Switch,
  Drawer,
  Button,
  type MenuProps,
} from "antd";
import {
  UserOutlined,
  MenuOutlined,
  HomeOutlined,
  StockOutlined,
  HistoryOutlined,
  BarChartOutlined,
  BorderOuterOutlined,
  ToolOutlined,
  ArrowLeftOutlined,
  OpenAIOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../scss/HeaderComponent.scss"; // SCSS file

interface HeaderComponentProps {
  toggleTheme: () => void;
  currentTheme: "dark" | "light";
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({
  toggleTheme,
  currentTheme,
}) => {
  const isDark = currentTheme === "dark";
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();

  const userMenuItems: MenuProps["items"] = [
    {
      key: "username",
      label: <strong>Elon musk</strong>,
      disabled: true,
    },
    { type: "divider" },
    {
      key: "logout",
      label: <span>Logout</span>,
      onClick: () => alert("Logged out!"),
    },
  ];

  const navItems: MenuProps["items"] = [
    { label: "Home", key: "2", icon: <HomeOutlined /> },
    { label: "Stocks", key: "s", icon: <StockOutlined /> },
    { label: "History", key: "h", icon: <HistoryOutlined /> },
    { label: "Agents", key: "cs", icon: <OpenAIOutlined /> },
    { label: "Order", key: "order", icon: <BorderOuterOutlined /> },
    { label: "Tools", key: "t", icon: <ToolOutlined /> },
  ];

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const onNavMenuClick = ({ key }: { key: string }) => {
    navigate(key === "2" ? "/" : `/${key}`);
    closeDrawer();
  };

  return (
    <div className={`header-container ${isDark ? "dark" : "light"}`}>
      {/* LEFT: Hamburger */}
      <Button
        type="text"
        // icon={<MenuOutlined className="menu-icon" />}
        icon={<MenuOutlined className="menu-icon" style={{ color: isDark ? "#fff" : "#000" }} />}

        onClick={showDrawer}
        className="menu-btn"
      />

      {/* RIGHT: Theme toggle and user avatar */}
      <div className="right-controls">
        {/* <Switch
          checked={isDark}
          onChange={toggleTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        /> */}
        <Switch
          checked={isDark}
          onChange={toggleTheme}
          checkedChildren={<span><i className="fas fa-moon" /> Dark</span>}
          unCheckedChildren={<span><i className="fas fa-sun" /> Light</span>}
          className="theme-toggle-switch"
        />

        <Dropdown
          placement="bottomRight"
          arrow
          dropdownRender={() => (
            <div className={isDark ? "custom-menu-dark" : "custom-menu-light"}>
              <Menu
                items={userMenuItems}
                className={isDark ? "custom-menu-dark" : "custom-menu-light"}
              />
            </div>
          )}
        >
          <Space className="avatar-wrapper">
            <Avatar
              size="large"
              icon={<UserOutlined />}
              style={{
                backgroundColor: isDark ? "#141414" : "#1890ff",
              }}
            />
          </Space>
        </Dropdown>
      </div>

      {/* DRAWER */}
      <Drawer
        // title="Menu"
        title={
              <div className="drawer-header">
                {/* <img src="/path/to/logo.png" alt="Logo" className="drawer-logo" /> */}
                <span className="drawer-title">GenAI</span>
              </div>
            }
        closable={false}
        placement="left"
        onClose={closeDrawer}
        open={drawerVisible}
        bodyStyle={{
          padding: 0,
          height: "calc(100vh - 48px)",
          overflowY: "auto",
        }}
        headerStyle={{
          backgroundColor: isDark ? "#001529" : "#fff",
          color: isDark ? "#fff" : "#000",
        }}
        drawerStyle={{
          backgroundColor: isDark ? "#001529" : "#fff",
          color: isDark ? "#fff" : "#000",
        }}
        footer={
          <div className="drawer-footer">
            <Button
              type="primary"
              icon={<ArrowLeftOutlined />}
              onClick={closeDrawer}
              block
              className="close-btn"
            >
              Close Menu
            </Button>
          </div>
        }
      >
        <Menu
          mode="inline"
          items={navItems}
          onClick={onNavMenuClick}
          selectedKeys={[
            window.location.pathname === "/" ? "2" : window.location.pathname.slice(1),
          ]}
          theme={isDark ? "dark" : "light"}
        />
      </Drawer>
    </div>
  );
};

export default HeaderComponent;
