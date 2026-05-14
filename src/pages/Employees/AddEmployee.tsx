import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, message, Typography } from "antd";
import UserForm from "../../components/UserForm";
import type { UserPayload } from "../../components/UsersTable/api";

const { Title } = Typography;

export default function AddEmployeePage() {
  const navigate = useNavigate();
  const [form] = Form.useForm<UserPayload>();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values: UserPayload) {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("New employee:", values);
      message.success("Employee added successfully");
      navigate("/employees");
    } catch (err) {
      message.error(err instanceof Error ? err.message : "Failed to add employee");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <Title level={3} style={{ marginBottom: 24 }}>Add New Employee</Title>
      <UserForm
        form={form}
        initialValues={{ isActive: true }}
        onFinish={handleSubmit}
        onCancel={() => navigate("/employees")}
        submitLabel="Add Employee"
        loading={loading}
      />
    </Card>
  );
}
