import React from "react";
import { Card } from "antd";
import "./index.scss";
const ContainerLayout = ({ children }) => {
  return <div className="main-container">{children}</div>;
};

export default ContainerLayout;
