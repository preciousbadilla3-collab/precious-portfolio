import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Mail,
  PanelsTopLeft,
  Sparkles,
  Workflow
} from "lucide-react";

import "./Projects.css";
import { portfolioGroups } from "../data/portfolioProjects";


/* =========================================================
   ROTATING ARCHIVE CATEGORIES
========================================================= */

const categoryDetails = {
  funnels: {
    label: "Funnels",
    icon: PanelsTopLeft,
    description:
      "Conversion-focused digital journeys crafted to guide visitors from curiosity to action."
  },

  automations: {
    label: "Automations",
    icon: Workflow,
    description:
      "Connected workflows designed to respond faster, reduce repetitive work, and nurture every opportunity."
  }
};


/* =========================================================
   UPDATED PROJECT DATA
========================================================= */

const updatedPortfolioGroups = {
  ...portfolioGroups,

  /* =========================================================
     FUNNELS
  ========================================================= */

  funnels: [
    {
      number: "01",
      title: "BrightSmile Dental Clinic",
      kicker: "Dental Clinic Funnel",
      visualTitle: "A healthier smile starts here.",
      description:
        "A conversion-focused dental clinic funnel designed to build trust, showcase treatments, capture leads, and guide patients toward booking an appointment.",
      tags: [
        "Dental Funnel",
        "Lead Capture",
        "Appointment Booking"
      ],
      image: "/brightsmile-dental.png",
      liveUrl:
        "https://precious.myfreelanceportfolio.me/brightsmile-dental-clinic"
    },

    {
      number: "02",
      title: "Crownline Real Estate Funnel",
      kicker: "Real Estate Funnel",
      visualTitle: "Find your next move with confidence.",
      description:
        "A premium real estate lead generation funnel designed to showcase properties, build buyer trust, capture qualified inquiries, and guide prospects toward booking a consultation.",
      tags: [
        "Real Estate",
        "Lead Generation",
        "Consultation Booking"
      ],
      image: "/real-estate.png",
      liveUrl:
        "https://precious.myfreelanceportfolio.me/crownline-funnel"
    },

    {
      number: "03",
      title: "ELEVATE Free Growth Audit Funnel",
      kicker: "Free Audit Funnel",
      visualTitle: "Find the gaps slowing your growth.",
      description:
        "A conversion-focused free growth audit funnel designed for growing brands that want to improve their funnels, CRM, lead capture, follow-up, and booking process. The funnel guides visitors through common growth gaps and leads them toward requesting a free digital growth audit.",
      tags: [
        "Free Growth Audit",
        "Lead Generation",
        "Conversion Funnel"
      ],
      image: "/Free Audit.png",
      liveUrl:
        "https://precious.myfreelanceportfolio.me/landing-page"
    }
  ],

  /* =========================================================
     AUTOMATIONS
  ========================================================= */

  automations: [
    {
      number: "01",
      title: "Lead Follow-Up Automation",
      kicker: "Lead Follow-Up Workflow",
      visualTitle: "Every new lead gets a timely follow-up.",
      description:
        "A GoHighLevel lead follow-up workflow designed to respond to new inquiries automatically, organize contacts in the CRM, and send structured follow-up messages that keep leads engaged and move them closer to booking.",
      tags: [
        "Lead Follow-Up",
        "Email & SMS",
        "CRM Automation"
      ],
      video: "/automations/automation-01.mp4",
      image: "",
      liveUrl: ""
    },

    {
      number: "02",
      title: "Booking Confirmation Automation",
      kicker: "Booking Workflow",
      visualTitle: "A smoother experience after every booking.",
      description:
        "A GoHighLevel booking confirmation workflow designed to respond immediately when an appointment is scheduled, send clear confirmation details, organize the booking in the CRM, and keep both the business and client informed.",
      tags: [
        "Booking Confirmation",
        "Appointments",
        "GHL Workflow"
      ],
      video: "/automations/automation-02.mp4",
      image: "",
      liveUrl: ""
    },

    {
      number: "03",
      title: "No-Show Recovery Automation",
      kicker: "No-Show Workflow",
      visualTitle: "Turn missed appointments into another opportunity.",
      description:
        "A GoHighLevel no-show recovery workflow designed to follow up after a missed appointment, encourage rebooking, and continue structured follow-up so missed appointments have another chance to become active opportunities.",
      tags: [
        "No-Show Recovery",
        "Rebooking",
        "Follow-Up Automation"
      ],
      video: "/automations/automation-03.mp4",
      image: "",
      liveUrl: ""
    }
  ],

  /* =========================================================
     EMAIL MARKETING
  ========================================================= */

  email: [
    {
      number: "01",
      title: "Cosmetic Clinic Promotional Campaign",
      kicker: "Promotional Email",
      visualTitle: "Premium care, beautifully presented.",
      description:
        "An elegant promotional email concept designed for a cosmetic clinic, combining premium treatment presentation, clear benefits, limited appointment messaging, and a focused booking call to action.",
      tags: [
        "Cosmetic Clinic",
        "Promotional Email",
        "Booking CTA"
      ],
      image: "/email/cosmetic.png",
      liveUrl: ""
    },

    {
      number: "02",
      title: "Furniture Collection Campaign",
      kicker: "E-Commerce Email",
      visualTitle: "Designed for spaces worth living in.",
      description:
        "A polished furniture marketing email designed to showcase featured pieces through strong visual hierarchy, lifestyle-focused presentation, and clear product calls to action.",
      tags: [
        "Furniture",
        "E-Commerce",
        "Product Campaign"
      ],
      image: "/email/furniture.png",
      liveUrl: ""
    },

    {
      number: "03",
      title: "SaaS Welcome Campaign",
      kicker: "Welcome Email",
      visualTitle: "A stronger start from the first email.",
      description:
        "A professional B2B welcome email concept created to introduce a SaaS platform, guide new users toward activation, highlight key features, and encourage the next step.",
      tags: [
        "SaaS",
        "Welcome Email",
        "B2B"
      ],
      image: "/email/Saas.png",
      liveUrl: ""
    },

    {
      number: "04",
      title: "Real Estate Email Campaign",
      kicker: "Lead Nurture Email",
      visualTitle: "Your next move starts here.",
      description:
        "A premium real estate email concept created to capture buyer attention, present opportunities clearly, build confidence, and encourage consultation inquiries.",
      tags: [
        "Real Estate",
        "Lead Nurture",
        "Consultation"
      ],
      image: "/email/real estate.png",
      liveUrl: ""
    },

    {
      number: "05",
      title: "Facial Treatment Campaign",
      kicker: "Treatment Promotion",
      visualTitle: "A refined approach to radiant skin.",
      description:
        "A clean and sophisticated facial treatment email concept designed to introduce the service, communicate realistic benefits, create appointment interest, and guide readers toward booking.",
      tags: [
        "Beauty",
        "Facial Treatment",
        "Email Design"
      ],
      image: "/email/Facial.png",
      liveUrl: ""
    }
  ]
};


