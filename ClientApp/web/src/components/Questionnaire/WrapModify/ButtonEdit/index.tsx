import React from "react";
import { EditOutlined } from "@ant-design/icons";
import { Popover, Tooltip } from "antd";

import ButtonEditOptions from "./ButtonEditOptions";

interface ButtonEditReceivedProps {
  name: string
}

type ButtonEditProps = ButtonEditReceivedProps

const ButtonEdit = ({ name }: ButtonEditProps) => (
  <Popover
    content={<ButtonEditOptions name={name} />}
    trigger="click"
    placement="right"
  >
    <Tooltip title="编辑">
      <EditOutlined
        style={{ margin: "8px 8px 0" }}
      />
    </Tooltip>
  </Popover>
);

export default ButtonEdit;
