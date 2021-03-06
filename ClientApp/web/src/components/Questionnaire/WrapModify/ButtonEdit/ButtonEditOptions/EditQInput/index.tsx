import React from 'react';

import Layout from '@/components/Questionnaire/WrapModify/ButtonEdit/ButtonEditOptions/Common/Layout';
import LengthRange from '@/components/Questionnaire/WrapModify/ButtonEdit/ButtonEditOptions/Common/LengthRange';
import { TypeInput } from '@/components/Questionnaire/questionnaire';
import { QEventBus } from '@/components/Questionnaire/QEventBus';
import { getLengthMessageByType } from '@/components/Questionnaire/data-util';

import DefaultValue from './DefaultValue';

interface EditQInputReceivedProps {
  ctx: QEventBus
  name: TypeInput['name']
}

type EditQInputProps = EditQInputReceivedProps

const EditQInput: React.FC<EditQInputProps> = (props: EditQInputProps) => (
  <Layout
    {...props}
  >
    <DefaultValue {...props} />
    <LengthRange
      lengthName={getLengthMessageByType('input')}
      {...props}
    />
  </Layout>
);

export default EditQInput;
