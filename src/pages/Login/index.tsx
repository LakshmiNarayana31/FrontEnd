import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, message, Typography } from "antd";
import AuthFormWrapper from "../../components/AuthFormWrapper";
import { EmailInput, PasswordInput } from "../../components/FormFields";
import type { LoginFormValues } from "./types";

const { Text } = Typography;

export default function LoginPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm<LoginFormValues>();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values: LoginFormValues) {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      console.log("Login values:", values);
      
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      message.success("Login successful!");
      navigate("/users");
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
      title="Welcome Back"
      subtitle="Sign in to continue to your account"
      footer={
        <Text>
          Don't have an account? <Link to="/register">Register here</Link>
        </Text>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ remember: true }}
      >
        <EmailInput />
        
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
