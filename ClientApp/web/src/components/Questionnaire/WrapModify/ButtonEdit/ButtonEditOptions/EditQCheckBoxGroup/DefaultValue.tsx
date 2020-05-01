import React, { useContext } from 'react';
import { Select } from 'antd';
import { SelectValue } from 'antd/es/select';

import { TypeCheckBoxGroup } from '@/components/Questionnaire/questionnaire';
import { EditItem } from '@/components/Questionnaire/WrapModify/ButtonEdit/ButtonEditOptions/Common/EditItem';
import { QuestionnaireContext } from '@/contexts/questionnaire';

const { Option } = Select;

interface DefaultValueReceivedProps {
  name: TypeCheckBoxGroup['name']
}

type DefaultValueProps = DefaultValueReceivedProps

const DefaultValue = ({ name }: DefaultValueProps) => {
  const { getItem, updateItem } = useContext(QuestionnaireContext);

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
