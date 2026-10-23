import React, { useEffect, useRef } from "react";
import { animate } from "animejs";
import "./AnimatedHero.css";

const KANNADA_WORDS_AND_CHARS = [
  // Words
  "ಕನ್ನಡ", "ಸಿರಿಗನ್ನಡ", "ನಾಡು", "ನುಡಿ", "ಕಸ್ತೂರಿ", "ಚೆಲುವು", "ಜೇನು", "ಸಾಹಿತ್ಯ", "ಗಂಧದಗುಡಿ",
  // Aksharamale (Letters)
  "ಅ", "ಆ", "ಇ", "ಈ", "ಉ", "ಋ", "ಎ", "ಏ", "ಐ", "ಒ", "ಓ", "ಔ",
  "ಕ", "ಖ", "ಗ", "ಘ", "ಚ", "ಜ", "ಟ", "ಣ", "ತ", "ದ", "ಧ", "ನ",
  "ಪ", "ಫ", "ಬ", "ಭ", "ಮ", "ಯ", "ರ", "ಲ", "ವ", "ಶ", "ಷ", "ಸ", "ಹ", "ಳ"
];

export default function AnimatedHero({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating Kannada words and letters in the background
    const particles = KANNADA_WORDS_AND_CHARS.map((text) => {
      const el = document.createElement("span");
      el.textContent = text;
      el.className = "hero-particle kannada-text";
      el.style.left = (Math.random() * 92 + 4) + "%";
      el.style.top = (Math.random() * 85 + 6) + "%";

      const isWord = text.length > 1;
      el.style.fontSize = isWord
        ? (Math.random() * 6 + 18) + "px"
        : (Math.random() * 12 + 13) + "px";
      el.style.fontWeight = isWord ? "700" : "500";
      el.style.color = Math.random() > 0.4 ? "var(--color-karnataka-red)" : "#B27D00";

      el.style.opacity = "0";
      container.appendChild(el);
      return el;
    });

    // Float particles in gentle looping waves
    particles.forEach((el) => {
      animate(el, {
        translateY: [Math.random() * 36 - 18, Math.random() * 36 - 18],
        translateX: [Math.random() * 30 - 15, Math.random() * 30 - 15],
        opacity: [0, Math.random() * 0.15 + 0.12, 0],
        scale: [0.8, 1.08, 0.85],
        duration: Math.random() * 4500 + 4200,
        delay: Math.random() * 2000,
        loop: true,
        ease: "inOutSine",
      });
    });

    // Hero entrance animations
    animate(".hero-anim-heading", {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 800,
      delay: 120,
      ease: "outExpo",
    });

    animate(".hero-anim-sub", {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 650,
      delay: 350,
      ease: "outCubic",
    });

    animate(".hero-anim-search", {
      opacity: [0, 1],
      translateY: [14, 0],
      duration: 600,
      delay: 520,
      ease: "outCubic",
    });

    animate(".hero-anim-link", {
      opacity: [0, 1],
      translateX: [-14, 0],
      duration: 500,
      delay: 700,
      ease: "outCubic",
    });

    animate(".hero-accent-line", {
      scaleX: [0, 1],
      duration: 700,
      delay: 800,
      ease: "outExpo",
    });

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, []);

  return (
    <div className="animated-hero-container">
      {/* Floating Kannada words layer */}
      <div ref={containerRef} className="hero-particles-layer" aria-hidden="true" />

      {/* Ambient gradient orbs */}
      <div className="hero-gradient-orb orb-1" />
      <div className="hero-gradient-orb orb-2" />
      <div className="hero-gradient-orb orb-3" />

      {/* Hero content */}
      <div className="hero-content-wrapper">
        {children}
      </div>
    </div>
  );
}
