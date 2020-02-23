import React, { useContext } from "react";
import { Select } from "antd";
import { SelectValue } from "antd/es/select";

import QuestionnaireContext from "@/contexts/questionnaire";
import { TypeCheckBoxGroup } from "@/data-types";

interface OptionsReceivedProps extends Omit<TypeCheckBoxGroup, "typename"> {
  id?: string
}

type OptionsProps = OptionsReceivedProps

const Options = ({ name }: OptionsProps) => {
  const { getItem, updateItem } = useContext(QuestionnaireContext);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const item = getItem(name)! as TypeCheckBoxGroup;

  function handleOptionsChange(value: SelectValue) {
    if (Array.isArray(value)) {
      value = (value as string[]).map((v) => v.trim()).filter((v) => v);
      item.options = value as string[];
      updateItem(item);
    }
  }

  return (
    <Select
      mode="tags"
      defaultValue={item.options as string[]}
      onChange={handleOptionsChange}
    />
  );
};

export default Options;
