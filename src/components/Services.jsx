import { useState } from "react";
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Database,
  PanelsTopLeft,
  Sparkles,
  Workflow
} from "lucide-react";

import "./Services.css";

const services = [
  {
    id: "crm",
    number: "01",
    title: "CRM Systems",
    short: "Organized pipelines and lead management.",
    icon: Database
  },
  {
    id: "funnels",
    number: "02",
    title: "Funnel Design",
    short: "Strategic pages built to guide and convert.",
    icon: PanelsTopLeft
  },
  {
    id: "automation",
    number: "03",
    title: "Automations",
    short: "Workflows that handle repetitive tasks.",
    icon: Workflow
  },
  {
    id: "ai",
    number: "04",
    title: "AI Agents",
    short: "Smart conversations and lead qualification.",
    icon: Bot
  }
];

function Services() {
  const [activeService, setActiveService] = useState("crm");

  const activeItem =
    services.find((service) => service.id === activeService) || services[0];

  const ActiveIcon = activeItem.icon;

  return (
    <section className="services" id="services">

      <div className="services-inner">

        <header className="services-header">

          <div className="services-eyebrow">
            <Sparkles size={14} />
            What I Do
          </div>

          <div className="services-heading-row">

            <h2>
              Digital systems crafted to feel
              <span> seamless, refined, and intentional.</span>
            </h2>

            <p>
              From the first touchpoint to the final follow-up, I create
              connected GoHighLevel experiences that help businesses manage
              leads, simplify operations, and grow with clarity.
            </p>

          </div>

        </header>

        <div className="services-showcase">

          {/* Left interactive tabs */}
          <div
            className="services-tabs"
            role="tablist"
            aria-label="Services"
          >

            {services.map((service) => {
              const Icon = service.icon;
              const isActive = activeService === service.id;

              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`service-tab ${isActive ? "active" : ""}`}
                  onClick={() => setActiveService(service.id)}
                >
                  <span className="service-tab-number">
                    {service.number}
                  </span>

                  <span className="service-tab-icon">
                    <Icon size={19} />
                  </span>

                  <span className="service-tab-copy">
                    <strong>{service.title}</strong>
                    <small>{service.short}</small>
                  </span>

                  <ArrowUpRight
                    className="service-tab-arrow"
                    size={18}
                  />
                </button>
              );
            })}

          </div>

          {/* Right interactive preview */}
          <div className="services-stage">

            <div className="services-stage-glow"></div>

            <div className="services-stage-topbar">

              <div className="stage-window-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="stage-title">
                <ActiveIcon size={16} />
                {activeItem.title}
              </div>

              <span className="stage-status">
                Live Preview
              </span>

            </div>

            <div
              className="services-preview"
              key={activeService}
            >

              {activeService === "crm" && (
                <div className="crm-preview">

                  <div className="preview-label">
                    Lead Pipeline
                  </div>

                  <div className="crm-columns">

                    <div className="crm-column">
                      <span>New Lead</span>

                      <div className="crm-lead-card">
                        <strong>Olivia Martin</strong>
                        <small>Website Inquiry</small>
                      </div>

                      <div className="crm-lead-card">
                        <strong>Haven & Co.</strong>
                        <small>Funnel Consultation</small>
                      </div>
                    </div>

                    <div className="crm-column">
                      <span>Qualified</span>

                      <div className="crm-lead-card highlighted">
                        <strong>Amara Studio</strong>
                        <small>Discovery Call Booked</small>
                      </div>
                    </div>

                    <div className="crm-column">
                      <span>Client</span>

                      <div className="crm-lead-card completed">
                        <CheckCircle2 size={15} />
                        <div>
                          <strong>North & Bloom</strong>
                          <small>Onboarding Started</small>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {activeService === "funnels" && (
                <div className="funnel-preview">

                  <div className="funnel-browser">

                    <div className="funnel-browser-bar">
                      <span></span>
                      <span>yourbrand.com</span>
                    </div>

                    <div className="funnel-page">

                      <div className="funnel-copy">

                        <span>Premium Client Experience</span>

                        <h3>
                          Turn attention into action.
                        </h3>

                        <p>
                          A conversion-focused landing page with an elegant,
                          friction-free journey.
                        </p>

                        <button type="button">
                          Start Here
                        </button>

                      </div>

                      <div className="funnel-form">

                        <div></div>
                        <div></div>
                        <div></div>

                        <span>Get Started</span>

                      </div>

                    </div>

                  </div>

                  <div className="funnel-metrics">

                    <div>
                      <strong>01</strong>
                      <span>Clear offer</span>
                    </div>

                    <div>
                      <strong>02</strong>
                      <span>Lead capture</span>
                    </div>

                    <div>
                      <strong>03</strong>
                      <span>Conversion path</span>
                    </div>

                  </div>

                </div>
              )}

              {activeService === "automation" && (
                <div className="automation-preview">

                  <div className="automation-title">
                    New Lead Follow-Up
                  </div>

                  <div className="workflow-map">

                    <div className="workflow-node workflow-trigger">
                      <span>Trigger</span>
                      Form Submitted
                    </div>

                    <div className="workflow-line"></div>

                    <div className="workflow-node">
                      <span>Step 01</span>
                      Create Contact
                    </div>

                    <div className="workflow-line"></div>

                    <div className="workflow-node featured-node">
                      <span>Step 02</span>
                      Send Welcome Email
                    </div>

                    <div className="workflow-line"></div>

                    <div className="workflow-node">
                      <span>Step 03</span>
                      Notify Team
                    </div>

                  </div>

                  <div className="automation-status">
                    <span className="automation-pulse"></span>
                    Workflow active
                  </div>

                </div>
              )}

              {activeService === "ai" && (
                <div className="ai-preview">

                  <div className="ai-chat-header">

                    <div className="ai-avatar">
                      PB
                    </div>

                    <div>
                      <strong>Precious AI Assistant</strong>
                      <span>
                        <i></i>
                        Online now
                      </span>
                    </div>

                  </div>

                  <div className="ai-conversation">

                    <div className="ai-message assistant-message">
                      Hi! How can I help with your business today?
                    </div>

                    <div className="ai-message visitor-message">
                      I need a lead-generation funnel.
                    </div>

                    <div className="ai-message assistant-message">
                      I’d be happy to help. What type of business are you
                      building it for?
                    </div>

                    <div className="ai-typing">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>

                  </div>

                  <div className="ai-input">
                    <span>Type your message...</span>
                    <ArrowUpRight size={17} />
                  </div>

                </div>
              )}

            </div>

            <div className="services-stage-footer">

              <div className="service-tags">
                <span>GoHighLevel</span>
                <span>Strategy</span>
                <span>Automation</span>
              </div>

              <a href="#projects">
                View selected work
                <ArrowUpRight size={16} />
              </a>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Services;