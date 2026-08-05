import "./Contact.css";

import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Mail,
  MapPin,
  Sparkles
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

import {
  bookingHref,
  hasBookingLink,
  locationLabel,
  siteConfig,
  whatsappHref
} from "../config/siteConfig";

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <div className="contact-intro">
          <div className="contact-availability">
            <span className="availability-dot"></span>
            Now accepting select projects
          </div>

          <p className="contact-index">05 / CONTACT</p>

          <h2 className="contact-title">
            Let’s build a system that feels
            <span> as refined as your vision.</span>
          </h2>

          <p className="contact-description">
            Whether you need a funnel, CRM structure, automation
            workflow, or a complete GoHighLevel setup, we can begin
            with a focused conversation about what your business
            truly needs.
          </p>

          <div className="contact-channels">
            <a
              href={`mailto:${siteConfig.email}`}
              className="contact-channel"
            >
              <span className="contact-channel-icon">
                <Mail size={19} />
              </span>

              <span className="contact-channel-copy">
                <small>Email</small>
                <strong>{siteConfig.email}</strong>
              </span>

              <ArrowUpRight
                size={17}
                className="contact-channel-arrow"
              />
            </a>

            <a
              href={whatsappHref}
              className="contact-channel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-channel-icon whatsapp">
                <FaWhatsapp size={20} />
              </span>

              <span className="contact-channel-copy">
                <small>WhatsApp</small>
                <strong>Message me directly</strong>
              </span>

              <ArrowUpRight
                size={17}
                className="contact-channel-arrow"
              />
            </a>

            <div className="contact-channel contact-location">
              <span className="contact-channel-icon">
                <MapPin size={19} />
              </span>

              <span className="contact-channel-copy">
                <small>Location</small>
                <strong>{locationLabel}</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="contact-session">
          <div
            className="contact-session-light"
            aria-hidden="true"
          ></div>

          <div className="contact-session-header">
            <div className="contact-session-label">
              <span></span>
              Strategy Session
            </div>

            <div className="contact-session-number">
              01 / DISCOVERY
            </div>
          </div>

          <div className="contact-session-icon">
            <Calendar size={24} />
          </div>

          <h3>
            Begin with a focused
            <span> discovery call.</span>
          </h3>

          <p className="contact-session-description">
            No pressure and no complicated sales pitch—just an
            honest conversation about your goals, current challenges,
            and the system that could move your business forward.
          </p>

          <div className="contact-session-points">
            <div className="contact-session-point">
              <CheckCircle2 size={19} />

              <span>
                <strong>Your current bottleneck</strong>
                <small>
                  Identify the process taking too much time or
                  preventing leads from moving forward.
                </small>
              </span>
            </div>

            <div className="contact-session-point">
              <CheckCircle2 size={19} />

              <span>
                <strong>The right system</strong>
                <small>
                  Determine whether you need a funnel, CRM,
                  automation, AI agent, or connected solution.
                </small>
              </span>
            </div>

            <div className="contact-session-point">
              <CheckCircle2 size={19} />

              <span>
                <strong>A clear next-step plan</strong>
                <small>
                  Leave the conversation with a clearer direction
                  for your project.
                </small>
              </span>
            </div>
          </div>

          <a
            href={bookingHref}
            className="contact-book-button"
            target={hasBookingLink ? "_blank" : undefined}
            rel={hasBookingLink ? "noopener noreferrer" : undefined}
          >
            <Calendar size={19} />
            <span>Book a Discovery Call</span>
            <ArrowUpRight size={19} />
          </a>

          <div className="contact-session-note">
            <Sparkles size={13} />
            30-minute complimentary strategy session
          </div>
        </div>
      </div>

      <div className="contact-signature" aria-hidden="true">
        <span>CRM Systems</span>
        <i></i>
        <span>Funnels</span>
        <i></i>
        <span>Automations</span>
        <i></i>
        <span>AI Agents</span>
      </div>
    </section>
  );
}

export default Contact;
