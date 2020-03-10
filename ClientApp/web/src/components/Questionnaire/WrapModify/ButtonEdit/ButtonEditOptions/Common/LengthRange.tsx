import React, { useContext } from "react";
import { Input, InputNumber } from "antd";

import QuestionnaireContext from "@/contexts/questionnaire";
import { QuestionnaireContentType } from "@/components/Questionnaire/questionnaire";
import { getLength, setLengthMessage } from "@/components/Questionnaire/util";

type LengthRangeReceivedProps = {
  id?: string
  onChange?: (ev: React.ChangeEvent) => void
  lengthName: string
} &
  QuestionnaireContentType

type LengthRangeProps = LengthRangeReceivedProps

const LengthRange = ({ lengthName, typename, name }: LengthRangeProps) => {
  const { getItem, updateItem } = useContext(QuestionnaireContext);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const item = getItem(name)!;

  function handleLengthChange(num: number | undefined, minmax: "min" | "max") {
    if (typeof num === "undefined") {
      return;
    }

    let length = getLength(item.rules);
    if (!length) {
      item.rules.push(length = {});
    }
    if (minmax === "min") {
      length.min = Number(num);
    } else {
      length.max = Number(num);
    }

    if (typename === "checkboxgroup") {
      length.type = "array";
    }

    setLengthMessage([length], lengthName);
    updateItem(item);
  }

  return (
    <Input.Group compact>
      <InputNumber
        style={{ width: 100, textAlign: "center" }}
        type="number"
        placeholder="最小"
        min={0}
        onChange={(min) => handleLengthChange(min, "min")}
      />
      <Input
        style={{
          width: 30,
          borderLeft: 0,
          borderRight: 0,
          pointerEvents: "none",
        }}
        placeholder="~"
        disabled
      />
      <InputNumber
        style={{ width: 100, textAlign: "center", borderLeft: 0 }}
        type="number"
        placeholder="最大"
        min={0}
        onChange={(max) => handleLengthChange(max, "max")}
      />
    </Input.Group>
  );
};

export default LengthRange;
