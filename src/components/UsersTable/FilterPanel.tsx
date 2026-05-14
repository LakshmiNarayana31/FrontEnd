import { useState } from "react";
import { Button, Card, Col, Form, Input, Row, Select, Space } from "antd";
import { FilterOutlined, CloseOutlined } from "@ant-design/icons";
import type { UserFilters } from "./types";
import {
  COUNTRY_OPTIONS,
  DEPARTMENT_OPTIONS,
  GENDER_OPTIONS,
  ROLE_OPTIONS,
  STATUS_OPTIONS,
} from "../../constants/userOptions";

interface Props {
  onApply: (filters: UserFilters) => void;
  onReset: () => void;
}

// ─── Filter options ───────────────────────────────────────────────────────────
// Imported from src/constants/userOptions.ts

// ─── Component ────────────────────────────────────────────────────────────────

export default function FilterPanel({ onApply, onReset }: Props) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<UserFilters>();

  function handleApply() {
    const values = form.getFieldsValue();
    // Strip empty/undefined values before sending to parent
    const clean = Object.fromEntries(
      Object.entries(values).filter(
        ([, v]) =>
          v !== undefined &&
          v !== "" &&
          !(Array.isArray(v) && v.length === 0)
      )
    ) as UserFilters;
    onApply(clean);
  }

  function handleReset() {
    form.resetFields();
    onReset();
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <Button
        icon={open ? <CloseOutlined /> : <FilterOutlined />}
        type={open ? "default" : "primary"}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? "Close Filters" : "Filters"}
      </Button>

      {open && (
        <Card style={{ marginTop: 12 }} size="small">
          <Form form={form} layout="vertical">
            <Row gutter={[16, 0]}>

              {/* ── Text inputs ─────────────────────────────── */}
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label="First Name" name="firstName">
                  <Input placeholder="Search first name" allowClear />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label="Last Name" name="lastName">
                  <Input placeholder="Search last name" allowClear />
                </Form.Item>
              </Col>

              {/* ── Dropdown selects ────────────────────────── */}
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label="Gender" name="gender">
                  <Select
                    mode="multiple"
                    placeholder="Select gender"
                    options={[...GENDER_OPTIONS]}
                    allowClear
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label="Status" name="status">
                  <Select
                    mode="multiple"
                    placeholder="Select status"
                    options={[...STATUS_OPTIONS]}
                    allowClear
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label="Department" name="department">
                  <Select
                    mode="multiple"
                    placeholder="Select department"
                    options={[...DEPARTMENT_OPTIONS]}
                    allowClear
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label="Role" name="role">
                  <Select
                    mode="multiple"
                    placeholder="Select role"
                    options={[...ROLE_OPTIONS]}
                    allowClear
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label="Country" name="country">
                  <Select
                    mode="multiple"
                    placeholder="Select country"
                    options={[...COUNTRY_OPTIONS]}
                    allowClear
                  />
                </Form.Item>
              </Col>

            </Row>

            {/* ── Action buttons ──────────────────────────── */}
            <Row justify="end">
              <Space>
                <Button onClick={handleReset}>Reset All</Button>
                <Button type="primary" onClick={handleApply}>
                  Apply Filters
                </Button>
              </Space>
            </Row>
          </Form>
        </Card>
      )}
    </div>
  );
}
