import { Component } from 'react';
import './ErrorButton.css';

interface ErrorButtonState {
  error: Error | null;
}

export class ErrorButton extends Component<
  NonNullable<unknown>,
  ErrorButtonState
> {
  constructor(props: NonNullable<unknown>) {
    super(props);
    this.state = { error: null };
  }

  handleClick = () => {
    try {
      throw new Error('Error when pressing the button');
    } catch (error) {
      this.setState({ error: error as Error });
    }
  };

  render() {
    if (this.state.error) {
      throw this.state.error;
    }
    return (
      <button className={'error-button'} onClick={this.handleClick}>
        Error checking
      </button>
    );
  }
}
