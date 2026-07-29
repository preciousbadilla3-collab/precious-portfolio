import { useState } from "react";

import "./App.css";

import Intro from "./components/Intro";
import SiteAtmosphere from "./components/SiteAtmosphere";
import CustomCursor from "./components/CustomCursor";
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
  const [introDone, setIntroDone] = useState(() => {
    if (typeof window === "undefined") return false;

    const mobileOrTouch = window.matchMedia(
      "(max-width: 768px), (hover: none)"
    ).matches;

    let alreadySeen = false;

    try {
      alreadySeen = sessionStorage.getItem(
        "precious-portfolio-intro-seen"
      ) === "true";
    } catch {
      // The intro still works when browser storage is unavailable.
    }

    return mobileOrTouch || alreadySeen;
  });

  const finishIntro = () => {
    try {
      sessionStorage.setItem(
        "precious-portfolio-intro-seen",
        "true"
      );
    } catch {
      // Ignore storage restrictions in private/in-app browsers.
    }

    setIntroDone(true);
  };

  return (
    <>
      <CustomCursor />

      {/* The website stays behind the intro,
          so the nebula explosion can reveal it. */}

      <SiteAtmosphere />
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

      {!introDone && (
        <Intro
          finishIntro={finishIntro}
        />
      )}
    </>
  );
}

export default App;