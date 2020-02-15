import React, { useEffect } from "react";
import { Form, Icon } from "antd";

import { AnyType } from "@/types";

import { QItemProps } from "./Q";
import { SetItemsDispatch, setRequiredMessage } from "./utils";

interface WrapEditReceivedProps extends QItemProps, AnyType {
  children: React.FC<any>
  setItems: SetItemsDispatch
}

type WrapEditProps = WrapEditReceivedProps

const WrapEdit: React.FC<WrapEditProps> = ({ className, style, label, extra, children, setItems, ...rest }: WrapEditProps) => {
  const { id, rules } = rest;

  function remove(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  useEffect(() => {
    setRequiredMessage(rules);
  }, []);

  return (
    <Form.Item
      className={className}
      style={style}
      label={label}
      extra={extra}
    >
      {children(rest)}
      <div>
        <Icon
          style={{ margin: "8px 8px 0" }}
          type="edit"
        />
        <Icon
          style={{ margin: "8px 8px 0" }}
          type="minus-circle-o"
          onClick={() => remove(id)}
        />
      </div>
    </Form.Item>
  );
};

export default WrapEdit;
