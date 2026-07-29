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

import "./SystemShowcase.css";

const systems = [
  {
    id: "crm",
    number: "01",
    title: "CRM Systems",
    description: "Organized pipelines and lead management.",
    icon: Database
  },
  {
    id: "funnels",
    number: "02",
    title: "Funnel Design",
    description: "Intentional pages that guide and convert.",
    icon: PanelsTopLeft
  },
  {
    id: "automation",
    number: "03",
    title: "Automations",
    description: "Workflows that simplify repetitive tasks.",
    icon: Workflow
  },
  {
    id: "ai",
    number: "04",
    title: "AI Agents",
    description: "Smart conversations and lead qualification.",
    icon: Bot
  }
];

function SystemShowcase() {
  const [activeSystem, setActiveSystem] = useState("crm");

  const selectedSystem =
    systems.find((system) => system.id === activeSystem) ?? systems[0];

  const SelectedIcon = selectedSystem.icon;

  return (
    <section className="system-showcase" id="services">
      <div className="system-inner">

        {/* Header */}
        <header className="system-header">
          <div className="system-eyebrow">
            <Sparkles size={14} />
            What I Do
          </div>

          <div className="system-heading-grid">
            <h2>
              Digital systems designed to feel
              <span> seamless, refined, and intentional.</span>
            </h2>

            <p>
              I create connected GoHighLevel experiences that help
              businesses capture leads, simplify operations, and build
              smoother customer journeys from first click to follow-up.
            </p>
          </div>
        </header>

        <div className="system-workspace">

          {/* Interactive tabs */}
          <div
            className="system-tabs"
            role="tablist"
            aria-label="Services"
          >
            {systems.map((system) => {
              const Icon = system.icon;
              const isActive = activeSystem === system.id;

              return (
                <button
                  key={system.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`system-tab ${isActive ? "active" : ""}`}
                  onClick={() => setActiveSystem(system.id)}
                >
                  <span className="system-tab-number">
                    {system.number}
                  </span>

                  <span className="system-tab-icon">
                    <Icon size={19} />
                  </span>

                  <span className="system-tab-copy">
                    <strong>{system.title}</strong>
                    <small>{system.description}</small>
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="system-tab-arrow"
                  />
                </button>
              );
            })}
          </div>

          {/* Main preview stage */}
          <div className="system-stage">
            <div className="system-stage-glow"></div>

            <div className="system-stage-header">
              <div className="system-window-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="system-stage-title">
                <SelectedIcon size={16} />
                {selectedSystem.title}
              </div>

              <span className="system-stage-status">
                Live Preview
              </span>
            </div>

            <div
              className="system-preview"
              key={activeSystem}
            >

              {/* CRM */}
              {activeSystem === "crm" && (
                <div className="crm-demo">
                  <div className="demo-label">
                    Lead Pipeline
                  </div>

                  <div className="crm-board">
                    <div className="crm-column">
                      <span>New Lead</span>

                      <div className="lead-card">
                        <strong>Olivia Martin</strong>
                        <small>Website inquiry</small>
                      </div>

                      <div className="lead-card">
                        <strong>Haven & Co.</strong>
                        <small>Funnel consultation</small>
                      </div>
                    </div>

                    <div className="crm-column">
                      <span>Qualified</span>

                      <div className="lead-card highlighted">
                        <strong>Amara Studio</strong>
                        <small>Discovery call booked</small>
                      </div>
                    </div>

                    <div className="crm-column">
                      <span>Client</span>

                      <div className="lead-card completed">
                        <CheckCircle2 size={15} />

                        <div>
                          <strong>North & Bloom</strong>
                          <small>Onboarding started</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Funnel */}
              {activeSystem === "funnels" && (
                <div className="funnel-demo">
                  <div className="mock-browser">
                    <div className="mock-browser-bar">
                      <div className="mock-browser-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>

                      <small>yourbrand.com</small>
                    </div>

                    <div className="mock-page">
                      <div className="mock-copy">
                        <span>Premium Client Experience</span>

                        <h3>
                          Turn attention into action.
                        </h3>

                        <p>
                          A polished landing page with a clear,
                          conversion-focused journey.
                        </p>

                        <button type="button">
                          Start Here
                        </button>
                      </div>

                      <div className="mock-form">
                        <div></div>
                        <div></div>
                        <div></div>
                        <span>Get Started</span>
                      </div>
                    </div>
                  </div>

                  <div className="funnel-steps">
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

              {/* Automation */}
              {activeSystem === "automation" && (
                <div className="automation-demo">
                  <div className="demo-label">
                    New Lead Follow-Up
                  </div>

                  <div className="workflow-demo">
                    <div className="workflow-card workflow-trigger">
                      <span>Trigger</span>
                      Form Submitted
                    </div>

                    <div className="workflow-connector"></div>

                    <div className="workflow-card">
                      <span>Step 01</span>
                      Create Contact
                    </div>

                    <div className="workflow-connector"></div>

                    <div className="workflow-card workflow-featured">
                      <span>Step 02</span>
                      Send Welcome Email
                    </div>

                    <div className="workflow-connector"></div>

                    <div className="workflow-card">
                      <span>Step 03</span>
                      Notify Team
                    </div>
                  </div>

                  <div className="workflow-status">
                    <i></i>
                    Workflow active
                  </div>
                </div>
              )}

              {/* AI Agent */}
              {activeSystem === "ai" && (
                <div className="ai-demo">
                  <div className="ai-demo-header">
                    <div className="ai-demo-avatar">
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

                  <div className="ai-demo-body">
                    <div className="ai-message assistant">
                      Hi! How can I help with your business today?
                    </div>

                    <div className="ai-message visitor">
                      I need a lead-generation funnel.
                    </div>

                    <div className="ai-message assistant">
                      I’d be happy to help. What type of business are
                      you building it for?
                    </div>

                    <div className="ai-typing">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>

                  <div className="ai-demo-input">
                    <span>Type your message...</span>
                    <ArrowUpRight size={17} />
                  </div>
                </div>
              )}
            </div>

            <div className="system-stage-footer">
              <div className="system-tags">
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

export default SystemShowcase;