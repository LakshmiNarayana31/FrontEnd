import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { User } from "./types";
import ActionButtons from "./ActionButtons";

// Columns are display-only — all filtering is handled by FilterPanel at the top.

export const userColumns: ColumnsType<User> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 130,
  },
  {
    title: "User ID",
    dataIndex: "userId",
    key: "userId",
    width: 90,
    sorter: true,
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    width: 150,
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    width: 100,
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    width: 110,
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
    width: 110,
  },
  {
    title: "Status",
    dataIndex: "isActive",
    key: "isActive",
    width: 100,
    render: (isActive: boolean) =>
      isActive ? (
        <Tag color="green">Active</Tag>
      ) : (
        <Tag color="red">Inactive</Tag>
      ),
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 180,
    render: (value: string) =>
      value ? new Date(value).toLocaleString() : "-",
    sorter: true,
  },
  {
    title: "Actions",
    key: "actions",
    width: 160,
    fixed: "right",
    render: (_: unknown, record: User) => <ActionButtons id={record.id} />,
  },
];
