import React from "react";
import { Layout } from "antd";
import "./index.scss";
const { Content } = Layout;

const AppLayout = props => {
  return (
    <Layout className="main-layout">
      <Layout>
        <Content>{props.children}</Content>
        
      </Layout>
    </Layout>
  );
};
export default AppLayout;
