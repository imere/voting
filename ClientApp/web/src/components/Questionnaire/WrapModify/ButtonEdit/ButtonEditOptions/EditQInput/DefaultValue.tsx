import React, { useContext } from "react";
import { Input } from "antd";

import QuestionnaireContext from "@/contexts/questionnaire";
import { TypeInput } from "@/components/Questionnaire/questionnaire";

interface DefaultValueReceivedProps extends Omit<TypeInput, "typename"> {
  id?: string
}

type DefaultValueProps = DefaultValueReceivedProps

const DefaultValue = ({ name }: DefaultValueProps) => {
  const { getItem, updateItem } = useContext(QuestionnaireContext);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const item = getItem(name)!;

  function handleChange({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
    item.value = value.trim();
    updateItem(item);
  }

  return (
    <Input
      placeholder="两端空格无效"
      onChange={handleChange}
    />
  );
};

export default DefaultValue;
