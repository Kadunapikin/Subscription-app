import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './layout/Home';
import Login from './layout/Login';
import Register from './layout/Register';
import Success from './layout/Success';
import Cancel from './layout/Cancel';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />;
        <Route path="/login" element={<Login />} />;
        <Route path="/register" element={<Register />} />;
        <Route path="/success" element={<Success />} />;
        <Route path="/cancel" element={<Cancel />} />;
      </Routes>
    </BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </>
  )
}

export default App
