import "./Hero.css";

import preciousPhoto
  from "../assets/precious.jpg";

import {
  ArrowRight,
  CheckCircle2,
  Sparkles
} from "lucide-react";

import { openBooking } from "../utils/openBooking";

function Hero() {
  return (
    <section
      className="hero hero-redesign"
      id="hero"
    >

      <div
        className="hero-scene"
        aria-hidden="true"
      >
        <span className="hero-scene-glow hero-glow-left"></span>

        <span className="hero-scene-glow hero-glow-right"></span>

        <span className="hero-orbit hero-orbit-one"></span>

        <span className="hero-orbit hero-orbit-two"></span>
      </div>

      <div className="hero-copy">

        <div className="hero-status">
          <span className="hero-status-dot"></span>

          Available for select projects — 2026
        </div>

        <h1 className="hero-headline">
          Turn curious clicks into
          <span>
            booked conversations.
          </span>
        </h1>

        <p className="hero-summary">
          I build GoHighLevel funnels,
          CRM pipelines, and automations
          that capture leads, follow up
          instantly, and keep every
          opportunity moving—without the
          manual chase.
        </p>

        <div className="hero-actions">

          <a
            href="#booking"
            className="hero-primary-button"
            onClick={openBooking}
          >
            Book a Discovery Call

            <ArrowRight size={18} />
          </a>

          <a
            href="#portfolio"
            className="hero-secondary-button"
          >
            View My Work
          </a>

        </div>

        <div className="hero-capabilities">

          <div className="hero-capability">
            <CheckCircle2 size={17} />

            <div>
              <small>01</small>
              <strong>
                Lead Capture
              </strong>
            </div>
          </div>

          <div className="hero-capability">
            <CheckCircle2 size={17} />

            <div>
              <small>02</small>
              <strong>
                Smart Follow-Up
              </strong>
            </div>
          </div>

          <div className="hero-capability">
            <CheckCircle2 size={17} />

            <div>
              <small>03</small>
              <strong>
                Client Pipelines
              </strong>
            </div>
          </div>

        </div>

      </div>

      <div className="hero-visual">

        <div className="hero-visual-label">
          <Sparkles size={14} />

          Systems, strategy &amp; design
        </div>

        <div className="hero-portrait-stage">

          <div
            className="hero-portrait-aura"
            aria-hidden="true"
          ></div>

          <div
            className="hero-portrait-outline"
            aria-hidden="true"
          ></div>

          <div className="hero-portrait-frame">

            <div className="hero-portrait">

              <img
                src={preciousPhoto}
                alt="Precious Badilla, GoHighLevel Systems Specialist"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                draggable="false"
              />

              <div
                className="hero-portrait-shade"
                aria-hidden="true"
              ></div>

            </div>

          </div>

          <div className="hero-float-card hero-card-one">

            <span></span>

            <div>
              <strong>
                CRM Systems
              </strong>

              <small>
                Lead capture &amp; pipeline
              </small>
            </div>

          </div>

          <div className="hero-float-card hero-card-two">

            <span></span>

            <div>
              <strong>
                Funnels
              </strong>

              <small>
                Landing pages &amp; offers
              </small>
            </div>

          </div>

          <div className="hero-float-card hero-card-three">

            <span></span>

            <div>
              <strong>
                Automations
              </strong>

              <small>
                Email &amp; workflows
              </small>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;