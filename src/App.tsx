import MainPage from './MainPage/MainPage.tsx';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout.tsx';
import Details from './components/details/Details.tsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MainPage />}>
            <Route path="details" element={<Details />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
