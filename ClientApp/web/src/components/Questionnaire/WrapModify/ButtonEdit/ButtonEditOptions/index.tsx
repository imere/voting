import React, { useState } from 'react';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio';

import { QuestionnaireContentType } from '@/components/Questionnaire/questionnaire';
import { ButtonEditContentMap, QItemDataFactory, QItemDefaultData } from '@/components/Questionnaire/util';
import { isRequired } from '@/components/Questionnaire/data-util';
import { useQContext } from '@/hooks/useQContext';

import { options } from './options';

interface ButtonEditOptionsReceivedProps {
  name: string
}

type ButtonEditOptionsProps = ButtonEditOptionsReceivedProps

const ButtonEditOptions = ({ name }: ButtonEditOptionsProps) => {
  const [, refreshModify] = useState(false);

  const ctx = useQContext({
    refreshers: [refreshModify]
  }, []);

  const item = ctx.getItem(name) as QuestionnaireContentType;

  function handleClick({ target: { value } }: RadioChangeEvent) {
    const typename = value as QuestionnaireContentType['typename'];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { label: _, name: __, rules: ___, ...prop } = QItemDefaultData[typename]();
    ctx.updateItem(
      QItemDataFactory({
        ...prop,
        typename,
        label: item.label,
        name,
        rules: isRequired(item.rules) ? ___ : [],
      }) as any
    );
  }

  return (
    <>
      {React.createElement(ButtonEditContentMap[item.typename], { name })}
      <Radio.Group
        defaultValue={item.typename}
        onChange={handleClick}
      >
        {
          options.map((option, i) => (
            <Radio.Button key={i} value={option.value}>
              {option.label}
            </Radio.Button>
          ))
        }
      </Radio.Group>
    </>
  );
};

export default ButtonEditOptions;
