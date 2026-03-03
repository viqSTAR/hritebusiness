import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LiquidBackground from './components/Background/LiquidBackground';
import Header from './components/Layout/Header';
import LandingPage from './pages/LandingPage';
import PortfolioPage from './pages/PortfolioPage';
import TrackPage from './pages/TrackPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import { ModalProvider } from './context/ModalContext';

function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <LiquidBackground />

        <Routes>
          <Route path="/" element={<><Header /><LandingPage /></>} />
          <Route path="/portfolio" element={<><Header /><PortfolioPage /></>} />
          <Route path="/track" element={<><Header /><TrackPage /></>} />
          <Route path="/contact" element={<><Header /><ContactPage /></>} />
          <Route path="/about" element={<><Header /><AboutPage /></>} />
          <Route path="/privacy" element={<><Header /><PrivacyPage /></>} />
          <Route path="/terms" element={<><Header /><TermsPage /></>} />
        </Routes>
      </BrowserRouter>
    </ModalProvider>
  );
}

export default App;
