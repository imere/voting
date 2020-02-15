import React from "react";
import { Form } from "antd";

import { AnyType } from "@/types";

import { QItemProps } from "./Q";

interface WrapNormalReceivedProps extends QItemProps, AnyType {
  children: React.FC<any>
}

type WrapNormalProps = WrapNormalReceivedProps

const WrapNormal: React.FC<WrapNormalProps> = ({ className, style, label, extra, children, ...rest }: WrapNormalProps) => (
  <Form.Item
    className={className}
    style={style}
    label={label}
    extra={extra}
  >
    {children(rest)}
  </Form.Item>
);

export default WrapNormal;
