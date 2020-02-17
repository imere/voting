import React, { useContext } from "react";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";

import QuestionnaireContext from "@/contexts/questionnaire";
import { TypeInput } from "@/data-types";
import { isRequired, toggleRequired } from "@/components/Questionnaire/utils";

interface EditQInputReceivedProps extends Omit<TypeInput, "typename"> {}

type EditQInputProps = EditQInputReceivedProps

const EditQInput: React.FC<EditQInputProps> = ({ name, rules }: EditQInputProps) => {
  const { getItem, forceRender } = useContext(QuestionnaireContext);
  const required = isRequired(rules);

  function handleRequireChange(ev: CheckboxChangeEvent) {
    const item = getItem(name);
    if (!item) {
      return;
    }
    if (ev.target.checked !== isRequired(item.rules)) {
      toggleRequired(item.rules);
      console.log(ev.target, name);
      forceRender();
    }
  }

  return (
    <Checkbox
      defaultChecked={required}
      onChange={handleRequireChange}
    >
    req
    </Checkbox>
  );
};
export default EditQInput;
