import React from 'react';
import { InputNumber } from 'antd';

import { TypeInput, TypeNumber } from '@/components/Questionnaire/questionnaire';
import { QEventBus } from '@/components/Questionnaire/QEventBus';
import { EditItem } from '@/components/Questionnaire/WrapModify/ButtonEdit/ButtonEditOptions/Common/EditItem';

interface DefaultValueReceivedProps {
  ctx: QEventBus
  name: TypeInput['name']
}

type DefaultValueProps = DefaultValueReceivedProps

const DefaultValue = ({ ctx: { getItem, updateItem }, name }: DefaultValueProps) => {

  const item = getItem(name) as TypeNumber;

  function handleChange(value?: number) {
    item.value = value;
    updateItem(item);
  }

  return (
    <EditItem label="默认值">
      <InputNumber
        onChange={handleChange}
      />
    </EditItem>
  );
};

export default DefaultValue;
