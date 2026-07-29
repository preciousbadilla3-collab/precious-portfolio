import "./Navbar.css";
import { ArrowRight } from "lucide-react";
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
  return (
    <header className="navbar">
      <a href="#hero" className="logo">
        <span className="logo-main">
          precious<span className="logo-dot">.</span>
        </span>
        <span className="logo-sub">ghl systems</span>
      </a>

      <nav className="nav-center" aria-label="Primary navigation">
        {links.map(([href, label]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
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
          <span>Let's Talk</span>
          <ArrowRight size={17} />
        </a>
      </div>
    </header>
  );
}

export default Navbar;
