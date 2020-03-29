import React from 'react';
import { Input } from 'antd';

import { TypeInput } from '@/components/Questionnaire/questionnaire';
import { QEventBus } from '@/components/Questionnaire/QEventBus';
import { EditItem } from '@/components/Questionnaire/WrapModify/ButtonEdit/ButtonEditOptions/Common/EditItem';

interface DefaultValueReceivedProps {
  ctx: QEventBus
  name: TypeInput['name']
}

type DefaultValueProps = DefaultValueReceivedProps

const DefaultValue = ({ ctx: { getItem, updateItem }, name }: DefaultValueProps) => {

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
