import React, { useState } from 'react';
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
import VoiceDemo from './components/VoiceDemo';
import { RETELL_CONFIG } from './config/retell';

function App() {
  const [showVoiceDemo, setShowVoiceDemo] = useState(false);

  const handleStartVoiceDemo = () => {
    setShowVoiceDemo(true);
  };

  const handleCloseVoiceDemo = () => {
    setShowVoiceDemo(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#F5F3EF] antialiased">
        <Header onStartVoiceDemo={handleStartVoiceDemo} />
        <Routes>
          <Route path="/" element={
            <main>
              <Hero onStartVoiceDemo={handleStartVoiceDemo} />
              <Benefits />
              <HowItWorks />
              <Testimonials onStartVoiceDemo={handleStartVoiceDemo} />
              <FAQ />
            </main>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
        <Footer />
        
        {/* Voice Demo Modal */}
        {showVoiceDemo && (
          <VoiceDemo
            agentId={RETELL_CONFIG.DEFAULT_AGENT_ID}
            agentName={RETELL_CONFIG.AGENT_NAME}
            onClose={handleCloseVoiceDemo}
          />
        )}
      </div>
    </Router>
  );
}

export default App;