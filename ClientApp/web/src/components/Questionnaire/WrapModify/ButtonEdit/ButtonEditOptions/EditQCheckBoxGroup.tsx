import React from "react";
import { Checkbox } from "antd";

import { QuestionnaireContentType } from "@/data-types";

type EditQCheckBoxGroupProps = QuestionnaireContentType

const EditQCheckBoxGroup: React.FC<EditQCheckBoxGroupProps> = () => (
  <Checkbox>req</Checkbox>
);

export default EditQCheckBoxGroup;
