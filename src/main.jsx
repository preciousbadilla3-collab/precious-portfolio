import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./design-system.css";

import App from "./App.jsx";

/* Import last so it overrides section backgrounds */
import "./SiteFlow.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);