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

/* Keep fixed UI inside the visible mobile viewport, including
   in-app browsers whose visual viewport moves or resizes. */
const syncVisualViewport = () => {
  const viewport = window.visualViewport;

  if (!viewport) {
    document.documentElement.style.setProperty(
      "--visual-viewport-right",
      "0px"
    );
    document.documentElement.style.setProperty(
      "--visual-viewport-bottom",
      "0px"
    );
    document.documentElement.style.setProperty(
      "--visual-viewport-left",
      "0px"
    );
    return;
  }

  const rightOffset = Math.max(
    0,
    window.innerWidth - viewport.width - viewport.offsetLeft
  );
  const bottomOffset = Math.max(
    0,
    window.innerHeight - viewport.height - viewport.offsetTop
  );

  document.documentElement.style.setProperty(
    "--visual-viewport-right",
    `${rightOffset}px`
  );
  document.documentElement.style.setProperty(
    "--visual-viewport-bottom",
    `${bottomOffset}px`
  );
  document.documentElement.style.setProperty(
    "--visual-viewport-left",
    `${Math.max(0, viewport.offsetLeft)}px`
  );
};

syncVisualViewport();
window.visualViewport?.addEventListener("resize", syncVisualViewport);
window.visualViewport?.addEventListener("scroll", syncVisualViewport);
window.addEventListener("orientationchange", syncVisualViewport);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
