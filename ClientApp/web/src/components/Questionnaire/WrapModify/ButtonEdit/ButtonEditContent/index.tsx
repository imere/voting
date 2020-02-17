import React, { useContext } from "react";
import { Radio } from "antd";

import QuestionnaireContext from "@/contexts/questionnaire";
import { QuestionnaireContentType } from "@/data-types";
import { isRequired, QItemDataFactory, QItemDefaultData } from "@/components/Questionnaire/utils";

import { options } from "./options";

type ButtonEditContentProps = QuestionnaireContentType

const ButtonEditContent = ({ typename: defaultTypename, label, name, rules }: ButtonEditContentProps) => {
  const { updateItem, forceRender } = useContext(QuestionnaireContext);
  function handleClick(typename: QuestionnaireContentType["typename"]) {
    const factory = QItemDataFactory[typename];
    if (!factory) {
      return;
    }
    const { label: _, name: __, rules: ___, ...rest } = QItemDefaultData[typename];
    updateItem(factory(
      {
        ...rest,
        label,
        name,
        rules: isRequired(rules) ? ___ : [],
      } as any
    ));
    forceRender((v) => !v);
  }
  return (
    <Radio.Group
      defaultValue={defaultTypename}
      options={options}
      onChange={(ev) => handleClick(ev.target.value)}
    >
    </Radio.Group>
  );
};
export default ButtonEditContent;
