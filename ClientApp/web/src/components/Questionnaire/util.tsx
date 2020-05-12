import React from 'react';

import QCheckBoxGroup from '@/components/Questionnaire/Components/QCheckBoxGroup';
import QInput from '@/components/Questionnaire/Components/QInput';
import QNumber from '@/components/Questionnaire/Components/QNumber';
import WrapModify from '@/components/Questionnaire/WrapModify';
import EditQCheckBoxGroup from '@/components/Questionnaire/WrapModify/ButtonEdit/ButtonEditOptions/EditQCheckBoxGroup';
import EditQInput from '@/components/Questionnaire/WrapModify/ButtonEdit/ButtonEditOptions/EditQInput';
import EditQNumber from '@/components/Questionnaire/WrapModify/ButtonEdit/ButtonEditOptions/EditQNumber';
import WrapNormal from '@/components/Questionnaire/WrapNormal';
import { QuestionnaireContentType, TypeCheckBoxGroup } from '@/components/Questionnaire/questionnaire';
import { Logger } from '@/framework/shared/logger';
import {
  getLengthMessageByType,
  hashName,
  setRulesLengthMessage,
  toggleRequired,
} from '@/components/Questionnaire/data-util';

type QItemMapType = Record<QuestionnaireContentType['typename'], React.ComponentType<any>>
export const QItemMap: QItemMapType = {
  'input': QInput,
  'checkboxgroup': QCheckBoxGroup,
  'number': QNumber,
};

export function renderQItems(edit: boolean, items: Array<QuestionnaireContentType>): any[] {
  if (edit) {
    return items.map((item) => (
      <WrapModify
        key={item.name}
        {...item}
      >
        {QItemMap[item.typename]}
      </WrapModify>
    ));
  }
  return items.map((item) => (
    <WrapNormal
      key={item.name}
      {...item}
    >
      {QItemMap[item.typename]}
    </WrapNormal>
  ));
}

function generateCommon(label: string) {
  return {
    label,
    name: hashName(label),
  };
}
type QItemDefaultDataType = Record<QuestionnaireContentType['typename'], () => QuestionnaireContentType>
export const QItemDefaultData: QItemDefaultDataType = {
  input: () => ({
    ...generateCommon('label'),
    typename: 'input',
    rules: toggleRequired(
      setRulesLengthMessage([
        { whitespace: true, message: '不能为空' },
        { min: 0 },
      ], getLengthMessageByType('input'))
    ),
  }),
  checkboxgroup: () => ({
    ...generateCommon('label'),
    typename: 'checkboxgroup',
    value: [],
    options: ['default'],
    rules: toggleRequired([]),
  }),
  number: () => ({
    ...generateCommon('label'),
    typename: 'number',
    rules: toggleRequired([]),
  }),
};

type QItemDataParam<T> = Omit<T, 'name'> & { name?: string, options?: TypeCheckBoxGroup['options'] }
export function QItemDataFactory({ typename, label, ...rest }: QItemDataParam<QuestionnaireContentType>) {
  switch (typename) {
  case 'input':
  case 'checkboxgroup':
  case 'number':
    return {
      typename,
      label,
      name: hashName(label),
      ...rest,
    };
  default:
    Logger.warn('Undefined type', typename);
    return {} as QItemDataParam<QuestionnaireContentType>;
  }
}

type ButtonEditContentType = QItemMapType
export const ButtonEditContentMap: ButtonEditContentType = {
  input: EditQInput,
  checkboxgroup: EditQCheckBoxGroup,
  number: EditQNumber,
};
