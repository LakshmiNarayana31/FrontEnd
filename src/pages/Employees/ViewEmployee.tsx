import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Descriptions, Tag, Typography, Button, Space, Spin, Avatar, Row, Col, Divider } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  TeamOutlined,
  GlobalOutlined,
  CalendarOutlined,
  EditOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { MOCK_EMPLOYEES } from "../../data/mockData";
import type { User } from "../../components/UsersTable/types";

const { Title, Text } = Typography;

export default function ViewEmployeePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find employee in mock data
    const found = MOCK_EMPLOYEES.find((e) => e.id === id);
    setEmployee(found || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <Card style={{ textAlign: "center", padding: 48 }}>
        <Spin size="large" />
      </Card>
    );
  }

  if (!employee) {
    return (
      <Card>
        <Title level={4}>Employee not found</Title>
        <Button onClick={() => navigate("/employees")}>Back to Employees</Button>
      </Card>
    );
  }

  return (
    <div>
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/employees")}
        style={{ padding: 0, marginBottom: 16 }}
      >
        Back to Employees
      </Button>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Card>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <Avatar
                size={100}
                icon={<UserOutlined />}
                style={{ backgroundColor: "#667eea", marginBottom: 16 }}
              />
              <Title level={4} style={{ margin: 0 }}>
                {employee.firstName} {employee.lastName}
              </Title>
              <Text type="secondary">{employee.role}</Text>
              <div style={{ marginTop: 8 }}>
                <Tag color={employee.isActive ? "green" : "red"}>
                  {employee.isActive ? "Active" : "Inactive"}
                </Tag>
              </div>
            </div>

            <Divider />

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <MailOutlined style={{ color: "#667eea" }} />
                <Text>{employee.email}</Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <PhoneOutlined style={{ color: "#667eea" }} />
                <Text>{employee.phoneNumber}</Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <TeamOutlined style={{ color: "#667eea" }} />
                <Text>{employee.department}</Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <GlobalOutlined style={{ color: "#667eea" }} />
                <Text>{employee.country}</Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <CalendarOutlined style={{ color: "#667eea" }} />
                <Text>Joined: {new Date(employee.createdAt).toLocaleDateString()}</Text>
              </div>
            </div>

            <Divider />

            <Space style={{ width: "100%" }}>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => navigate(`/employees/edit/${employee.id}`)}
                block
              >
                Edit Employee
              </Button>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card title="Employee Details">
            <Descriptions bordered column={{ xs: 1, sm: 2 }}>
              <Descriptions.Item label="Employee ID">EMP{employee.userId}</Descriptions.Item>
              <Descriptions.Item label="First Name">{employee.firstName}</Descriptions.Item>
              <Descriptions.Item label="Last Name">{employee.lastName}</Descriptions.Item>
              <Descriptions.Item label="Email">{employee.email}</Descriptions.Item>
              <Descriptions.Item label="Phone">{employee.phoneNumber}</Descriptions.Item>
              <Descriptions.Item label="Gender">{employee.gender}</Descriptions.Item>
              <Descriptions.Item label="Department">
                <Tag color="blue">{employee.department}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Role">{employee.role}</Descriptions.Item>
              <Descriptions.Item label="Country">{employee.country}</Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={employee.isActive ? "green" : "red"}>
                  {employee.isActive ? "Active" : "Inactive"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Created At" span={2}>
                {new Date(employee.createdAt).toLocaleString()}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
