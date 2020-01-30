import React from "react";

interface ErrorBoundaryReceivedProps {
  children?: React.ReactNode
}

class ErrorBoundary extends React.PureComponent<ErrorBoundaryReceivedProps> {
  // eslint-disable-next-line class-methods-use-this
  componentDidCatch(error: any, errorInfo: any) {
    console.error(error, errorInfo);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
