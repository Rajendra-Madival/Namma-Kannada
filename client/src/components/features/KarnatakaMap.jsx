import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { animate, stagger } from "animejs";
import "./KarnatakaMap.css";

const REGION_PATHS = [
  {
    id: "uttara-karnataka",
    nameEn: "Uttara Karnataka",
    nameKn: "ಉತ್ತರ ಕರ್ನಾಟಕ",
    accentColor: "#C62828",
    d: "M 60 30 L 340 30 L 360 40 L 370 80 L 360 120 L 300 150 L 260 160 L 220 155 L 180 160 L 140 155 L 100 145 L 60 130 L 40 100 L 35 60 Z",
    labelX: 200,
    labelY: 95,
    shortDesc: "Famous for its crisp, rhythmic cadence, respectful address ('-ri'), and rich folk idioms."
  },
  {
    id: "kalyana-karnataka",
    nameEn: "Kalyana Karnataka",
    nameKn: "ಕಲ್ಯಾಣ ಕರ್ನಾಟಕ",
    accentColor: "#E65100",
    d: "M 260 160 L 300 150 L 360 120 L 370 80 L 395 90 L 400 140 L 390 200 L 360 230 L 320 240 L 290 220 L 270 200 L 265 180 Z",
    labelX: 335,
    labelY: 170,
    shortDesc: "Historic dialect of the Deccan plateau with vibrant Sharana philosophy and hospitable phrasing."
  },
  {
    id: "mysuru-mandya",
    nameEn: "Mysuru & Mandya",
    nameKn: "ಮೈಸೂರು - ಮಂಡ್ಯ",
    accentColor: "#F4C430",
    d: "M 100 145 L 180 160 L 220 155 L 260 160 L 265 180 L 270 200 L 260 230 L 240 270 L 200 290 L 160 280 L 120 270 L 95 250 L 80 220 L 80 190 L 90 165 Z",
    labelX: 180,
    labelY: 220,
    shortDesc: "Warm, melodious, and formal cadence shaped by royal court history and Cauvery delta culture."
  },
  {
    id: "malenadu",
    nameEn: "Malenadu",
    nameKn: "ಮಲೆನಾಡು",
    accentColor: "#2E7D32",
    d: "M 40 100 L 60 130 L 80 190 L 80 220 L 70 260 L 55 280 L 40 260 L 30 220 L 25 170 L 30 130 Z",
    labelX: 52,
    labelY: 195,
    shortDesc: "Gentle, expressive cadence cradled in the lush Western Ghats and arecanut valleys."
  },
  {
    id: "karavali",
    nameEn: "Karavali (Coastal)",
    nameKn: "ಕರಾವಳಿ",
    accentColor: "#0277BD",
    d: "M 30 130 L 25 170 L 30 220 L 40 260 L 35 310 L 25 350 L 15 310 L 10 260 L 12 200 L 15 150 L 20 120 Z",
    labelX: 22,
    labelY: 240,
    shortDesc: "Musical inflection influenced by coastal life and harmonious coexistence with Tulu and Konkani."
  },
  {
    id: "bengaluru-urban",
    nameEn: "Bengaluru Urban",
    nameKn: "ಬೆಂಗಳೂರು",
    accentColor: "#6A1B9A",
    d: "M 240 270 L 260 230 L 290 220 L 320 240 L 340 270 L 330 310 L 300 330 L 270 325 L 250 305 Z",
    labelX: 295,
    labelY: 280,
    shortDesc: "Dynamic cosmopolitan Kannada enriched by vibrant street vocabulary and youthful expressions."
  },
];

