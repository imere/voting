import React, { useContext } from "react";
import { Tabs } from "antd";

import QuestionnaireContext from "@/contexts/questionnaire";
import { QuestionnaireContentType } from "@/data-types";
import { ButtonEditContentMap, isRequired, QItemDataFactory, QItemDefaultData } from "@/components/Questionnaire/utils";

import { options } from "./options";

const { TabPane } = Tabs;

type ButtonEditOptionsProps = QuestionnaireContentType

const ButtonEditOptions = ({ typename: defaultTypename, label, name, rules, ...rest }: ButtonEditOptionsProps) => {
  const { updateItem, forceRender } = useContext(QuestionnaireContext);

  function handleClick(typename: QuestionnaireContentType["typename"]) {
    const factory = QItemDataFactory[typename];
    if (!factory) {
      return;
    }
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
    forceRender();
  }

  return (
    <Tabs
      tabPosition="bottom"
      defaultActiveKey={defaultTypename}
      onChange={(name) => handleClick(name as QuestionnaireContentType["typename"])}
    >
      {
        options.map((option) => (
          <TabPane tab={option.label} key={option.value}>
            {React.createElement(ButtonEditContentMap[option.value], { label, name, rules, ...rest })}
          </TabPane>
        ))
      }
    </Tabs>
  );
};

export default ButtonEditOptions;
