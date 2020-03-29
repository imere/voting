import React from 'react';

import QCheckBoxGroup from '@/components/Questionnaire/Components/QCheckBoxGroup';
import QInput from '@/components/Questionnaire/Components/QInput';
import WrapModify from '@/components/Questionnaire/WrapModify';
import EditQCheckBoxGroup from '@/components/Questionnaire/WrapModify/ButtonEdit/ButtonEditOptions/EditQCheckBoxGroup';
import EditQInput from '@/components/Questionnaire/WrapModify/ButtonEdit/ButtonEditOptions/EditQInput';
import WrapNormal from '@/components/Questionnaire/WrapNormal';
import { QuestionnaireContentType, TypeCheckBoxGroup, TypeInput } from '@/components/Questionnaire/questionnaire';

import { hashName, setRulesLengthMessage, toggleRequired } from './data-util';

type QItemMapType = {
  [K in QuestionnaireContentType['typename']]: React.ComponentType<any>;
};
export const QItemMap: QItemMapType = {
  'input': QInput,
  'checkboxgroup': QCheckBoxGroup,
};

export function renderQItems(edit: boolean, items: Array<QuestionnaireContentType>): any[] {
  if (edit) {
    return items.map((item, i) => (
      <WrapModify
        key={i}
        {...item}
      >
        {QItemMap[item.typename]}
      </WrapModify>
    ));
  }
  return items.map((item, i) => (
    <WrapNormal
      key={i}
      {...item}
    >
      {QItemMap[item.typename]}
    </WrapNormal>
  ));
}

type QItemDefaultDataType = {
  [K in QuestionnaireContentType['typename']]: () => QuestionnaireContentType
}
export const QItemDefaultData: QItemDefaultDataType = {
  'input': () => ({
    typename: 'input',
    label: 'label',
    name: hashName('input'),
    rules: toggleRequired(
      setRulesLengthMessage([
        { whitespace: true, message: '不能为空' },
        { min: 0 },
      ])
    ),
  }),
  'checkboxgroup': () => ({
    typename: 'checkboxgroup',
    label: 'label',
    name: hashName('checkboxgroup'),
    value: [],
    options: ['default'],
    rules: toggleRequired([]),
  }),
};

// type QItemDataFactoryType = {
//   [K in QuestionnaireContentType["typename"]]: (prop: any) => any
// }
type QItemDataParam<T> = Omit<T, 'typename' | 'name'> & { name?: string }
export const QItemDataFactory = {
  'input': ({ label, ...rest }: QItemDataParam<TypeInput>): TypeInput => ({
    typename: 'input',
    label,
    name: hashName(label),
    ...rest,
  }),
  'checkboxgroup': ({ label, ...rest }: QItemDataParam<TypeCheckBoxGroup>): TypeCheckBoxGroup => ({
    typename: 'checkboxgroup',
    label,
    name: hashName(label),
    ...rest,
  }),
};

type ButtonEditContentType = QItemMapType
export const ButtonEditContentMap: ButtonEditContentType = {
  'input': EditQInput,
  'checkboxgroup': EditQCheckBoxGroup,
};
