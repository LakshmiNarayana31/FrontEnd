import { Card, Col, Row, Typography, Avatar, Descriptions, Tag, Tabs, Table, Statistic, Divider } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, TeamOutlined, CalendarOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import { MOCK_ATTENDANCE, MOCK_LEAVE_REQUESTS } from "../../data/mockData";

const { Title, Text } = Typography;

export default function ProfilePage() {
  const { user } = useAuth();

  // Get user's attendance and leave data
  const myAttendance = MOCK_ATTENDANCE.slice(0, 10);
  const myLeaves = MOCK_LEAVE_REQUESTS.filter((l) => l.employeeName === "Demo User" || l.employeeId === "demo");

  // Calculate stats
  const totalPresent = myAttendance.filter((a) => a.status === "Present").length;
  const totalLeaves = myLeaves.filter((l) => l.status === "Approved").length;

  const attendanceColumns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Check In", dataIndex: "checkIn", key: "checkIn", render: (v: string | null) => v || "-" },
    { title: "Check Out", dataIndex: "checkOut", key: "checkOut", render: (v: string | null) => v || "-" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colors: Record<string, string> = {
          Present: "green",
          Absent: "red",
          Late: "orange",
          "Half Day": "blue",
          "Work From Home": "purple",
        };
        return <Tag color={colors[status]}>{status}</Tag>;
      },
    },
    {
      title: "Work Hours",
      dataIndex: "workHours",
      key: "workHours",
      render: (v: number) => (v > 0 ? `${v.toFixed(1)}h` : "-"),
    },
  ];

  const tabItems = [
    {
      key: "attendance",
      label: "My Attendance",
      children: (
        <Table
          dataSource={myAttendance}
          columns={attendanceColumns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      ),
    },
    {
      key: "leaves",
      label: "My Leaves",
      children:
        myLeaves.length > 0 ? (
          <Table
            dataSource={myLeaves}
            columns={[
              { title: "Type", dataIndex: "leaveType", key: "leaveType" },
              { title: "Start Date", dataIndex: "startDate", key: "startDate" },
              { title: "End Date", dataIndex: "endDate", key: "endDate" },
              { title: "Days", dataIndex: "days", key: "days" },
              {
                title: "Status",
                dataIndex: "status",
                key: "status",
                render: (status: string) => {
                  const colors: Record<string, string> = {
                    Pending: "orange",
                    Approved: "green",
                    Rejected: "red",
                  };
                  return <Tag color={colors[status]}>{status}</Tag>;
                },
              },
            ]}
            rowKey="id"
            pagination={false}
          />
        ) : (
          <Text type="secondary">No leave requests found</Text>
        ),
    },
  ];

  return (
    <div>
      <Title level={3} style={{ marginBottom: 24 }}>
        <UserOutlined style={{ marginRight: 8 }} />
        My Profile
      </Title>

      <Row gutter={[24, 24]}>
        {/* Profile Card */}
        <Col xs={24} lg={8}>
          <Card>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <Avatar
                size={100}
                icon={<UserOutlined />}
                style={{ backgroundColor: "#1890ff", marginBottom: 16 }}
              />
              <Title level={4} style={{ margin: 0 }}>
                {user?.firstName} {user?.lastName}
              </Title>
              <Text type="secondary">{user?.role}</Text>
              <div style={{ marginTop: 8 }}>
                <Tag color="blue">{user?.department}</Tag>
              </div>
            </div>

            <Divider />

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <MailOutlined style={{ color: "#1890ff" }} />
                <Text>{user?.email}</Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <PhoneOutlined style={{ color: "#1890ff" }} />
                <Text>+1 555-0100</Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <TeamOutlined style={{ color: "#1890ff" }} />
                <Text>Employee ID: EMP001</Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <CalendarOutlined style={{ color: "#1890ff" }} />
                <Text>Joined: Jan 15, 2024</Text>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card style={{ marginTop: 16 }}>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="Days Present"
                  value={totalPresent}
                  valueStyle={{ color: "#52c41a" }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Leaves Taken"
                  value={totalLeaves}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Details Card */}
        <Col xs={24} lg={16}>
          <Card>
            <Title level={5}>Personal Information</Title>
            <Descriptions bordered column={{ xs: 1, sm: 2 }}>
              <Descriptions.Item label="First Name">{user?.firstName}</Descriptions.Item>
              <Descriptions.Item label="Last Name">{user?.lastName}</Descriptions.Item>
              <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
              <Descriptions.Item label="Phone">+1 555-0100</Descriptions.Item>
              <Descriptions.Item label="Department">{user?.department}</Descriptions.Item>
              <Descriptions.Item label="Role">{user?.role}</Descriptions.Item>
              <Descriptions.Item label="Employee ID">EMP001</Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color="green">Active</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Manager">Emma Wilson</Descriptions.Item>
              <Descriptions.Item label="Location">USA</Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Tabs for Attendance and Leaves */}
          <Card style={{ marginTop: 16 }}>
            <Tabs items={tabItems} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
