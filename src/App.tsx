import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PageTransition } from './components/PageTransition';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { ContactModal } from './components/ContactModal';
import { ReelModal } from './components/ReelModal';
import { Home } from './pages/Home';
import { Trabajos } from './pages/Trabajos';
import { Estudio } from './pages/Estudio';
import { CasoEstudio } from './pages/CasoEstudio';
import { NotFound } from './pages/NotFound';

export default function App(): React.ReactElement {
  const [contactOpen, setContactOpen] = useState(false);
  const [reelOpen, setReelOpen] = useState(false);
  useSmoothScroll();

  return (
    <ErrorBoundary>
      <HashRouter>
        <div className="min-h-screen bg-[#0E0F0C] text-[#EDEDE6] flex flex-col font-sans selection:bg-[#C6FF3D] selection:text-[#0E0F0C]">
          <Navbar onOpenContact={() => setContactOpen(true)} />

          <main className="flex-1 w-full pt-16">
            <PageTransition>
              {(location) => (
                <Routes location={location}>
                  <Route
                    path="/"
                    element={
                      <Home
                        onOpenReel={() => setReelOpen(true)}
                        onOpenContact={() => setContactOpen(true)}
                      />
                    }
                  />
                  <Route
                    path="/trabajos"
                    element={<Trabajos onOpenContact={() => setContactOpen(true)} />}
                  />
                  <Route
                    path="/estudio"
                    element={<Estudio onOpenContact={() => setContactOpen(true)} />}
                  />
                  <Route
                    path="/caso/:id"
                    element={
                      <CasoEstudio
                        onOpenContact={() => setContactOpen(true)}
                        onOpenReel={() => setReelOpen(true)}
                      />
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              )}
            </PageTransition>
          </main>

          <Footer onOpenContact={() => setContactOpen(true)} />

          {/* Global Modals */}
          <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
          <ReelModal isOpen={reelOpen} onClose={() => setReelOpen(false)} />
        </div>
      </HashRouter>
    </ErrorBoundary>
  );
}
