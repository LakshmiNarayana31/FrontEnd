import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, message, Row, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import AuthFormWrapper from "../../components/AuthFormWrapper";
import { EmailInput, PasswordInput } from "../../components/FormFields";
import type { RegisterFormValues } from "../Login/types";

const { Text } = Typography;

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm<RegisterFormValues>();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values: RegisterFormValues) {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      console.log("Register values:", values);

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      message.error(
        err instanceof Error ? err.message : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthFormWrapper
      title="Create Account"
      subtitle="Sign up to get started"
      footer={
        <Text>
          Already have an account? <Link to="/login">Sign in here</Link>
        </Text>
      }
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={12}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: "Please enter your first name" }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
                placeholder="First name"
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: "Please enter your last name" }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
                placeholder="Last name"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        <EmailInput />

        <PasswordInput
          name="password"
          rules={[
            { required: true, message: "Please enter your password" },
            { min: 8, message: "Password must be at least 8 characters" },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
              message: "Password must contain uppercase, lowercase, and a number",
            },
          ]}
        />

        <PasswordInput
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        />

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            block
          >
            Create Account
          </Button>
        </Form.Item>
      </Form>
    </AuthFormWrapper>
  );
}
