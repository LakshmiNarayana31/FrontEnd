import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Form, message, Typography, Spin } from "antd";
import UserForm from "../../components/UserForm";
import { MOCK_EMPLOYEES } from "../../data/mockData";
import type { UserPayload } from "../../components/UsersTable/api";

const { Title } = Typography;

export default function EditEmployeePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm<UserPayload>();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Find employee in mock data
    const employee = MOCK_EMPLOYEES.find((e) => e.id === id);
    if (employee) {
      form.setFieldsValue({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
        gender: employee.gender,
        department: employee.department,
        role: employee.role,
        country: employee.country,
        isActive: employee.isActive,
      });
    }
    setInitialLoading(false);
  }, [id, form]);

  async function handleSubmit(values: UserPayload) {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Updated employee:", { id, ...values });
      message.success("Employee updated successfully");
      navigate("/employees");
    } catch (err) {
      message.error(err instanceof Error ? err.message : "Failed to update employee");
    } finally {
      setLoading(false);
    }
  }

  if (initialLoading) {
    return (
      <Card style={{ textAlign: "center", padding: 48 }}>
        <Spin size="large" />
      </Card>
    );
  }

  return (
    <Card>
      <Title level={3} style={{ marginBottom: 24 }}>Edit Employee</Title>
      <UserForm
        form={form}
        onFinish={handleSubmit}
        onCancel={() => navigate("/employees")}
        submitLabel="Update Employee"
        loading={loading}
      />
    </Card>
  );
}
