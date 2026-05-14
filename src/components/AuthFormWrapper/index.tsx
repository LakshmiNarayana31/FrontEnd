import { Card, Typography } from "antd";
import type { ReactNode } from "react";

const { Title, Text } = Typography;

interface AuthFormWrapperProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function AuthFormWrapper({
  title,
  subtitle,
  children,
  footer,
}: AuthFormWrapperProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: 24,
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 420,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          borderRadius: 12,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={2} style={{ margin: 0 }}>
            {title}
          </Title>
          {subtitle && (
            <Text type="secondary" style={{ fontSize: 14 }}>
              {subtitle}
            </Text>
          )}
        </div>
        {children}
        {footer && (
          <div style={{ textAlign: "center", marginTop: 16 }}>{footer}</div>
        )}
      </Card>
    </div>
  );
}
