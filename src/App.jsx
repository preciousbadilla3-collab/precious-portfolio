import { useState } from "react";

import "./App.css";

import Intro from "./components/Intro";
import CustomCursor from "./components/CustomCursor";
import SiteAtmosphere from "./components/SiteAtmosphere";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import SystemShowcase from "./components/SystemShowcase";
import Projects from "./components/Projects";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingChat from "./components/FloatingChat";

function App() {
  const [isTouchDevice] = useState(() => {
    if (typeof window === "undefined") return false;

    return window.matchMedia(
      "(max-width: 768px), (hover: none), (pointer: coarse)"
    ).matches;
  });

  const [introDone, setIntroDone] = useState(() => {
    if (typeof window === "undefined") return false;

    let alreadySeen = false;

    try {
      alreadySeen =
        sessionStorage.getItem("precious-portfolio-intro-seen") ===
        "true";
    } catch {
      // Continue normally if storage is unavailable.
    }

    return isTouchDevice || alreadySeen;
  });

  const finishIntro = () => {
    try {
      sessionStorage.setItem(
        "precious-portfolio-intro-seen",
        "true"
      );
    } catch {
      // Ignore storage restrictions in private or in-app browsers.
    }

    setIntroDone(true);
  };

  return (
    <>
      <SiteAtmosphere />

      {!isTouchDevice && <CustomCursor />}

      <Navbar />

      <main>
        <Hero />
        <About />
        <SystemShowcase />
        <Projects />
        <Process />
        <Contact />
      </main>

      <Footer />
      <FloatingChat />

      {!introDone && <Intro finishIntro={finishIntro} />}
    </>
  );
}

export default App;