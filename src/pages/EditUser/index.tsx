import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Card, Form, message, Skeleton, Typography } from "antd";
import { fetchUserById, updateUser, type UserPayload } from "../../components/UsersTable/api";
import UserForm from "../../components/UserForm";

const { Title } = Typography;

export default function EditUserPage() {
  // The param is URL-encoded because the raw id may contain slashes
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm<UserPayload>();
  const [loadError, setLoadError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    async function loadUser() {
      try {
        const user = await fetchUserById(id!, controller.signal);
        if (controller.signal.aborted) return;

        form.setFieldsValue({
          firstName:   user.firstName,
          lastName:    user.lastName,
          email:       user.email,
          phoneNumber: user.phoneNumber,
          gender:      user.gender,
          department:  user.department,
          role:        user.role,
          country:     user.country,
          isActive:    user.isActive,
        });
      } catch (err: unknown) {
        if (controller.signal.aborted) return;
        setLoadError(err instanceof Error ? err.message : "Failed to load user");
      } finally {
        if (!controller.signal.aborted) setFetching(false);
      }
    }

    void loadUser();
    return () => controller.abort();
  }, [id, form]);

  async function handleSubmit(values: UserPayload) {
    if (!id) return;
    setSaving(true);
    try {
      await updateUser(id, values);
      message.success("User updated successfully");
      navigate("/users");
    } catch (err) {
      message.error(err instanceof Error ? err.message : "Failed to update user");
    } finally {
      setSaving(false);
    }
  }

  if (fetching) return <Skeleton active />;

  if (loadError) return <Alert type="error" message={loadError} showIcon />;

  return (
    <Card>
      <Title level={3} style={{ marginBottom: 24 }}>Edit User</Title>
      <UserForm
        form={form}
        onFinish={handleSubmit}
        onCancel={() => navigate("/users")}
        submitLabel="Save Changes"
        loading={saving}
      />
    </Card>
  );
}

