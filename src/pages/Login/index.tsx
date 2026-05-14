import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, message, Typography, Alert } from "antd";
import { UserOutlined } from "@ant-design/icons";
import AuthFormWrapper from "../../components/AuthFormWrapper";
import { PasswordInput } from "../../components/FormFields";
import { useAuth } from "../../context/AuthContext";
import type { LoginFormValues } from "./types";

const { Text } = Typography;

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form] = Form.useForm<LoginFormValues>();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values: LoginFormValues) {
    setLoading(true);
    try {
      const success = await login(values.email, values.password);
      
      if (success) {
        message.success("Login successful!");
        navigate("/dashboard");
      } else {
        message.error("Invalid credentials. Use: demo / demo");
      }
    } catch (err) {
      message.error(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthFormWrapper
      title="WorkForce Hub"
      subtitle="Employee Management System"
      footer={
        <Text>
          Don't have an account? <Link to="/register">Register here</Link>
        </Text>
      }
    >
      <Alert
        message="Demo Credentials"
        description="Username: demo | Password: demo"
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />
      
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="email"
          label="Username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
            placeholder="Enter username"
            size="large"
          />
        </Form.Item>
        
        <PasswordInput name="password" />

        <Form.Item>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            block
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </AuthFormWrapper>
  );
}
