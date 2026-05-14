import { Form, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";
import type { Rule } from "antd/es/form";

interface PasswordInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  rules?: Rule[];
  dependencies?: string[];
}

export default function PasswordInput({
  name,
  label = "Password",
  placeholder = "Enter your password",
  rules = [{ required: true, message: "Please enter your password" }],
  dependencies,
}: PasswordInputProps) {
  return (
    <Form.Item name={name} label={label} rules={rules} dependencies={dependencies}>
      <Input.Password
        prefix={<LockOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
        placeholder={placeholder}
        size="large"
      />
    </Form.Item>
  );
}
