import { useState } from "react";
import { Card, Table, Tag, Typography, DatePicker, Select, Row, Col, Statistic, Button, Space } from "antd";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FieldTimeOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { MOCK_ATTENDANCE, MOCK_EMPLOYEES, type AttendanceRecord, type AttendanceStatus } from "../../data/mockData";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;
const { RangePicker } = DatePicker;

export default function AttendancePage() {
  const [selectedEmployee, setSelectedEmployee] = useState<string | undefined>();
  const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>();

  const filteredData = MOCK_ATTENDANCE.filter((record) => {
    if (selectedEmployee && record.employeeId !== selectedEmployee) return false;
    if (selectedDepartment && record.department !== selectedDepartment) return false;
    return true;
  });

  const presentCount = filteredData.filter((r) => r.status === "Present").length;
  const absentCount = filteredData.filter((r) => r.status === "Absent").length;
  const lateCount = filteredData.filter((r) => r.status === "Late").length;
  const wfhCount = filteredData.filter((r) => r.status === "Work From Home").length;

  const statusColors: Record<AttendanceStatus, string> = {
    Present: "green",
    Absent: "red",
    Late: "orange",
    "Half Day": "blue",
    "Work From Home": "purple",
  };

  const columns: ColumnsType<AttendanceRecord> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "Employee",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      filters: [
        { text: "Engineering", value: "Engineering" },
        { text: "Marketing", value: "Marketing" },
        { text: "Sales", value: "Sales" },
        { text: "HR", value: "HR" },
        { text: "Finance", value: "Finance" },
      ],
      onFilter: (value, record) => record.department === value,
    },
    {
      title: "Check In",
      dataIndex: "checkIn",
      key: "checkIn",
      render: (value: string | null) => value || "-",
    },
    {
      title: "Check Out",
      dataIndex: "checkOut",
      key: "checkOut",
      render: (value: string | null) => value || "-",
    },
    {
      title: "Work Hours",
      dataIndex: "workHours",
      key: "workHours",
      render: (value: number) => (value > 0 ? `${value.toFixed(1)}h` : "-"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: AttendanceStatus) => (
        <Tag color={statusColors[status]}>{status}</Tag>
      ),
      filters: [
        { text: "Present", value: "Present" },
        { text: "Absent", value: "Absent" },
        { text: "Late", value: "Late" },
        { text: "Half Day", value: "Half Day" },
        { text: "Work From Home", value: "Work From Home" },
      ],
      onFilter: (value, record) => record.status === value,
    },
  ];

  const employeeOptions = MOCK_EMPLOYEES.map((emp) => ({
    label: `${emp.firstName} ${emp.lastName}`,
    value: emp.id,
  }));

  const departmentOptions = [
    { label: "Engineering", value: "Engineering" },
    { label: "Marketing", value: "Marketing" },
    { label: "Sales", value: "Sales" },
    { label: "HR", value: "HR" },
    { label: "Finance", value: "Finance" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>
          <ClockCircleOutlined style={{ marginRight: 8 }} />
          Attendance Management
        </Title>
        <Button icon={<DownloadOutlined />}>Export Report</Button>
      </div>

      {/* Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Present"
              value={presentCount}
              valueStyle={{ color: "#52c41a" }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Absent"
              value={absentCount}
              valueStyle={{ color: "#ff4d4f" }}
              prefix={<CloseCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Late"
              value={lateCount}
              valueStyle={{ color: "#faad14" }}
              prefix={<FieldTimeOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Work From Home"
              value={wfhCount}
              valueStyle={{ color: "#722ed1" }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <label style={{ display: "block", marginBottom: 4 }}>Date Range</label>
            <RangePicker style={{ width: "100%" }} />
          </Col>
          <Col xs={24} sm={8}>
            <label style={{ display: "block", marginBottom: 4 }}>Employee</label>
            <Select
              placeholder="Select employee"
              options={employeeOptions}
              allowClear
              style={{ width: "100%" }}
              value={selectedEmployee}
              onChange={setSelectedEmployee}
            />
          </Col>
          <Col xs={24} sm={8}>
            <label style={{ display: "block", marginBottom: 4 }}>Department</label>
            <Select
              placeholder="Select department"
              options={departmentOptions}
              allowClear
              style={{ width: "100%" }}
              value={selectedDepartment}
              onChange={setSelectedDepartment}
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
          pagination={{ pageSize: 10, showSizeChanger: true }}
        />
      </Card>
    </div>
  );
}
