import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { VerificationForm } from './components/VerificationForm';
import { CertificateResult } from './components/CertificateResult';
import { AdminPanel } from './components/AdminPanel';
import { VideoGuide } from './components/VideoGuide';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-white">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h1 className="text-4xl font-bold text-primary animate-slide-up">
                      Certificate Verification System
                    </h1>
                    <p className="text-lg text-gray-600 animate-slide-up">
                      Enter your certificate number below to verify its authenticity
                    </p>
                    <VerificationForm />
                    <VideoGuide />
                  </div>
                </>
              }
            />
            <Route path="/:certificateId" element={<CertificateResult />} />
            <Route path="/adminp" element={<AdminPanel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;