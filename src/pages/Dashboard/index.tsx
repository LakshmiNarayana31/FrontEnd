import { Card, Col, Row, Statistic, Table, Tag, Typography, Progress } from "antd";
import {
  TeamOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  RiseOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  getDashboardStats,
  getDepartmentBreakdown,
  MOCK_LEAVE_REQUESTS,
  MOCK_ATTENDANCE,
} from "../../data/mockData";

const { Title, Text } = Typography;

export default function DashboardPage() {
  const stats = getDashboardStats();
  const departmentData = getDepartmentBreakdown();
  const pendingLeaves = MOCK_LEAVE_REQUESTS.filter((l) => l.status === "Pending");
  const recentAttendance = MOCK_ATTENDANCE.slice(0, 5);

  const statCards = [
    {
      title: "Total Employees",
      value: stats.totalEmployees,
      icon: <TeamOutlined style={{ fontSize: 24, color: "#1890ff" }} />,
      color: "#e6f7ff",
    },
    {
      title: "Active Employees",
      value: stats.activeEmployees,
      icon: <CheckCircleOutlined style={{ fontSize: 24, color: "#52c41a" }} />,
      color: "#f6ffed",
    },
    {
      title: "Present Today",
      value: stats.presentToday,
      icon: <UserOutlined style={{ fontSize: 24, color: "#722ed1" }} />,
      color: "#f9f0ff",
    },
    {
      title: "Pending Leaves",
      value: stats.pendingLeaves,
      icon: <ClockCircleOutlined style={{ fontSize: 24, color: "#faad14" }} />,
      color: "#fffbe6",
    },
  ];

  const attendanceColumns = [
    { title: "Employee", dataIndex: "employeeName", key: "employeeName" },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Date", dataIndex: "date", key: "date" },
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
        return <Tag color={colors[status] || "default"}>{status}</Tag>;
      },
    },
    { title: "Check In", dataIndex: "checkIn", key: "checkIn", render: (v: string | null) => v || "-" },
  ];

  const leaveColumns = [
    { title: "Employee", dataIndex: "employeeName", key: "employeeName" },
    { title: "Type", dataIndex: "leaveType", key: "leaveType" },
    { title: "Days", dataIndex: "days", key: "days" },
    { title: "Start Date", dataIndex: "startDate", key: "startDate" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: () => <Tag color="orange">Pending</Tag>,
    },
  ];

  return (
    <div>
      <Title level={3} style={{ marginBottom: 24 }}>
        <RiseOutlined style={{ marginRight: 8 }} />
        Dashboard Overview
      </Title>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {statCards.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card style={{ background: stat.color, borderRadius: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {stat.icon}
                </div>
                <Statistic title={stat.title} value={stat.value} />
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Department Distribution & Quick Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card
            title={
              <>
                <TeamOutlined style={{ marginRight: 8 }} />
                Department Distribution
              </>
            }
          >
            {departmentData.map((dept) => (
              <div key={dept.department} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <Text>{dept.department}</Text>
                  <Text strong>{dept.count} employees</Text>
                </div>
                <Progress
                  percent={Math.round((dept.count / stats.totalEmployees) * 100)}
                  strokeColor={dept.color}
                  showInfo={false}
                />
              </div>
            ))}
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={
              <>
                <CalendarOutlined style={{ marginRight: 8 }} />
                Pending Leave Requests
              </>
            }
          >
            {pendingLeaves.length > 0 ? (
              <Table
                dataSource={pendingLeaves}
                columns={leaveColumns}
                pagination={false}
                size="small"
                rowKey="id"
              />
            ) : (
              <Text type="secondary">No pending leave requests</Text>
            )}
          </Card>
        </Col>
      </Row>

      {/* Recent Attendance */}
      <Card
        title={
          <>
            <CheckCircleOutlined style={{ marginRight: 8 }} />
            Recent Attendance
          </>
        }
      >
        <Table
          dataSource={recentAttendance}
          columns={attendanceColumns}
          pagination={false}
          size="small"
          rowKey="id"
        />
      </Card>
    </div>
  );
}
