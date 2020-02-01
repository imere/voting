import "./Fallback.scss";

import React from "react";
import { Spin } from "antd";

const Fallback: React.FC = () =>
  <div className="fallback">
    <Spin />
  </div>;

export default Fallback;
