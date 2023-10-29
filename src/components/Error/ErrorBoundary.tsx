import { Component, ReactNode } from 'react';
import './ErrorBoundary.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error) {
    console.error('An error has occurred:', error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <div className={'error-message'}>Something went wrong</div>;
    }
    return this.props.children;
  }
}
