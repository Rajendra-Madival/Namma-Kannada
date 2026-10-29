import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import GlobalFlowField from "./components/features/GlobalFlowField";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ExpressionDetail from "./pages/ExpressionDetail";
import Regions from "./pages/Regions";
import RegionDetail from "./pages/RegionDetail";
import Contribute from "./pages/Contribute";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CompareDialects from "./pages/CompareDialects";
import Translator from "./pages/Translator";
import AmbientAudioPlayer from "./components/features/AmbientAudioPlayer";
import EmptyState from "./components/common/EmptyState";
import Button from "./components/common/Button";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

/**
 * ScrollToTop ensures route changes reset scroll position to top.
 */
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

function NotFound() {
  return (
    <div className="site-container" style={{ padding: "6rem 1rem", minHeight: "60vh" }}>
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

/**
 * AppLayout wraps all routes in the unified Namma Kannada chrome.
 * Single layout, single website, unified aesthetic.
 */
function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <GlobalFlowField />
      <Navbar />
      <main id="main-content" className="app-main">
        {children}
      </main>
      <AmbientAudioPlayer />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Auth pages — no AppLayout wrapper (standalone full-page) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Main app routes */}
          <Route path="/" element={<AppLayout><Home /></AppLayout>} />
          <Route path="/explore" element={<AppLayout><Explore /></AppLayout>} />
          <Route path="/explore/:expressionId" element={<AppLayout><ExpressionDetail /></AppLayout>} />
          <Route path="/compare" element={<AppLayout><CompareDialects /></AppLayout>} />
          <Route path="/translator" element={<AppLayout><Translator /></AppLayout>} />
          <Route path="/regions" element={<AppLayout><Regions /></AppLayout>} />
          <Route path="/regions/:regionId" element={<AppLayout><RegionDetail /></AppLayout>} />
          <Route path="/contribute" element={<AppLayout><Contribute /></AppLayout>} />
          <Route path="/about" element={<AppLayout><About /></AppLayout>} />
          <Route path="/contact" element={<AppLayout><Contact /></AppLayout>} />
          <Route path="*" element={<AppLayout><NotFound /></AppLayout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
