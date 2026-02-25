import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import './tailwind.css';
// import { useEffect } from "react";

function App() {
  // useEffect(() => {
  //   document.body.style.overflow = "auto";
  //   window.history.scrollRestoration = "manual";
  //   window.scrollTo(0, 0);
  // }, []);
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <Toast />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
