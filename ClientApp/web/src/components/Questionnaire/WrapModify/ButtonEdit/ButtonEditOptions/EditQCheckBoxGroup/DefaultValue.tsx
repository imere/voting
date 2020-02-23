import React, { useContext } from "react";
import { Select } from "antd";
import { SelectValue } from "antd/es/select";

import QuestionnaireContext from "@/contexts/questionnaire";
import { TypeCheckBoxGroup } from "@/data-types";

const { Option } = Select;

interface DefaultValueReceivedProps extends Omit<TypeCheckBoxGroup, "typename"> {
  id?: string
}

type DefaultValueProps = DefaultValueReceivedProps

const DefaultValue = ({ name }: DefaultValueProps) => {
  const { getItem, updateItem } = useContext(QuestionnaireContext);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const item = getItem(name)! as TypeCheckBoxGroup;

  function handleChange(value: SelectValue) {
    if (Array.isArray(value)) {
      value = (value as string[]).map((v) => v.trim()).filter((v) => v);
      item.value = value as string[];
      updateItem(item);
    }
  }

  return (
    <Select
      mode="multiple"
      onChange={handleChange}
    >
      {
        (item.options).map((v, i) => (
          <Option
            key={i + Math.random().toString(16)}
            value={v as string}
          >
            {v}
          </Option>
        ))
      }
    </Select>
  );
};

export default DefaultValue;
