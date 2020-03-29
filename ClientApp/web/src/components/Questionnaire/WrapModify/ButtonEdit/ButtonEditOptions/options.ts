import { QuestionnaireContentType } from '@/components/Questionnaire/questionnaire';

type RadioType = {
  label: string
  value: QuestionnaireContentType['typename']
}

export const options: RadioType[] = [
  {
    label: 'Input',
    value: 'input',
  },
  {
    label: 'CheckboxGroup',
    value: 'checkboxgroup'
  }
];
