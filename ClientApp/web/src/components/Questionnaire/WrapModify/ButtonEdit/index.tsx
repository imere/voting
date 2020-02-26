import React from "react";
import { EditOutlined } from "@ant-design/icons";
import { Popover, Tooltip } from "antd";

import { QuestionnaireContentType } from "@/components/Questionnaire/questionnaire";

import ButtonEditOptions from "./ButtonEditOptions";

type ButtonEditProps = QuestionnaireContentType

const ButtonEdit = (props: ButtonEditProps) => (
  <Popover
    content={<ButtonEditOptions {...props} />}
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
