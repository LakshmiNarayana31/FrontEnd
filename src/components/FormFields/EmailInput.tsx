import { Form, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";

interface EmailInputProps {
  name?: string;
  label?: string;
  placeholder?: string;
}

export default function EmailInput({
  name = "email",
  label = "Email",
  placeholder = "Enter your email",
}: EmailInputProps) {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        { required: true, message: "Please enter your email" },
        { type: "email", message: "Please enter a valid email" },
      ]}
    >
      <Input
        prefix={<MailOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
        placeholder={placeholder}
        size="large"
      />
    </Form.Item>
  );
}
