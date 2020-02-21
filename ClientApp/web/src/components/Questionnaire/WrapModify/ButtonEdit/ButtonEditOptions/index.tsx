import React, { useContext } from "react";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/es/radio";

import QuestionnaireContext from "@/contexts/questionnaire";
import { QuestionnaireContentType } from "@/data-types";
import { ButtonEditContentMap, isRequired, QItemDataFactory, QItemDefaultData } from "@/components/Questionnaire/utils";

import { options } from "./options";

type ButtonEditOptionsProps = QuestionnaireContentType

const ButtonEditOptions = ({ typename: defaultTypename, label, name, rules, ...rest }: ButtonEditOptionsProps) => {
  const { updateItem } = useContext(QuestionnaireContext);

  function handleClick({ target: { value } }: RadioChangeEvent) {
    const typename = value as QuestionnaireContentType["typename"];
    const factory = QItemDataFactory[typename];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { label: _, name: __, rules: ___, ...rest } = QItemDefaultData[typename]();
    updateItem(factory(
      {
        ...rest,
        label,
        name,
        rules: isRequired(rules) ? ___ : [],
      } as any
    ));
  }

  return (
    <>
      {React.createElement(ButtonEditContentMap[defaultTypename], { typename: defaultTypename, label, name, rules, ...rest })}
      <Radio.Group
        defaultValue={defaultTypename}
        onChange={handleClick}
      >
        {
          options.map((option, i) => (
            <Radio.Button key={i} value={option.value}>
              {option.label}
            </Radio.Button>
          ))
        }
      </Radio.Group>
    </>
  );
};

export default ButtonEditOptions;
