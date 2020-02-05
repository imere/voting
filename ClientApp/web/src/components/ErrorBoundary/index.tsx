import React from "react";

interface ErrorBoundaryReceivedProps {
  children?: React.ReactNode
}

interface ErrorBoundaryOwnState {
  hasError: boolean
}

class ErrorBoundary extends React.PureComponent<ErrorBoundaryReceivedProps, ErrorBoundaryOwnState> {
  constructor(props: ErrorBoundaryReceivedProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidCatch(error: any, errorInfo: any) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>出错了/(ㄒoㄒ)/~~</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
