import React, { useContext } from 'react';
import { InputNumber } from 'antd';

import { TypeInput, TypeNumber } from '@/components/Questionnaire/questionnaire';
import { EditItem } from '@/components/Questionnaire/WrapModify/ButtonEdit/ButtonEditOptions/Common/EditItem';
import { QuestionnaireContext } from '@/contexts/questionnaire';

interface DefaultValueReceivedProps {
  name: TypeInput['name']
}

type DefaultValueProps = DefaultValueReceivedProps

const DefaultValue = ({ name }: DefaultValueProps) => {
  const { getItem, updateItem } = useContext(QuestionnaireContext);

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
