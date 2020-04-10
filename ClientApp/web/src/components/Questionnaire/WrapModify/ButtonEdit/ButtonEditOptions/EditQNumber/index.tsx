import React from 'react';

import Layout from '@/components/Questionnaire/WrapModify/ButtonEdit/ButtonEditOptions/Common/Layout';
import LengthRange from '@/components/Questionnaire/WrapModify/ButtonEdit/ButtonEditOptions/Common/LengthRange';
import { TypeInput } from '@/components/Questionnaire/questionnaire';
import { QEventBus } from '@/components/Questionnaire/QEventBus';
import { getLengthMessageByType } from '@/components/Questionnaire/data-util';

import DefaultValue from './DefaultValue';

interface EditQNumberReceivedProps {
  ctx: QEventBus
  name: TypeInput['name']
}

type EditQNumberProps = EditQNumberReceivedProps

const EditQNumber: React.FC<EditQNumberProps> = (props: EditQNumberProps) => (
  <Layout
    {...props}
  >
    <DefaultValue {...props} />
    <LengthRange
      lengthName={getLengthMessageByType('number')}
      negative={true}
      {...props}
    />
  </Layout>
);

export default EditQNumber;
