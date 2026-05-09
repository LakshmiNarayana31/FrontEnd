import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  Descriptions,
  message,
  Modal,
  Skeleton,
  Tag,
  Typography,
} from "antd";
import { DeleteOutlined, WarningOutlined } from "@ant-design/icons";
import { deleteUser, fetchUserById } from "../../components/UsersTable/api";
import type { User } from "../../components/UsersTable/types";

const { Title, Paragraph } = Typography;

export default function DeleteUserPage() {
  // The param is URL-encoded because the raw id may contain slashes
  const { id: encodedId } = useParams<{ id: string }>();
  const id = encodedId ? decodeURIComponent(encodedId) : undefined;

  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [fetching, setFetching] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    async function loadUser() {
      try {
        const data = await fetchUserById(id!, controller.signal);
        if (controller.signal.aborted) return;
        setUser(data);
      } catch (err: unknown) {
        if (controller.signal.aborted) return;
        setLoadError(err instanceof Error ? err.message : "Failed to load user");
      } finally {
        if (!controller.signal.aborted) setFetching(false);
      }
    }

    void loadUser();
    return () => controller.abort();
  }, [id]);

  async function handleDelete() {
    if (!id) return;
    await deleteUser(id);
    message.success("User deleted successfully");
    navigate("/users");
  }

  function confirmDelete() {
    Modal.confirm({
      title: "Delete User",
      icon: <WarningOutlined style={{ color: "#ff4d4f" }} />,
      content: `Are you sure you want to permanently delete "${user?.firstName} ${user?.lastName}"? This action cannot be undone.`,
      okText: "Delete",
      okButtonProps: { danger: true },
      cancelText: "Cancel",
      onOk: () =>
        handleDelete().catch((err: unknown) => {
          message.error(err instanceof Error ? err.message : "Failed to delete user");
          throw err; // keep the modal open on failure
        }),
    });
  }


  if (fetching) return <Skeleton active />;

  if (loadError) return <Alert type="error" message={loadError} showIcon />;

  if (!user) return null;

  return (
    <Card>
      <Title level={3} style={{ color: "#ff4d4f", marginBottom: 8 }}>
        <DeleteOutlined style={{ marginRight: 8 }} />
        Delete User
      </Title>
      <Paragraph type="secondary" style={{ marginBottom: 24 }}>
        Review the user details below before permanently deleting this account.
      </Paragraph>

      <Descriptions bordered column={{ xs: 1, sm: 2, md: 3 }} style={{ marginBottom: 32 }}>
        <Descriptions.Item label="First Name">{user.firstName}</Descriptions.Item>
        <Descriptions.Item label="Last Name">{user.lastName}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{user.phoneNumber}</Descriptions.Item>
        <Descriptions.Item label="Gender">{user.gender}</Descriptions.Item>
        <Descriptions.Item label="Department">{user.department}</Descriptions.Item>
        <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
        <Descriptions.Item label="Country">{user.country}</Descriptions.Item>
        <Descriptions.Item label="Status">
          {user.isActive ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>}
        </Descriptions.Item>
      </Descriptions>

      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <Button onClick={() => navigate("/users")}>Cancel</Button>
        <Button danger type="primary" icon={<DeleteOutlined />} onClick={confirmDelete}>
          Delete User
        </Button>
      </div>
    </Card>
  );
}
