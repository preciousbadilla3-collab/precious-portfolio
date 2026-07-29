import { useEffect, useState } from "react";
import "./Navbar.css";
import { ArrowRight, Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const links = [
  ["#hero", "Home"],
  ["#about", "About Me"],
  ["#portfolio", "Portfolio"],
  ["#services", "Services"],
  ["#resume", "Resume"],
  ["#contact", "Contact"]
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth > 980) setMenuOpen(false);
    };

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("resize", closeOnResize);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("resize", closeOnResize);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${menuOpen ? "menu-open" : ""}`}>
      <a href="#hero" className="logo" onClick={closeMenu}>
        <span className="logo-main">
          precious<span className="logo-dot">.</span>
        </span>

        <span className="logo-sub">ghl systems</span>
      </a>

      <nav className={`nav-center ${menuOpen ? "mobile-open" : ""}`}>
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={closeMenu}>
            {label}
          </a>
        ))}

        <a
          href="#contact"
          className="mobile-menu-cta"
          onClick={closeMenu}
        >
          Let's Talk
          <ArrowRight size={17} />
        </a>
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

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={25} />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
