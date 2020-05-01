import React, { useContext } from 'react';
import { Input } from 'antd';

import { TypeInput } from '@/components/Questionnaire/questionnaire';
import { EditItem } from '@/components/Questionnaire/WrapModify/ButtonEdit/ButtonEditOptions/Common/EditItem';
import { QuestionnaireContext } from '@/contexts/questionnaire';

interface DefaultValueReceivedProps {
  name: TypeInput['name']
}

type DefaultValueProps = DefaultValueReceivedProps

const DefaultValue = ({ name }: DefaultValueProps) => {
  const { getItem, updateItem } = useContext(QuestionnaireContext);

  const item = getItem(name) as TypeInput;

  function handleChange({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
    item.value = value.trim();
    updateItem(item);
  }

  return (
    <EditItem label="默认值">
      <Input
        defaultValue={item.value}
        placeholder="两端空格无效"
        onChange={handleChange}
      />
    </EditItem>
  );
};

export default DefaultValue;
