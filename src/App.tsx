import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import { AuthProvider } from "./context/AuthContext";
import router from "./router";

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#667eea",
          borderRadius: 6,
        },
      }}
    >
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ConfigProvider>
  );
}
