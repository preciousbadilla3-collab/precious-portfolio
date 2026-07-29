import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./design-system.css";

import App from "./App.jsx";

/* Import last so these files can safely override component styling. */
import "./SiteFlow.css";
import "./MobileOptimizations.css";
import "./ViewportFixes.css";

const isTouchDevice =
  typeof navigator !== "undefined" &&
  (navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches);

document.documentElement.classList.toggle(
  "touch-device",
  isTouchDevice
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
