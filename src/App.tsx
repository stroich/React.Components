import MainPage from './MainPage/MainPage.tsx';
import { ErrorBoundary } from './components/Error/ErrorBoundary.tsx';

const App = () => {
  return (
    <ErrorBoundary>
      <MainPage />
    </ErrorBoundary>
  );
};

export default App;
