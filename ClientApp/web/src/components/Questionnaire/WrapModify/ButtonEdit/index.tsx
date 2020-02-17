import React from "react";
import { EditOutlined } from "@ant-design/icons";
import { Popover, Tooltip } from "antd";

import { QuestionnaireContentType } from "@/data-types";

import ButtonEditContent from "./ButtonEditContent";

type ButtonEditProps = QuestionnaireContentType

const ButtonEdit = (props: ButtonEditProps) => (
  <Popover
    content={<ButtonEditContent {...props} />}
    trigger="click"
    placement="left"
  >
    <Tooltip title="编辑">
      <EditOutlined
        style={{ margin: "8px 8px 0" }}
      />
    </Tooltip>
  </Popover>
);

export default ButtonEdit;