/* =========================================================
   FUNNEL + AUTOMATION VISUAL
========================================================= */

function ProjectVisual({ category, project }) {

  /* =========================================================
     REAL VIDEO PROJECT
  ========================================================= */

  if (project.video) {
    return (
      <div className="archive-project-video-wrap">

        <video
          className="archive-project-video"
          src={project.video}
          controls
          playsInline
          preload="metadata"
          onClick={(event) =>
            event.stopPropagation()
          }
        >
          Your browser does not support HTML video.
        </video>

      </div>
    );
  }


  /* =========================================================
     REAL PROJECT IMAGE
  ========================================================= */

  if (project.image) {
    return (
      <img
        className="archive-project-image"
        src={project.image}
        alt={`${project.title} preview`}
        loading="lazy"
        decoding="async"
      />
    );
  }


  /* =========================================================
     FUNNEL PLACEHOLDER
  ========================================================= */

  if (category === "funnels") {
    return (
      <div className="visual-funnel">

        <div className="visual-funnel-nav">

          <strong>PB</strong>

          <div>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <button type="button">
            Book Now
          </button>

        </div>


        <div className="visual-funnel-body">

          <div className="visual-funnel-copy">

            <small>
              {project.kicker}
            </small>

            <h4>
              {project.visualTitle}
            </h4>

            <p>
              A refined digital experience designed
              with clarity, confidence, and conversion
              in mind.
            </p>

            <span className="visual-funnel-button">
              Get Started
            </span>

          </div>


          <div className="visual-funnel-art">
            <div className="visual-art-orbit"></div>
            <div className="visual-art-card"></div>
            <div className="visual-art-glow"></div>
          </div>

        </div>


        <div className="visual-funnel-stats">
          <span>Strategy</span>
          <span>Design</span>
          <span>Conversion</span>
        </div>

      </div>
    );
  }


  /* =========================================================
     AUTOMATION PLACEHOLDER
  ========================================================= */

  return (
    <div className="visual-automation">

      <div className="visual-automation-header">

        <div>
          <span className="automation-live-dot"></span>
          Active Workflow
        </div>

        <small>
          {project.kicker}
        </small>

      </div>


      <div className="visual-workflow">

        <div className="visual-workflow-node trigger">

          <small>
            Trigger
          </small>

          <strong>
            New Lead Captured
          </strong>

        </div>


        <div className="visual-workflow-line">
          <span></span>
        </div>


        <div className="visual-workflow-row">

          <div className="visual-workflow-node">

            <small>
              Step 01
            </small>

            <strong>
              Create Contact
            </strong>

          </div>


          <div className="visual-workflow-node highlighted">

            <small>
              Step 02
            </small>

            <strong>
              Send Message
            </strong>

          </div>

        </div>


        <div className="visual-workflow-line">
          <span></span>
        </div>


        <div className="visual-workflow-node final">

          <small>
            Complete
          </small>

          <strong>
            Move Opportunity
          </strong>

        </div>

      </div>


      <div className="visual-automation-footer">

        <span>
          Workflow active
        </span>

        <strong>
          100%
        </strong>

      </div>

    </div>
  );
}

