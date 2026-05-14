import { useState } from "react";
import { Card, Col, Row, Typography, Form, Input, Button, Switch, Select, Divider, message, Tabs } from "antd";
import {
  SettingOutlined,
  UserOutlined,
  BellOutlined,
  LockOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";

const { Title, Text } = Typography;

export default function SettingsPage() {
  const { user } = useAuth();
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  async function handleProfileUpdate(values: Record<string, unknown>) {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Profile updated:", values);
    message.success("Profile updated successfully");
    setLoading(false);
  }

  async function handlePasswordChange(values: Record<string, unknown>) {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Password changed:", values);
    message.success("Password changed successfully");
    passwordForm.resetFields();
    setLoading(false);
  }

  const tabItems = [
    {
      key: "profile",
      label: (
        <span>
          <UserOutlined /> Profile
        </span>
      ),
      children: (
        <Form
          form={profileForm}
          layout="vertical"
          onFinish={handleProfileUpdate}
          initialValues={{
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            phone: "+1 555-0100",
          }}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
                <Input placeholder="First name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
                <Input placeholder="Last name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="phone" label="Phone">
                <Input placeholder="Phone number" />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Profile
          </Button>
        </Form>
      ),
    },
    {
      key: "security",
      label: (
        <span>
          <LockOutlined /> Security
        </span>
      ),
      children: (
        <div>
          <Title level={5}>Change Password</Title>
          <Form form={passwordForm} layout="vertical" onFinish={handlePasswordChange} style={{ maxWidth: 400 }}>
            <Form.Item
              name="currentPassword"
              label="Current Password"
              rules={[{ required: true, message: "Enter current password" }]}
            >
              <Input.Password placeholder="Current password" />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[
                { required: true, message: "Enter new password" },
                { min: 8, message: "Password must be at least 8 characters" },
              ]}
            >
              <Input.Password placeholder="New password" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm New Password"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Confirm your new password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm new password" />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Change Password
            </Button>
          </Form>

          <Divider />

          <Title level={5}>Two-Factor Authentication</Title>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <Text>Enable two-factor authentication for added security</Text>
              <br />
              <Text type="secondary">Receive a code via email when signing in</Text>
            </div>
            <Switch />
          </div>
        </div>
      ),
    },
    {
      key: "notifications",
      label: (
        <span>
          <BellOutlined /> Notifications
        </span>
      ),
      children: (
        <div>
          <Title level={5}>Email Notifications</Title>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Text>Leave Request Updates</Text>
                <br />
                <Text type="secondary">Get notified when your leave request is approved or rejected</Text>
              </div>
              <Switch defaultChecked />
            </div>
            <Divider style={{ margin: "8px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Text>Attendance Reminders</Text>
                <br />
                <Text type="secondary">Daily reminder to mark your attendance</Text>
              </div>
              <Switch defaultChecked />
            </div>
            <Divider style={{ margin: "8px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Text>Team Updates</Text>
                <br />
                <Text type="secondary">Get notified about team activities and announcements</Text>
              </div>
              <Switch />
            </div>
            <Divider style={{ margin: "8px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Text>Weekly Summary</Text>
                <br />
                <Text type="secondary">Receive a weekly summary of your activities</Text>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "preferences",
      label: (
        <span>
          <GlobalOutlined /> Preferences
        </span>
      ),
      children: (
        <div>
          <Title level={5}>Application Preferences</Title>
          <Form layout="vertical" style={{ maxWidth: 400 }}>
            <Form.Item label="Language">
              <Select
                defaultValue="en"
                options={[
                  { label: "English", value: "en" },
                  { label: "Spanish", value: "es" },
                  { label: "French", value: "fr" },
                  { label: "German", value: "de" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Timezone">
              <Select
                defaultValue="utc-5"
                options={[
                  { label: "UTC-5 (Eastern Time)", value: "utc-5" },
                  { label: "UTC-8 (Pacific Time)", value: "utc-8" },
                  { label: "UTC+0 (GMT)", value: "utc+0" },
                  { label: "UTC+5:30 (IST)", value: "utc+5:30" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Date Format">
              <Select
                defaultValue="mm/dd/yyyy"
                options={[
                  { label: "MM/DD/YYYY", value: "mm/dd/yyyy" },
                  { label: "DD/MM/YYYY", value: "dd/mm/yyyy" },
                  { label: "YYYY-MM-DD", value: "yyyy-mm-dd" },
                ]}
              />
            </Form.Item>
            <Button type="primary">Save Preferences</Button>
          </Form>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Title level={3} style={{ marginBottom: 24 }}>
        <SettingOutlined style={{ marginRight: 8 }} />
        Settings
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card>
            <Tabs items={tabItems} tabPosition="left" style={{ minHeight: 400 }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
