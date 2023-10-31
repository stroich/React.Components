import { Component } from 'react';
import MainPage from './MainPage/MainPage.tsx';
import { ErrorBoundary } from './components/Error/ErrorBoundary.tsx';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    );
  }
}

export default App;
