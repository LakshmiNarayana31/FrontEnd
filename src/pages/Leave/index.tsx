import { useState } from "react";
import { Card, Table, Tag, Typography, Button, Space, Modal, Form, Input, Select, DatePicker, message } from "antd";
import {
  CalendarOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { MOCK_LEAVE_REQUESTS, type LeaveRequest, type LeaveStatus, type LeaveType } from "../../data/mockData";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

export default function LeavePage() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(MOCK_LEAVE_REQUESTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const statusColors: Record<LeaveStatus, string> = {
    Pending: "orange",
    Approved: "green",
    Rejected: "red",
  };

  const leaveTypeColors: Record<LeaveType, string> = {
    Annual: "blue",
    Sick: "red",
    Personal: "purple",
    Maternity: "pink",
    Paternity: "cyan",
    Unpaid: "default",
  };

  function handleApprove(id: string) {
    setLeaveRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "Approved" as LeaveStatus, approvedBy: "Demo User" } : req
      )
    );
    message.success("Leave request approved");
  }

  function handleReject(id: string) {
    setLeaveRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "Rejected" as LeaveStatus, approvedBy: "Demo User" } : req
      )
    );
    message.success("Leave request rejected");
  }

  function handleApplyLeave(values: { leaveType: LeaveType; dates: [unknown, unknown]; reason: string }) {
    const newRequest: LeaveRequest = {
      id: `leave-${Date.now()}`,
      employeeId: "demo",
      employeeName: "Demo User",
      department: "HR",
      leaveType: values.leaveType,
      startDate: "2026-05-25",
      endDate: "2026-05-26",
      days: 2,
      reason: values.reason,
      status: "Pending",
      appliedOn: new Date().toISOString().split("T")[0],
      approvedBy: null,
    };
    setLeaveRequests((prev) => [newRequest, ...prev]);
    setIsModalOpen(false);
    form.resetFields();
    message.success("Leave request submitted");
  }

  const columns: ColumnsType<LeaveRequest> = [
    {
      title: "Employee",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Type",
      dataIndex: "leaveType",
      key: "leaveType",
      render: (type: LeaveType) => <Tag color={leaveTypeColors[type]}>{type}</Tag>,
      filters: [
        { text: "Annual", value: "Annual" },
        { text: "Sick", value: "Sick" },
        { text: "Personal", value: "Personal" },
        { text: "Maternity", value: "Maternity" },
        { text: "Paternity", value: "Paternity" },
        { text: "Unpaid", value: "Unpaid" },
      ],
      onFilter: (value, record) => record.leaveType === value,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: LeaveStatus) => <Tag color={statusColors[status]}>{status}</Tag>,
      filters: [
        { text: "Pending", value: "Pending" },
        { text: "Approved", value: "Approved" },
        { text: "Rejected", value: "Rejected" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Applied On",
      dataIndex: "appliedOn",
      key: "appliedOn",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) =>
        record.status === "Pending" ? (
          <Space>
            <Button
              type="primary"
              size="small"
              icon={<CheckOutlined />}
              onClick={() => handleApprove(record.id)}
            >
              Approve
            </Button>
            <Button
              danger
              size="small"
              icon={<CloseOutlined />}
              onClick={() => handleReject(record.id)}
            >
              Reject
            </Button>
          </Space>
        ) : (
          <span>-</span>
        ),
    },
  ];

  const leaveTypeOptions = [
    { label: "Annual Leave", value: "Annual" },
    { label: "Sick Leave", value: "Sick" },
    { label: "Personal Leave", value: "Personal" },
    { label: "Maternity Leave", value: "Maternity" },
    { label: "Paternity Leave", value: "Paternity" },
    { label: "Unpaid Leave", value: "Unpaid" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>
          <CalendarOutlined style={{ marginRight: 8 }} />
          Leave Management
        </Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          Apply for Leave
        </Button>
      </div>

      {/* Stats Summary */}
      <Card style={{ marginBottom: 16 }}>
        <Space size="large">
          <span>
            <Tag color="orange">Pending</Tag>
            {leaveRequests.filter((r) => r.status === "Pending").length}
          </span>
          <span>
            <Tag color="green">Approved</Tag>
            {leaveRequests.filter((r) => r.status === "Approved").length}
          </span>
          <span>
            <Tag color="red">Rejected</Tag>
            {leaveRequests.filter((r) => r.status === "Rejected").length}
          </span>
        </Space>
      </Card>

      {/* Table */}
      <Card>
        <Table
          dataSource={leaveRequests}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10, showSizeChanger: true }}
        />
      </Card>

      {/* Apply Leave Modal */}
      <Modal
        title="Apply for Leave"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleApplyLeave}>
          <Form.Item
            name="leaveType"
            label="Leave Type"
            rules={[{ required: true, message: "Please select leave type" }]}
          >
            <Select placeholder="Select leave type" options={leaveTypeOptions} />
          </Form.Item>

          <Form.Item
            name="dates"
            label="Date Range"
            rules={[{ required: true, message: "Please select dates" }]}
          >
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="reason"
            label="Reason"
            rules={[{ required: true, message: "Please provide a reason" }]}
          >
            <TextArea rows={4} placeholder="Enter reason for leave" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Submit Request
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
