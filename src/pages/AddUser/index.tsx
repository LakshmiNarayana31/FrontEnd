import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, message, Typography } from "antd";
import { createUser, type UserPayload } from "../../components/UsersTable/api";
import UserForm from "../../components/UserForm";

const { Title } = Typography;

export default function AddUserPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm<UserPayload>();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values: UserPayload) {
    setLoading(true);
    try {
      await createUser(values);
      message.success("User created successfully");
      navigate("/users");
    } catch (err) {
      message.error(err instanceof Error ? err.message : "Failed to create user");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <Title level={3} style={{ marginBottom: 24 }}>Add User</Title>
      <UserForm
        form={form}
        initialValues={{ isActive: true }}
        onFinish={handleSubmit}
        onCancel={() => navigate("/users")}
        submitLabel="Create User"
        loading={loading}
      />
    </Card>
  );
}

