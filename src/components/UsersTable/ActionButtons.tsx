import { Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface ActionButtonsProps {
  id: string;
}

export default function ActionButtons({ id }: ActionButtonsProps) {
  const navigate = useNavigate();
  return (
    <Space>
      <Button
        type="link"
        icon={<EditOutlined />}
        onClick={() => navigate(`/users/edit/${encodeURIComponent(id)}`)}
      >
        Edit
      </Button>
      <Button
        type="link"
        danger
        icon={<DeleteOutlined />}
        onClick={() => navigate(`/users/delete/${encodeURIComponent(id)}`)}
      >
        Delete
      </Button>
    </Space>
  );
}
