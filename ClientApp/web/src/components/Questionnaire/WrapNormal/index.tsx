import React from 'react';

interface WrapNormalReceivedProps {
  children: React.FC<any> | React.ComponentClass
}

type WrapNormalProps = WrapNormalReceivedProps

const WrapNormal: React.FC<WrapNormalProps> = ({ children, ...rest }: WrapNormalProps) => (
  <>{React.createElement(children, rest)}</>
);

export default WrapNormal;
