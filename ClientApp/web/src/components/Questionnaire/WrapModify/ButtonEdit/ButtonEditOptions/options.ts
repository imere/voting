import { QuestionnaireContentType } from "@/data-types";

type RadioType = {
  label: string
  value: QuestionnaireContentType["typename"]
}

export const options: RadioType[] = [
  {
    label: "Input",
    value: "input",
  },
  {
    label: "Checkbox",
    value: "checkboxgroup"
  }
];
