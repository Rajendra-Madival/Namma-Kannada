import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FlowField from "@/components/kokonutui/flow-field";
import "./GlobalFlowField.css";

/**
 * Sitewide ambient Kokonut UI FlowField.
 * - Landing page Hero section: high opacity (~0.55)
 * - Scrolled down on Home, and across all other pages: lower subtle opacity (~0.15)
 */
export default function GlobalFlowField() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [inHero, setInHero] = useState(true);

  useEffect(() => {
    if (!isHomePage) return;

    const checkScroll = () => {
      const isTop = window.scrollY < 380;
      setInHero(isTop);
    };

    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, [isHomePage]);

  // Dynamic opacity: 0.55 in landing hero, 0.15 elsewhere
  const targetOpacity = isHomePage && inHero ? 0.55 : 0.15;

  return (
    <div
      className="global-flow-field-wrap"
      style={{ opacity: targetOpacity }}
      aria-hidden="true"
    >
      <FlowField
        density={1.15}
        speed={1}
        color="rgba(198, 40, 40, 0.42)"
        interactive={true}
      />
    </div>
  );
}