export default function KarnatakaMap({ onRegionHover }) {
  const svgRef = useRef(null);
  const [activeRegion, setActiveRegion] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, region: null });

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll(".map-region-path");
    if (!paths || !paths.length) return;
    animate(paths, {
      opacity: [0, 0.88],
      scale: [0.94, 1],
      duration: 850,
      delay: stagger(120, { start: 250 }),
      ease: "outCubic",
    });
  }, []);

  const handleRegionEnter = (region, e) => {
    setActiveRegion(region.id);
    if (onRegionHover) onRegionHover(region);
    animate(`#region-${region.id}`, { opacity: 1, duration: 200, ease: "outQuad" });
    animate(`#label-${region.id}`, { scale: 1.18, duration: 200, ease: "outBack" });
    const rect = svgRef.current.getBoundingClientRect();
    setTooltip({ visible: true, x: e.clientX - rect.left, y: e.clientY - rect.top, region });
  };

  const handleRegionLeave = (region) => {
    setActiveRegion(null);
    if (onRegionHover) onRegionHover(null);
    animate(`#region-${region.id}`, { opacity: 0.88, duration: 250, ease: "outCubic" });
    animate(`#label-${region.id}`, { scale: 1, duration: 200, ease: "outQuad" });
    setTooltip({ visible: false, x: 0, y: 0, region: null });
  };

  const handleRegionClick = (region) => {
    animate(`#region-${region.id}`, { opacity: [1, 0.45, 1], duration: 350, ease: "inOutSine" });
  };

  return (
    <div className="karnataka-map-wrapper">
      <svg ref={svgRef} viewBox="0 0 420 480" className="karnataka-map-svg" aria-label="ಕರ್ನಾಟಕ ಪ್ರಾದೇಶಿಕ ನಕ್ಷೆ">
        <defs>
          <radialGradient id="mapBg" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#FEF9E7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FAF2E3" stopOpacity="0.25" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="420" height="480" fill="url(#mapBg)" rx="16" />

        {REGION_PATHS.map((region) => (
          <g key={region.id} className="map-region-group">
            <path d={region.d} fill={region.accentColor} opacity="0.12" transform="translate(3,5)" style={{ filter: "blur(5px)" }} />
            <path
              id={`region-${region.id}`}
              className="map-region-path"
              d={region.d}
              fill={region.accentColor}
              opacity="0"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinejoin="round"
              style={{ cursor: "pointer" }}
              onMouseEnter={(e) => handleRegionEnter(region, e)}
              onMouseLeave={() => handleRegionLeave(region)}
              onClick={() => handleRegionClick(region)}
            />
            <text
              id={`label-${region.id}`}
              x={region.labelX}
              y={region.labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              className="map-region-label kannada-text"
              style={{ pointerEvents: "none", fontSize: region.id === "karavali" || region.id === "malenadu" ? "8px" : "10px" }}
            >
              {region.nameKn}
            </text>
          </g>
        ))}

        <rect x="8" y="8" width="404" height="464" rx="12" fill="none" stroke="#C6282828" strokeWidth="1.5" strokeDasharray="8 4" />

        <g transform="translate(390, 458)">
          <circle cx="0" cy="0" r="10" fill="#FFF9ED" stroke="#E9E1D5" strokeWidth="1" />
          <text x="0" y="-4" textAnchor="middle" fontSize="6" fill="#C62828" fontWeight="bold">ಉ</text>
          <line x1="0" y1="-2" x2="0" y2="3" stroke="#C62828" strokeWidth="1.2" />
          <line x1="-3" y1="0" x2="3" y2="0" stroke="#575248" strokeWidth="0.8" />
        </g>
      </svg>

      {tooltip.visible && tooltip.region && (
        <div className="map-tooltip" style={{ left: tooltip.x + 14, top: tooltip.y - 56 }}>
          <span className="map-tooltip-kn kannada-text">{tooltip.region.nameKn}</span>
          <span className="map-tooltip-en">{tooltip.region.nameEn}</span>
          <Link to={`/regions/${tooltip.region.id}`} className="map-tooltip-cta">
            ಮಾಹಿತಿ ನೋಡಿ (Explore) →
          </Link>
        </div>
      )}

      <div className="map-legend">
        {REGION_PATHS.map((r) => (
          <div key={r.id} className={`map-legend-item ${activeRegion === r.id ? "active" : ""}`}>
            <span className="map-legend-dot" style={{ background: r.accentColor }} />
            <span className="map-legend-name kannada-text">{r.nameKn}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
