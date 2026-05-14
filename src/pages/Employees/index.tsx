import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Table, Tag, Typography, Button, Input, Select, Space, Row, Col, Avatar } from "antd";
import {
  TeamOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { MOCK_EMPLOYEES } from "../../data/mockData";
import type { User } from "../../components/UsersTable/types";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

export default function EmployeesPage() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();

  const filteredData = MOCK_EMPLOYEES.filter((emp) => {
    const matchesSearch =
      searchText === "" ||
      `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchText.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchText.toLowerCase());
    const matchesDept = !selectedDepartment || emp.department === selectedDepartment;
    const matchesStatus =
      !selectedStatus ||
      (selectedStatus === "active" ? emp.isActive : !emp.isActive);
    return matchesSearch && matchesDept && matchesStatus;
  });

  const columns: ColumnsType<User> = [
    {
      title: "Employee",
      key: "employee",
      render: (_, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} style={{ backgroundColor: "#667eea" }} />
          <div>
            <div style={{ fontWeight: 500 }}>
              {record.firstName} {record.lastName}
            </div>
            <div style={{ fontSize: 12, color: "#888" }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "Employee ID",
      dataIndex: "userId",
      key: "userId",
      render: (id: number) => `EMP${id}`,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (dept: string) => {
        const colors: Record<string, string> = {
          Engineering: "blue",
          Marketing: "green",
          Sales: "orange",
          HR: "pink",
          Finance: "purple",
        };
        return <Tag color={colors[dept] || "default"}>{dept}</Tag>;
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>{isActive ? "Active" : "Inactive"}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/employees/${record.id}`)}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => navigate(`/employees/edit/${record.id}`)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => navigate(`/employees/delete/${record.id}`)}
          />
        </Space>
      ),
    },
  ];

  const departmentOptions = [
    { label: "Engineering", value: "Engineering" },
    { label: "Marketing", value: "Marketing" },
    { label: "Sales", value: "Sales" },
    { label: "HR", value: "HR" },
    { label: "Finance", value: "Finance" },
  ];

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>
          <TeamOutlined style={{ marginRight: 8 }} />
          Employee Directory
        </Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate("/employees/add")}>
          Add Employee
        </Button>
      </div>

      {/* Filters */}
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Input
              placeholder="Search by name or email"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={8}>
            <Select
              placeholder="Filter by department"
              options={departmentOptions}
              allowClear
              style={{ width: "100%" }}
              value={selectedDepartment}
              onChange={setSelectedDepartment}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Select
              placeholder="Filter by status"
              options={statusOptions}
              allowClear
              style={{ width: "100%" }}
              value={selectedStatus}
              onChange={setSelectedStatus}
            />
          </Col>
        </Row>
      </Card>

      {/* Table */}
      <Card>
        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}–${range[1]} of ${total} employees`,
          }}
        />
      </Card>
    </div>
  );
}
