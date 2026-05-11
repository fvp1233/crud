import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register';
import VerifyCode from './pages/VerifyCode';
import Crud from './pages/Crud';

function App() {
  return (
      <Router>

        <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/verifyCode" element={<VerifyCode />} />

        <Route path="/crud" element={<Crud />} />


        {/*Ruta general es la que siempre abrira */}
        <Route path="*" element={<Navigate to="/login" />} />

        </Routes>

      </Router>
    
  );
}

export default App
