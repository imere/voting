import React, { useContext } from 'react';
import { Checkbox, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

import { QuestionnaireContentType } from '@/components/Questionnaire/questionnaire';
import { isRequired, toggleRequired } from '@/components/Questionnaire/data-util';
import { QuestionnaireContext } from '@/contexts/questionnaire';

import { EditItem } from './EditItem';

type LayoutReceivedProps = {
  children?: React.ReactNode
  name: string
}

type LayoutProps = LayoutReceivedProps

const Layout: React.FC<LayoutProps> = ({ children, name }: LayoutProps) => {
  const { getItem, updateItem } = useContext(QuestionnaireContext);

  const item = getItem(name) as QuestionnaireContentType;

  function handleRequireChange({ target: { checked } }: CheckboxChangeEvent) {
    if (checked !== isRequired(item.rules)) {
      toggleRequired(item.rules);
    }
    updateItem(item);
  }

  function handleLabelChange({ target: { value: label } }: React.ChangeEvent<HTMLInputElement>) {
    label = label.trim();
    if (!label) {
      return;
    }
    item.label = label;
    updateItem(item);
  }

  return (
    <>
      <EditItem label="标签">
        <Input
          defaultValue={item.label}
          placeholder="两端空格无效"
          onChange={handleLabelChange}
        />
      </EditItem>
      <EditItem label="必填">
        <Checkbox
          defaultChecked={isRequired(item.rules)}
          onChange={handleRequireChange}
        />
      </EditItem>
      {children}
    </>
  );
};

export default Layout;
