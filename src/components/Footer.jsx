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

const EMAIL_ADDRESS = "preciousbadilla3@gmail.com";
const WHATSAPP_NUMBER = "+639910139615";

/* Replace this with your real LinkedIn link */
const LINKEDIN_URL = "https://www.linkedin.com/";

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

          {/* Brand */}
          <a href="#hero" className="footer-brand">
            <strong>
              Precious<span>.</span>
            </strong>

            <small>
              GoHighLevel Systems Specialist
            </small>
          </a>

          {/* Navigation */}
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

          {/* Social links */}
          <div className="footer-socials">

            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              aria-label="Email Precious"
            >
              <Mail size={17} />
            </a>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Message Precious on WhatsApp"
            >
              <FaWhatsapp size={18} />
            </a>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Precious on LinkedIn"
            >
              <FaLinkedinIn size={16} />
            </a>

          </div>

        </div>

        <div className="footer-divider">
          <span></span>
        </div>

        <div className="footer-bottom">

          <p>
            © {new Date().getFullYear()} Precious Badilla.
            All rights reserved.
          </p>

          <div className="footer-location">
            <MapPin size={13} />
            Palawan, Philippines · Available remotely
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