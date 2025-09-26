import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import AuthCallback from './components/AuthCallback';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F5F3EF] antialiased">
        <Header />
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <Benefits />
              <HowItWorks />
              <Testimonials />
              <FAQ />
            </main>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;