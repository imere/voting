import React, { useContext } from 'react';
import { Select } from 'antd';
import { SelectValue } from 'antd/es/select';

import { TypeCheckBoxGroup } from '@/components/Questionnaire/questionnaire';
import { EditItem } from '@/components/Questionnaire/WrapModify/ButtonEdit/ButtonEditOptions/Common/EditItem';
import { QuestionnaireContext } from '@/contexts/questionnaire';

interface OptionsReceivedProps {
  name: TypeCheckBoxGroup['name']
}

type OptionsProps = OptionsReceivedProps

const Options = ({ name }: OptionsProps) => {
  const { getItem, updateItem } = useContext(QuestionnaireContext);

  const item = getItem(name) as TypeCheckBoxGroup;

  function handleOptionsChange(value: SelectValue) {
    if (Array.isArray(value)) {
      value = (value as string[]).map((v) => v.trim()).filter((v) => v);
      item.options = value as string[];
      updateItem(item);
    }
  }

  return (
    <EditItem label="选项">
      <Select
        mode="tags"
        defaultValue={item.options as string[]}
        onChange={handleOptionsChange}
      />
    </EditItem>
  );
};

export default Options;
