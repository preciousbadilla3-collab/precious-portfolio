import { useEffect, useState } from "react";
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
  },

  email: {
    label: "Email Marketing",
    icon: Mail,
    description:
      "Intentional email experiences that build trust, strengthen relationships, and encourage meaningful action."
  }
};

/* =========================================================
   PORTFOLIO PROJECT OVERRIDES
   BrightSmile is now Funnel Project 01
========================================================= */

const updatedPortfolioGroups = {
  ...portfolioGroups,

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

  ...portfolioGroups.funnels.slice(2)
]
};

function ProjectVisual({ category, project }) {
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
            <small>{project.kicker}</small>

            <h4>{project.visualTitle}</h4>

            <p>
              A refined digital experience designed with clarity,
              confidence, and conversion in mind.
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

  if (category === "automations") {
    return (
      <div className="visual-automation">

        <div className="visual-automation-header">
          <div>
            <span className="automation-live-dot"></span>
            Active Workflow
          </div>

          <small>{project.kicker}</small>
        </div>

        <div className="visual-workflow">

          <div className="visual-workflow-node trigger">
            <small>Trigger</small>
            <strong>New Lead Captured</strong>
          </div>

          <div className="visual-workflow-line">
            <span></span>
          </div>

          <div className="visual-workflow-row">

            <div className="visual-workflow-node">
              <small>Step 01</small>
              <strong>Create Contact</strong>
            </div>

            <div className="visual-workflow-node highlighted">
              <small>Step 02</small>
              <strong>Send Message</strong>
            </div>

          </div>

          <div className="visual-workflow-line">
            <span></span>
          </div>

          <div className="visual-workflow-node final">
            <small>Complete</small>
            <strong>Move Opportunity</strong>
          </div>

        </div>

        <div className="visual-automation-footer">
          <span>Workflow active</span>
          <strong>100%</strong>
        </div>

      </div>
    );
  }

  return (
    <div className="visual-email">

      <div className="visual-email-sidebar">
        <strong>PB</strong>

        <span className="active"></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="visual-email-main">

        <div className="visual-email-toolbar">
          <div>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <small>Campaign Preview</small>
        </div>

        <div className="visual-email-paper">

          <small>{project.kicker}</small>

          <h4>{project.visualTitle}</h4>

          <div className="visual-email-hero"></div>

          <p>
            Thoughtful messaging designed to nurture attention,
            strengthen trust, and inspire the next action.
          </p>

          <span className="visual-email-button">
            Discover More
          </span>

        </div>

      </div>

    </div>
  );
}

function Projects() {
  const [activeCategory, setActiveCategory] = useState("funnels");
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotationPaused, setRotationPaused] = useState(false);

  const projects = updatedPortfolioGroups[activeCategory];
  const activeProject = projects[activeIndex];
  const currentCategory = categoryDetails[activeCategory];
  const CategoryIcon = currentCategory.icon;

  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  useEffect(() => {
    if (rotationPaused) return undefined;

    const interval = window.setInterval(() => {
      setActiveIndex(
        (current) => (current + 1) % projects.length
      );
    }, 6500);

    return () => window.clearInterval(interval);
  }, [
    activeCategory,
    projects.length,
    rotationPaused
  ]);

  const showNext = () => {
    setActiveIndex(
      (current) => (current + 1) % projects.length
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
    const total = projects.length;
    const difference =
      (index - activeIndex + total) % total;

    if (difference === 0) return "active";
    if (difference === 1) return "next";
    if (difference === total - 1) return "previous";

    return "hidden";
  };

  return (
    <section
      className="projects"
      id="portfolio"
    >

      {/* Keeps old #projects links working */}
      <span
        id="projects"
        className="projects-anchor"
        aria-hidden="true"
      ></span>

      <div className="projects-inner">

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

        <div className="project-categories">
          {Object.entries(categoryDetails).map(
            ([categoryKey, category]) => {
              const Icon = category.icon;
              const isActive =
                activeCategory === categoryKey;

              return (
                <button
                  key={categoryKey}
                  type="button"
                  className={
                    isActive ? "active" : ""
                  }
                  onClick={() =>
                    setActiveCategory(categoryKey)
                  }
                  aria-pressed={isActive}
                  aria-label={`Show ${category.label} projects`}
                >
                  <Icon size={17} />

                  <span className="category-label">
                    {categoryKey === "email"
                      ? "Email"
                      : category.label}
                  </span>
                </button>
              );
            }
          )}
        </div>

        <div className="archive-introduction">

          <div>
            <CategoryIcon size={17} />
            <span>{currentCategory.label}</span>
          </div>

          <p>
            {currentCategory.description}
          </p>

        </div>

        <div
          className="projects-carousel"
          tabIndex="0"
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
            if (event.key === "ArrowRight")
              showNext();

            if (event.key === "ArrowLeft")
              showPrevious();
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
                          {project.kicker} ·{" "}
                          {project.number}
                        </span>

                        <h3>
                          {project.title}
                        </h3>

                        <p>
                          {project.description}
                        </p>

                        <div className="archive-mobile-tags">

                          {project.tags.map(
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
                          >
                            View Live Project
                            <ArrowUpRight
                              size={17}
                            />
                          </a>
                        ) : (
                          <span className="archive-mobile-link archive-mobile-link-disabled">
                            Project preview coming
                            soon
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

        <div
          className="archive-details"
          key={`${activeCategory}-${activeIndex}`}
        >

          <div className="archive-details-main">

            <span>
              {activeProject.kicker} ·{" "}
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

              {activeProject.tags.map(
                (tag) => (
                  <span key={tag}>
                    {tag}
                  </span>
                )
              )}

            </div>

            {activeProject.liveUrl ? (
              <a
                href={
                  activeProject.liveUrl
                }
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
                aria-label={`Show project ${
                  index + 1
                }`}
              >
                <span></span>
              </button>
            )
          )}

        </div>

      </div>

    </section>
  );
}

export default Projects;