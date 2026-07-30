import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./design-system.css";

import App from "./App.jsx";

/* Imported last so the clean mobile rules override component CSS. */
import "./SiteFlow.css";
import "./MobileOptimizations.css";
import "./ViewportFixes.css";

const isTouchDevice =
  typeof window !== "undefined" &&
  (navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse), (hover: none)").matches);

document.documentElement.classList.toggle(
  "touch-device",
  isTouchDevice
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
