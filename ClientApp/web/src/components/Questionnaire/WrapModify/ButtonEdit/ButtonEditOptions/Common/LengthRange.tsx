import React from 'react';
import { Input, InputNumber } from 'antd';

import { QuestionnaireContentType } from '@/components/Questionnaire/questionnaire';
import { getLengthObject, setRulesLengthMessage } from '@/components/Questionnaire/data-util';
import { QEventBus } from '@/components/Questionnaire/QEventBus';
import { None } from '@/typings/types';

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

  function handleLengthChange(num: number | None, minmax: 'min' | 'max') {

    let lengthObj = getLengthObject(item.rules);
    if (!lengthObj) {
      item.rules.push(lengthObj = {});
    }
    lengthObj[minmax] =
      num === undefined || num === null
        ? undefined
        : Number(num);

    if (item.typename === 'checkboxgroup') {
      lengthObj.type = 'array';
    }

    if (item.typename === 'number') {
      lengthObj.type = 'number';
    }

    setRulesLengthMessage([lengthObj], lengthName);
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
