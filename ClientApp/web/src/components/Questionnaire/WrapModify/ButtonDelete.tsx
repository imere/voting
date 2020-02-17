import React, { useContext } from "react";
import { MinusCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import QuestionnaireContext from "@/contexts/questionnaire";

interface ButtonDeleteReceivedProps {
  name: string
}

type ButtonDeleteProps = ButtonDeleteReceivedProps

const ButtonDelete = ({ name }: ButtonDeleteProps) => {
  const { removeItem } = useContext(QuestionnaireContext);

  return (
    <Tooltip title="删除">
      <MinusCircleOutlined
        style={{ margin: "8px 8px 0" }}
        onClick={() => removeItem(name)}
      />
    </Tooltip>
  );
};

export default ButtonDelete;
