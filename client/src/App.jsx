import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import ExpressionDetail from './pages/ExpressionDetail';
import Regions from './pages/Regions';
import RegionDetail from './pages/RegionDetail';
import Contribute from './pages/Contribute';
import About from './pages/About';
import Contact from './pages/Contact';
import EmptyState from './components/common/EmptyState';
import Button from './components/common/Button';
import './App.css';

function NotFound() {
  return (
    <div className="container" style={{ padding: '6rem 1rem' }}>
      <EmptyState
        title="೪೦೪ - ಪುಟ ಕಂಡುಬಂದಿಲ್ಲ (Page Not Found)"
        description="The page you are looking for does not exist or has been moved."
        action={
          <a href="/">
            <Button variant="primary">
              ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ (Back to Home)
            </Button>
          </a>
        }
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main id="main-content" className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/explore/:expressionId" element={<ExpressionDetail />} />
            <Route path="/regions" element={<Regions />} />
            <Route path="/regions/:regionId" element={<RegionDetail />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
