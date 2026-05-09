import { Button, Col, Form, Input, Row, Select, Switch, type FormInstance } from "antd";
import type { UserPayload } from "../UsersTable/api";
import {
  COUNTRY_OPTIONS,
  DEPARTMENT_OPTIONS,
  GENDER_OPTIONS,
  ROLE_OPTIONS,
} from "../../constants/userOptions";

interface UserFormProps {
  form: FormInstance<UserPayload>;
  initialValues?: Partial<UserPayload>;
  onFinish: (values: UserPayload) => void;
  onCancel: () => void;
  submitLabel: string;
  loading: boolean;
}

export default function UserForm({
  form,
  initialValues,
  onFinish,
  onCancel,
  submitLabel,
  loading,
}: UserFormProps) {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
    >
      <Row gutter={[16, 0]}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "Required" }]}>
            <Input placeholder="First name" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: "Required" }]}>
            <Input placeholder="Last name" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Required" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="Email address" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true, message: "Required" }]}>
            <Input placeholder="Phone number" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item label="Gender" name="gender" rules={[{ required: true, message: "Required" }]}>
            <Select placeholder="Select gender" options={[...GENDER_OPTIONS]} />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item label="Department" name="department" rules={[{ required: true, message: "Required" }]}>
            <Select placeholder="Select department" options={[...DEPARTMENT_OPTIONS]} />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item label="Role" name="role" rules={[{ required: true, message: "Required" }]}>
            <Select placeholder="Select role" options={[...ROLE_OPTIONS]} />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item label="Country" name="country" rules={[{ required: true, message: "Required" }]}>
            <Select placeholder="Select country" options={[...COUNTRY_OPTIONS]} />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item label="Active" name="isActive" valuePropName="checked">
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="end">
        <Col>
          <Button style={{ marginRight: 8 }} onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {submitLabel}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