/* =========================================================
   EMAIL MARKETING — CAMPAIGN VAULT
========================================================= */

function EmailMarketingShowcase() {
  const emailProjects =
    updatedPortfolioGroups.email || [];

  const [selectedEmailIndex, setSelectedEmailIndex] =
    useState(null);

  const [mobileExpandedIndex, setMobileExpandedIndex] =
    useState(null);

  const [openedEmail, setOpenedEmail] =
    useState(null);

  const [emailZoom, setEmailZoom] =
    useState(1);

  const selectedEmail =
    selectedEmailIndex !== null
      ? emailProjects[selectedEmailIndex]
      : null;


  /* =========================================================
     RESET FULLSCREEN ZOOM
  ========================================================= */

  useEffect(() => {
    if (openedEmail) {
      setEmailZoom(1);
    }
  }, [openedEmail]);


  /* =========================================================
     FULLSCREEN VIEWER
  ========================================================= */

  useEffect(() => {
    if (!openedEmail) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpenedEmail(null);
      }
    };

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        originalOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [openedEmail]);


  return (
    <>

      <section className="pentagon-email">

        {/* ===================================================
            SECTION META — SHARED BY DESKTOP + MOBILE
        =================================================== */}

        <div className="pentagon-email-topline">

          <div className="pentagon-email-eyebrow">
            <Mail size={14} />
            Email Marketing
          </div>

          <span>
            04 / CAMPAIGNS
          </span>

        </div>


        {/* ===================================================
            DESKTOP / TABLET — PENTAGON EXPERIENCE
        =================================================== */}

        <div className="pentagon-desktop-layout">

          <div
            className={`pentagon-email-stage ${
              selectedEmail
                ? "has-selected-email"
                : ""
            }`}
          >

            <div className="pentagon-email-glow"></div>


            {/* Animated transparent pentagon line */}

            <svg
              className="pentagon-email-trace"
              viewBox="0 0 760 700"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="pentagonTraceGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="rgba(155, 42, 83, 0.18)"
                  />
                  <stop
                    offset="45%"
                    stopColor="rgba(231, 111, 153, 0.9)"
                  />
                  <stop
                    offset="100%"
                    stopColor="rgba(155, 42, 83, 0.18)"
                  />
                </linearGradient>

                <filter
                  id="pentagonTraceGlow"
                  x="-30%"
                  y="-30%"
                  width="160%"
                  height="160%"
                >
                  <feGaussianBlur
                    stdDeviation="5"
                    result="blur"
                  />
                </filter>
              </defs>

              <polygon
                className="pentagon-trace-glow"
                points="380,30 720,275 590,650 170,650 40,275"
              />

              <polygon
                className="pentagon-trace-line"
                points="380,30 720,275 590,650 170,650 40,275"
              />
            </svg>


            {/* =================================================
                CENTER TITLE
            ================================================= */}

            <div
              className={`pentagon-email-center ${
                selectedEmail
                  ? "is-hidden"
                  : ""
              }`}
            >

              <span>
                SELECTED EMAIL WORK
              </span>

              <h2>
                <span className="pentagon-email-title-line">
                  Email Marketing
                </span>

                <strong>
                  Designs.
                </strong>
              </h2>

              <p>
                Hover to preview.
                <br />
                Click a campaign to reveal.
              </p>

            </div>


            {/* =================================================
                FIVE DESKTOP CAMPAIGNS
            ================================================= */}

            {emailProjects.map(
              (project, index) => {

                const isSelected =
                  selectedEmailIndex === index;

                return (

                  <div
                    key={`pentagon-email-${project.number}`}
                    className={`
                      pentagon-mail-node
                      pentagon-mail-position-${index + 1}
                      ${isSelected ? "is-selected" : ""}
                    `}
                    onClick={() => {
                      if (!isSelected) {
                        setSelectedEmailIndex(index);
                      }
                    }}
                    onKeyDown={(event) => {
                      if (
                        !isSelected &&
                        (
                          event.key === "Enter" ||
                          event.key === " "
                        )
                      ) {
                        event.preventDefault();
                        setSelectedEmailIndex(index);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isSelected}
                    aria-label={
                      isSelected
                        ? `${project.title} is open`
                        : `Open ${project.title}`
                    }
                  >

                    <div
                      className={`pentagon-mail-object ${
                        isSelected ? "is-open" : ""
                      }`}
                    >

                      {/* REAL EMAIL DESIGN */}

                      <div
                        className={`pentagon-mail-preview ${
                          isSelected ? "is-open" : ""
                        }`}
                      >

                        {project.image ? (

                          <img
                            src={project.image}
                            alt={`${project.title} email design preview`}
                            loading="lazy"
                            decoding="async"
                          />

                        ) : (

                          <div className="pentagon-mail-placeholder">

                            <small>
                              {project.kicker}
                            </small>

                            <strong>
                              {project.visualTitle}
                            </strong>

                          </div>

                        )}


                        {isSelected && (

                          <button
                            type="button"
                            className="pentagon-view-email"
                            onClick={(event) => {
                              event.stopPropagation();
                              setOpenedEmail(project);
                            }}
                          >

                            View Email Design

                            <ArrowUpRight
                              size={16}
                            />

                          </button>

                        )}

                      </div>


                      {/* TRANSPARENT ENVELOPE BODY */}

                      <div className="pentagon-envelope-base"></div>

                      <div className="pentagon-envelope-panel pentagon-panel-top"></div>

                      <div className="pentagon-envelope-panel pentagon-panel-left"></div>

                      <div className="pentagon-envelope-panel pentagon-panel-right"></div>

                      <div className="pentagon-envelope-panel pentagon-panel-bottom"></div>


                      {!isSelected && (

                        <div className="pentagon-envelope-icon">
                          <Mail size={25} />
                        </div>

                      )}

                    </div>


                    {/* CAMPAIGN LABEL */}

                    <div className="pentagon-mail-label">

                      <span>
                        CAMPAIGN
                      </span>

                      <strong>
                        {project.number}
                      </strong>

                      <small>
                        {project.kicker}
                      </small>

                    </div>


                    {/* CLOSE CENTER REVEAL */}

                    {isSelected && (

                      <button
                        type="button"
                        className="pentagon-mail-close"
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedEmailIndex(null);
                        }}
                        aria-label="Close campaign preview"
                      >
                        ×
                      </button>

                    )}

                  </div>

                );
              }
            )}


            {/* =================================================
                SELECTED PROJECT TITLE
            ================================================= */}

            {selectedEmail && (

              <div
                className="pentagon-selected-info"
                key={`pentagon-info-${selectedEmail.number}`}
              >

                <span>
                  {selectedEmail.kicker}
                  {" · "}
                  {selectedEmail.number}
                </span>

                <h3>
                  {selectedEmail.title}
                </h3>

              </div>

            )}

          </div>


          {/* DESKTOP MICRO FOOTER */}

          {!selectedEmail && (

            <div className="pentagon-email-footer">

              <span>01</span>

              <i></i>

              <p>
                Five campaigns.
                Five industries.
                One intentional approach to email design.
              </p>

              <i></i>

              <span>05</span>

            </div>

          )}

        </div>


        {/* ===================================================
            MOBILE — STACKED EMAIL EXPERIENCE
            Pentagon is intentionally replaced on small screens.
        =================================================== */}

        <div className="mobile-email-stack">

          <div className="mobile-email-stack-heading">

            <span>
              SELECTED EMAIL WORK
            </span>

            <h2>
              Email Marketing
              <strong>Designs.</strong>
            </h2>

            <p>
              Tap a campaign to preview the design.
            </p>

          </div>


          <div
            className={`mobile-email-stack-list ${
              mobileExpandedIndex !== null
                ? "has-expanded"
                : ""
            }`}
          >

            {emailProjects.map(
              (project, index) => {

                const isExpanded =
                  mobileExpandedIndex === index;

                return (

                  <article
                    key={`mobile-email-${project.number}`}
                    className={`
                      mobile-email-stack-card
                      mobile-email-stack-card-${index + 1}
                      ${isExpanded ? "is-expanded" : ""}
                    `}
                  >

                    <button
                      type="button"
                      className="mobile-email-stack-trigger"
                      onClick={() => {
                        setMobileExpandedIndex(
                          isExpanded ? null : index
                        );
                      }}
                      aria-expanded={isExpanded}
                      aria-controls={`mobile-email-reveal-${project.number}`}
                    >

                      <span className="mobile-email-stack-icon">
                        <Mail size={24} />
                      </span>

                      <span className="mobile-email-stack-copy">

                        <small>
                          CAMPAIGN {project.number}
                        </small>

                        <strong>
                          {project.kicker}
                        </strong>

                        <span>
                          {project.title}
                        </span>

                      </span>

                      <span
                        className="mobile-email-stack-toggle"
                        aria-hidden="true"
                      >
                        {isExpanded ? "−" : "+"}
                      </span>

                    </button>


                    <div
                      id={`mobile-email-reveal-${project.number}`}
                      className="mobile-email-stack-reveal"
                    >

                      <div className="mobile-email-stack-preview">

                        {project.image ? (

                          <img
                            src={project.image}
                            alt={`${project.title} email design preview`}
                            loading="lazy"
                            decoding="async"
                          />

                        ) : (

                          <div className="mobile-email-stack-placeholder">
                            {project.visualTitle}
                          </div>

                        )}

                        <div className="mobile-email-stack-preview-shade"></div>

                      </div>


                      <button
                        type="button"
                        className="mobile-email-stack-view"
                        onClick={() =>
                          setOpenedEmail(project)
                        }
                      >

                        View Email Design

                        <ArrowUpRight size={16} />

                      </button>

                    </div>

                  </article>

                );
              }
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          FULLSCREEN SCROLLABLE EMAIL VIEWER
      ===================================================== */}

      {openedEmail &&
        createPortal(

          <div
            className="email-viewer-overlay"
            onClick={() =>
              setOpenedEmail(null)
            }
            role="dialog"
            aria-modal="true"
            aria-label={`${openedEmail.title} email design preview`}
          >

            <button
              type="button"
              className="email-viewer-close"
              onClick={(event) => {
                event.stopPropagation();
                setOpenedEmail(null);
              }}
              aria-label="Close email preview"
            >
              ×
            </button>


            <div
              className="email-viewer-shell"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div className="email-viewer-scroll">

                <img
                  src={openedEmail.image}
                  alt={`${openedEmail.title} full email design`}
                  style={{
                    width: `${emailZoom * 100}%`,
                    maxWidth: "none",
                    height: "auto",
                    display: "block"
                  }}
                />

              </div>

            </div>


            <div
              className="email-viewer-zoom"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <button
                type="button"
                onClick={() =>
                  setEmailZoom(
                    (current) =>
                      Math.min(
                        current + 0.15,
                        1.75
                      )
                  )
                }
                aria-label="Zoom in"
              >
                +
              </button>


              <button
                type="button"
                onClick={() =>
                  setEmailZoom(
                    (current) =>
                      Math.max(
                        current - 0.15,
                        0.7
                      )
                  )
                }
                aria-label="Zoom out"
              >
                −
              </button>

            </div>

          </div>,

          document.body
        )}

    </>
  );
}


