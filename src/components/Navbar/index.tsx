import { Menu } from "antd";
import {
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  {
    key: "/users",
    icon: <UnorderedListOutlined />,
    label: "List Users",
  },
  {
    key: "/users/add",
    icon: <UserAddOutlined />,
    label: "Add User",
  },
  {
    key: "/users/edit",
    icon: <EditOutlined />,
    label: "Edit User",
  },
  {
    key: "/users/delete",
    icon: <DeleteOutlined />,
    label: "Delete User",
  },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Highlight the active nav item based on the current path
  const activeKey =
    NAV_ITEMS.map((item) => item.key)
      .filter((key) => location.pathname.startsWith(key))
      .sort((a, b) => b.length - a.length)[0] ?? "/users";

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[activeKey]}
      items={NAV_ITEMS}
      onClick={({ key }) => navigate(key)}
      style={{ lineHeight: "64px" }}
    />
  );
}
