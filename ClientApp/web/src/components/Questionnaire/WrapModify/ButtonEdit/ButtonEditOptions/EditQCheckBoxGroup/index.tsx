import React from 'react';

import Layout from '@/components/Questionnaire/WrapModify/ButtonEdit/ButtonEditOptions/Common/Layout';
import LengthRange from '@/components/Questionnaire/WrapModify/ButtonEdit/ButtonEditOptions/Common/LengthRange';
import { TypeCheckBoxGroup } from '@/components/Questionnaire/questionnaire';
import { QEventBus } from '@/components/Questionnaire/QEventBus';

import DefaultValue from './DefaultValue';
import Options from './Options';

interface EditQCheckBoxGroupReceivedProps {
  ctx: QEventBus
  name: TypeCheckBoxGroup['name']
}

type EditQCheckBoxGroupProps = EditQCheckBoxGroupReceivedProps

const EditQCheckBoxGroup = (props: EditQCheckBoxGroupProps) => (
  <Layout
    { ...props }
  >
    <DefaultValue {...props} />
    <Options {...props} />
    <LengthRange
      lengthName="选项数"
      {...props}
    />
  </Layout>
);

export default EditQCheckBoxGroup;
