import { Layout as AntLayout } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const { Header, Content } = AntLayout;

export default function Layout() {
  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Header style={{ padding: "0 24px", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <Navbar />
      </Header>
      <Content style={{ padding: "24px" }}>
        <Outlet />
      </Content>
    </AntLayout>
  );
}
