import React, { useContext, useEffect, useState } from 'react';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio';

import { QuestionnaireContext } from '@/contexts/questionnaire';
import { QuestionnaireContentType } from '@/components/Questionnaire/questionnaire';
import { ButtonEditContentMap, QItemDataFactory, QItemDefaultData } from '@/components/Questionnaire/util';
import { isRequired } from '@/components/Questionnaire/data-util';

import { options } from './options';

interface ButtonEditOptionsReceivedProps {
  name: string
}

type ButtonEditOptionsProps = ButtonEditOptionsReceivedProps

const ButtonEditOptions = ({ name }: ButtonEditOptionsProps) => {
  const [, refreshModify] = useState(false);

  const ctx = useContext(QuestionnaireContext);

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
      // QItemDataFactory[typename](
      //   {
      //     ...prop,
      //     label: item.label,
      //     name,
      //     rules: isRequired(item.rules) ? ___ : [],
      //   } as any
      // )
    );
  }

  useEffect(() => {
    ctx.addRefresher(refreshModify);
    return () => ctx.removeRefresher(refreshModify);
  }, []);

  return (
    <>
      {React.createElement(ButtonEditContentMap[item.typename], { ctx, name })}
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
