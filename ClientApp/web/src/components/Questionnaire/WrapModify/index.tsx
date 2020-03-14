import React from "react";
import { Form } from "antd";

import { QuestionnaireContentType } from "@/components/Questionnaire/questionnaire";

import ButtonDelete from "./ButtonDelete";
import ButtonEdit from "./ButtonEdit";
import styles from "./WrapModify.module.scss";

interface WrapEditReceivedProps {
  children: React.FC<any> | React.ComponentClass
}

type WrapEditProps =
  WrapEditReceivedProps &
  QuestionnaireContentType

const WrapEdit: React.FC<WrapEditProps> = ({ children, ...rest }: WrapEditProps) => (
  <Form.Item>
    {React.createElement(children, rest)}
    <div className={styles.modify}>
      <ButtonEdit
        name={rest.name}
      />
      <ButtonDelete
        name={rest.name}
      />
    </div>
  </Form.Item>
);

export default WrapEdit;
