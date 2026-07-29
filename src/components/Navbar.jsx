import "./Navbar.css";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

function Navbar() {
  return (
    <header className="navbar">

      <a href="#hero" className="logo">
  <span className="logo-main">
    precious<span className="logo-dot">.</span>
  </span>

  <span className="logo-sub">
    ghl systems
  </span>
</a>

      <nav className="nav-center">

        <a href="#hero">Home</a>

        <a href="#about">About Me</a>

        <a href="#portfolio">Portfolio</a>

        <a href="#services">Services</a>

        <a href="#resume">Resume</a>

        <a href="#contact">Contact</a>

      </nav>

      <div className="nav-actions">

        <a
          href="https://wa.me/639123456789"
          className="whatsapp-btn"
          target="_blank"
          rel="noreferrer"
          aria-label="Contact me on WhatsApp"
        >
          <FaWhatsapp size={20} />
        </a>

        <a href="#contact" className="talk-btn">
          Let's Talk
          <ArrowRight size={17} />
        </a>

      </div>

    </header>
  );
}

export default Navbar;