import "./Navbar.css";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { whatsappHref } from "../config/siteConfig";
import { openBooking } from "../utils/openBooking";

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
      <a href="#hero" className="logo" aria-label="Precious portfolio home">
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
          href={whatsappHref}
          className="whatsapp-btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact Precious on WhatsApp"
        >
          <FaWhatsapp size={20} />
        </a>

        <a
          href="#booking"
          className="talk-btn"
          onClick={openBooking}
        >
          <span>Let's Talk</span>
          <ArrowRight size={17} />
        </a>
      </div>
    </header>
  );
}

export default Navbar;
