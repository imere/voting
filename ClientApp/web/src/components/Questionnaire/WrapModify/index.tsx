import React from "react";
import { Form } from "antd";

import { QuestionnaireContentType } from "@/data-types";

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
        {...rest}
      />
      <ButtonDelete
        name={rest.name}
      />
    </div>
  </Form.Item>
);

export default WrapEdit;
