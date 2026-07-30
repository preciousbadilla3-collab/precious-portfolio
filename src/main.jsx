import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./design-system.css";

import App from "./App.jsx";

/* Import last so these files safely override component styling. */
import "./SiteFlow.css";
import "./MobileOptimizations.css";
import "./ViewportFixes.css";

const isTouchDevice =
  typeof window !== "undefined" &&
  (navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches);

document.documentElement.classList.toggle(
  "touch-device",
  isTouchDevice
);

const syncVisualViewport = () => {
  if (typeof window === "undefined") return;

  const visualViewport = window.visualViewport;

  const width = Math.round(
    visualViewport?.width ||
      document.documentElement.clientWidth ||
      window.innerWidth
  );

  const height = Math.round(
    visualViewport?.height || window.innerHeight
  );

  document.documentElement.style.setProperty(
    "--visual-viewport-width",
    `${Math.max(width, 1)}px`
  );

  document.documentElement.style.setProperty(
    "--visual-viewport-height",
    `${Math.max(height, 1)}px`
  );
};

syncVisualViewport();

window.addEventListener("resize", syncVisualViewport, {
  passive: true
});

window.addEventListener("orientationchange", syncVisualViewport, {
  passive: true
});

window.visualViewport?.addEventListener(
  "resize",
  syncVisualViewport,
  { passive: true }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
