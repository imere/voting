import React from "react";

import { AuthContextType, Consumer } from "@/contexts/auth";

interface ContextAuthConsumerReceivedProps {
  children: (value: AuthContextType) => React.ReactNode
}

type ContextAuthConsumerProps = ContextAuthConsumerReceivedProps;

const ContextAuthConsumer: React.FC<ContextAuthConsumerProps> = ({ children }: ContextAuthConsumerProps) => (
  <Consumer>
    {children}
  </Consumer>
);

export default ContextAuthConsumer;
