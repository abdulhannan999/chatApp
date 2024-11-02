import React, { useContext } from 'react';
import Auth from './components/Auth';
import Room from './components/Room';
import Chat from './components/Chat';
import { RoomContext } from './Context';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import "react-toastify/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

const ProtectedRoutes = ({ element, requiresRoom = false }) => {
  const { isAuth, value: roomSelected } = useContext(RoomContext);

  // Redirect to login if not authenticated
  if (!isAuth) return <Navigate to="/" />;

  // Redirect to Room page if room selection is required and not selected
  if (requiresRoom && !roomSelected) return <Navigate to="/input" />;

  // If authenticated and room selection is met, render the component
  return element;
};

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/input" element={<ProtectedRoutes element={<Room />} />} />
          <Route path="/chat" element={<ProtectedRoutes element={<Chat />} requiresRoom />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
