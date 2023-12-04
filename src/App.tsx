import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage.tsx';
import HookForm from './pages/HookForm/hookForm.tsx';
import FormWithUncontrolledComponents from './pages/FormWithUncontrolledComponents/FormWithUncontrolledComponents.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/uncontrolledComponents"
          element={<FormWithUncontrolledComponents />}
        />
        <Route path="/hookForm" element={<HookForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
