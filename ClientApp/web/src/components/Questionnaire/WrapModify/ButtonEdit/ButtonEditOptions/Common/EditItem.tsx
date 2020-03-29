import React from 'react';
import { Col, Row } from 'antd';

type ItemReceivedProps = {
  children: React.ReactNode
  label: string
}

type ItemProps = ItemReceivedProps

const EditItem: React.FC<ItemProps> = ({ children, label }: ItemProps) => (
  <Row className="ant-form-item">
    <Col className="ant-form-item-label">
      <label>{label}</label>
    </Col>
    <Col className="ant-form-item-control">
      {children}
    </Col>
  </Row>
);

export { EditItem };