/* =========================================================
   MAIN PROJECTS
========================================================= */

function Projects() {
  const [activeCategory, setActiveCategory] =
    useState("funnels");

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [rotationPaused, setRotationPaused] =
    useState(false);


  const projects =
    updatedPortfolioGroups[activeCategory];

  const activeProject =
    projects[activeIndex];

  const currentCategory =
    categoryDetails[activeCategory];

  const CategoryIcon =
    currentCategory.icon;


  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);


  useEffect(() => {
    if (
      rotationPaused ||
      activeCategory === "automations"
    ) {
      return undefined;
    }

    const interval =
      window.setInterval(() => {

        setActiveIndex(
          (current) =>
            (current + 1) %
            projects.length
        );

      }, 6500);


    return () =>
      window.clearInterval(interval);

  }, [
    activeCategory,
    projects.length,
    rotationPaused
  ]);


  const showNext = () => {
    setActiveIndex(
      (current) =>
        (current + 1) %
        projects.length
    );
  };


  const showPrevious = () => {
    setActiveIndex(
      (current) =>
        (current - 1 + projects.length) %
        projects.length
    );
  };


  const getCardPosition = (index) => {
    const total =
      projects.length;

    const difference =
      (index - activeIndex + total) %
      total;

    if (difference === 0) {
      return "active";
    }

    if (difference === 1) {
      return "next";
    }

    if (difference === total - 1) {
      return "previous";
    }

    return "hidden";
  };


  return (
    <section
      className="projects"
      id="portfolio"
    >

      <span
        id="projects"
        className="projects-anchor"
        aria-hidden="true"
      ></span>


      <div className="projects-inner">


        {/* =================================================
            CRIMSON ARCHIVE HEADER
        ================================================= */}

        <header className="projects-header">

          <div className="projects-eyebrow">
            <Sparkles size={14} />
            Selected Work
          </div>


          <div className="projects-heading-row">

            <div>

              <p className="projects-index">
                03 / PORTFOLIO
              </p>

              <h2>
                The Crimson
                <span> Archive.</span>
              </h2>

            </div>


            <p>
              An evolving collection of funnels,
              workflows, and campaigns designed to
              make every digital interaction feel
              clearer, smoother, and more intentional.
            </p>

          </div>

        </header>


        {/* =================================================
            FUNNEL / AUTOMATION TABS
        ================================================= */}

        <div className="project-categories">

          {Object.entries(
            categoryDetails
          ).map(
            ([categoryKey, category]) => {

              const Icon =
                category.icon;

              const isActive =
                activeCategory ===
                categoryKey;


              return (
                <button
                  key={categoryKey}
                  type="button"
                  className={
                    isActive
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveCategory(
                      categoryKey
                    )
                  }
                  aria-pressed={isActive}
                  aria-label={`Show ${category.label} projects`}
                >

                  <Icon size={17} />

                  <span className="category-label">
                    {category.label}
                  </span>

                </button>
              );

            }
          )}

        </div>


        <div className="archive-introduction">

          <div>

            <CategoryIcon size={17} />

            <span>
              {currentCategory.label}
            </span>

          </div>


          <p>
            {currentCategory.description}
          </p>

        </div>


        {/* =================================================
            ROTATING PROJECT CAROUSEL
        ================================================= */}

        <div
          className="projects-carousel"
          tabIndex={0}
          onMouseEnter={() =>
            setRotationPaused(true)
          }
          onMouseLeave={() =>
            setRotationPaused(false)
          }
          onFocus={() =>
            setRotationPaused(true)
          }
          onBlur={() =>
            setRotationPaused(false)
          }
          onKeyDown={(event) => {

            if (
              event.key === "ArrowRight"
            ) {
              showNext();
            }

            if (
              event.key === "ArrowLeft"
            ) {
              showPrevious();
            }

          }}
        >


          <div className="archive-stage-glow"></div>

          <div className="archive-stage-orbit orbit-one"></div>

          <div className="archive-stage-orbit orbit-two"></div>


          <div className="archive-project-counter">

            <span>
              {String(
                activeIndex + 1
              ).padStart(2, "0")}
            </span>

            <i></i>

            <small>
              {String(
                projects.length
              ).padStart(2, "0")}
            </small>

          </div>


          <div className="archive-cards">

            {projects.map(
              (project, index) => {

                const position =
                  getCardPosition(index);

                const isActive =
                  position === "active";


                return (
                  <article
                    key={`${activeCategory}-${project.number}`}
                    className={`archive-card ${position}`}
                    onClick={() => {

                      if (!isActive) {
                        setActiveIndex(index);
                        return;
                      }

                      if (project.liveUrl) {
                        window.open(
                          project.liveUrl,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }

                    }}
                    aria-hidden={!isActive}
                  >


                    <div className="archive-card-shell">


                      <div className="archive-card-topbar">

                        <div className="archive-card-dots">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>


                        <small>
                          precious-portfolio /{" "}
                          {activeCategory}
                        </small>


                        <span>
                          {project.number}
                        </span>

                      </div>


                      <div className="archive-card-visual">

                        <ProjectVisual
                          category={
                            activeCategory
                          }
                          project={project}
                        />

                        <div className="archive-card-shine"></div>

                        <div className="archive-project-badge">
                          {project.kicker}
                        </div>

                      </div>


                      <div className="archive-mobile-details">

                        <span className="archive-mobile-kicker">
                          {project.kicker}
                          {" · "}
                          {project.number}
                        </span>


                        <h3>
                          {project.title}
                        </h3>


                        <p>
                          {project.description}
                        </p>


                        <div className="archive-mobile-tags">

                          {(project.tags || []).map(
                            (tag) => (
                              <span key={tag}>
                                {tag}
                              </span>
                            )
                          )}

                        </div>


                        {project.liveUrl ? (

                          <a
                            href={
                              project.liveUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="archive-mobile-link"
                            onClick={(event) =>
                              event.stopPropagation()
                            }
                          >
                            View Live Project

                            <ArrowUpRight size={17} />
                          </a>

                        ) : (

                          <span className="archive-mobile-link archive-mobile-link-disabled">
                            Project preview coming soon
                          </span>

                        )}

                      </div>

                    </div>

                  </article>
                );

              }
            )}

          </div>


          <button
            type="button"
            className="archive-arrow archive-arrow-left"
            onClick={showPrevious}
            aria-label="Previous project"
          >
            <ArrowLeft size={21} />
          </button>


          <button
            type="button"
            className="archive-arrow archive-arrow-right"
            onClick={showNext}
            aria-label="Next project"
          >
            <ArrowRight size={21} />
          </button>


        </div>


        {/* =================================================
            ACTIVE PROJECT DETAILS
        ================================================= */}

        <div
          className="archive-details"
          key={`${activeCategory}-${activeIndex}`}
        >


          <div className="archive-details-main">

            <span>
              {activeProject.kicker}
              {" · "}
              {activeProject.number}
            </span>


            <h3>
              {activeProject.title}
            </h3>


            <p>
              {activeProject.description}
            </p>

          </div>


          <div className="archive-details-side">


            <div className="archive-tags">

              {(activeProject.tags || []).map(
                (tag) => (
                  <span key={tag}>
                    {tag}
                  </span>
                )
              )}

            </div>


            {activeProject.liveUrl ? (

              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                View Live Project

                <ArrowUpRight size={17} />
              </a>

            ) : (

              <span className="archive-link-placeholder">
                Live preview coming soon
              </span>

            )}

          </div>

        </div>


        {/* =================================================
            CAROUSEL DOTS
        ================================================= */}

        <div className="archive-pagination">

          {projects.map(
            (project, index) => (
              <button
                key={project.number}
                type="button"
                className={
                  index === activeIndex
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveIndex(index)
                }
                aria-label={`Show project ${index + 1}`}
              >
                <span></span>
              </button>
            )
          )}

        </div>


        {/* =================================================
            EMAIL MARKETING
        ================================================= */}

        <EmailMarketingShowcase />


      </div>

    </section>
  );
}

export default Projects;