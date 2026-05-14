import { Menu, Avatar, Dropdown, Space, Typography } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const { Text } = Typography;

const NAV_ITEMS = [
  {
    key: "/dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "/employees",
    icon: <TeamOutlined />,
    label: "Employees",
  },
  {
    key: "/attendance",
    icon: <ClockCircleOutlined />,
    label: "Attendance",
  },
  {
    key: "/leave",
    icon: <CalendarOutlined />,
    label: "Leave",
  },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Highlight the active nav item based on the current path
  const activeKey =
    NAV_ITEMS.map((item) => item.key)
      .filter((key) => location.pathname.startsWith(key))
      .sort((a, b) => b.length - a.length)[0] ?? "/dashboard";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "My Profile",
      onClick: () => navigate("/profile"),
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => navigate("/settings"),
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      {/* Logo and Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div
          style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TeamOutlined style={{ color: "#fff", fontSize: 18 }} />
          </div>
          <Text strong style={{ fontSize: 18, color: "#1a1a2e" }}>
            WorkForce Hub
          </Text>
        </div>

        {/* Navigation Menu */}
        <Menu
          mode="horizontal"
          selectedKeys={[activeKey]}
          items={NAV_ITEMS}
          onClick={({ key }) => navigate(key)}
          style={{ lineHeight: "64px", border: "none", background: "transparent" }}
        />
      </div>

      {/* User Menu */}
      <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={["click"]}>
        <Space style={{ cursor: "pointer" }}>
          <Avatar
            size="small"
            icon={<UserOutlined />}
            style={{ backgroundColor: "#667eea" }}
          />
          <Text>{user?.firstName} {user?.lastName}</Text>
        </Space>
      </Dropdown>
    </div>
  );
}
