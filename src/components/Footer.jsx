import "./Footer.css";

import {
  ArrowUp,
  Mail,
  MapPin
} from "lucide-react";

import {
  FaLinkedinIn,
  FaWhatsapp
} from "react-icons/fa";

import {
  locationLabel,
  siteConfig,
  whatsappHref
} from "../config/siteConfig";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-main-row">
          <a href="#hero" className="footer-brand">
            <strong>
              Precious<span>.</span>
            </strong>

            <small>{siteConfig.role}</small>
          </a>

          <nav
            className="footer-nav"
            aria-label="Footer navigation"
          >
            <a href="#portfolio">Portfolio</a>
            <a href="#services">Services</a>
            <a href="#resume">Resume</a>
            <a href="#about">About Me</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="footer-socials">
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Email Precious"
            >
              <Mail size={17} />
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message Precious on WhatsApp"
            >
              <FaWhatsapp size={18} />
            </a>

            {siteConfig.linkedInUrl && (
              <a
                href={siteConfig.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Precious on LinkedIn"
              >
                <FaLinkedinIn size={16} />
              </a>
            )}
          </div>
        </div>

        <div className="footer-divider">
          <span></span>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}.
            All rights reserved.
          </p>

          <div className="footer-location">
            <MapPin size={13} />
            {locationLabel}
          </div>

          <button
            type="button"
            className="footer-top-button"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
