import React from 'react';
import { Input, InputNumber } from 'antd';

import { QuestionnaireContentType } from '@/components/Questionnaire/questionnaire';
import { getLengthObject, setRulesLengthMessage } from '@/components/Questionnaire/data-util';
import { QEventBus } from '@/components/Questionnaire/QEventBus';

import { EditItem } from './EditItem';

type LengthRangeReceivedProps = {
  negative?: boolean
  ctx: QEventBus
  name: string
  lengthName: string
}

type LengthRangeProps = LengthRangeReceivedProps

const LengthRange = ({ negative, ctx: { getItem, updateItem }, name, lengthName }: LengthRangeProps) => {

  const item = getItem(name) as QuestionnaireContentType;

  function handleLengthChange(num: number | undefined, minmax: 'min' | 'max') {
    if (typeof num === 'undefined') {
      return;
    }

    let length = getLengthObject(item.rules);
    if (!length) {
      item.rules.push(length = {});
    }
    if (minmax === 'min') {
      length.min = Number(num);
    } else {
      length.max = Number(num);
    }

    if (item.typename === 'checkboxgroup') {
      length.type = 'array';
    }

    if (item.typename === 'number') {
      length.type = 'number';
    }

    setRulesLengthMessage([length], lengthName);
    updateItem(item);
  }

  return (
    <EditItem label={lengthName}>
      <Input.Group compact>
        <InputNumber
          style={{ width: 100, textAlign: 'center' }}
          type="number"
          placeholder="最小"
          min={negative ? undefined : 0}
          defaultValue={getLengthObject(item.rules)?.min}
          onChange={(min) => handleLengthChange(min, 'min')}
        />
        <Input
          style={{
            width: 30,
            borderLeft: 0,
            borderRight: 0,
            pointerEvents: 'none',
          }}
          placeholder="~"
          disabled
        />
        <InputNumber
          style={{ width: 100, textAlign: 'center', borderLeft: 0 }}
          type="number"
          placeholder="最大"
          min={0}
          defaultValue={getLengthObject(item.rules)?.max}
          onChange={(max) => handleLengthChange(max, 'max')}
        />
      </Input.Group>
    </EditItem>
  );
};

export default LengthRange;
