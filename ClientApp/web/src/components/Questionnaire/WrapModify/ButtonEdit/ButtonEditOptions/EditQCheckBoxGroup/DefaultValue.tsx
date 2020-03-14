import React from "react";
import { Select } from "antd";
import { SelectValue } from "antd/es/select";

import { TypeCheckBoxGroup } from "@/components/Questionnaire/questionnaire";
import { QEventBus } from "@/components/Questionnaire/QEventBus";
import { EditItem } from "@/components/Questionnaire/WrapModify/ButtonEdit/ButtonEditOptions/Common/EditItem";

const { Option } = Select;

interface DefaultValueReceivedProps {
  ctx: QEventBus
  name: TypeCheckBoxGroup["name"]
}

type DefaultValueProps = DefaultValueReceivedProps

const DefaultValue = ({ ctx: { getItem, updateItem }, name }: DefaultValueProps) => {

  const item = getItem(name) as TypeCheckBoxGroup;

  function handleChange(value: SelectValue) {
    if (Array.isArray(value)) {
      value = (value as string[]).map((v) => v.trim()).filter((v) => v);
      item.value = value as string[];
      updateItem(item);
    }
  }

  return (
    <EditItem label="默认值">
      <Select
        mode="multiple"
        defaultValue={item.value}
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
    </EditItem>
  );
};

export default DefaultValue;
