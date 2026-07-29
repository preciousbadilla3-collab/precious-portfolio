import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import {
  ArrowDownToLine,
  ArrowUpRight,
  Check,
  Expand,
  FileText,
  Sparkles,
  X
} from "lucide-react";


import "./Process.css";
const resumePdf = "/precious-resume.pdf";
const credentials = [
  {
    number: "01",
    title: "Intentional Systems",
    text:
      "Every funnel, pipeline, and workflow is planned around the complete customer journey—not built as an isolated feature."
  },
  {
    number: "02",
    title: "Design With Purpose",
    text:
      "I combine polished visual design with clear structure, making every digital experience both attractive and easy to use."
  },
  {
    number: "03",
    title: "Detail-Focused Execution",
    text:
      "From responsive layouts to workflow conditions, I carefully review the smaller details that shape the final experience."
  },
  {
    number: "04",
    title: "Clear Collaboration",
    text:
      "I value thoughtful communication, organized work, and a process that keeps expectations and progress easy to understand."
  }
];

function Process() {
  const [activeItem, setActiveItem] = useState(0);
  const [resumeOpen, setResumeOpen] = useState(false);

  const resumeCardRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setResumeOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    const previousOverflow = document.body.style.overflow;

    if (resumeOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [resumeOpen]);

  const handleResumeMove = (event) => {
    const card = resumeCardRef.current;

    if (!card) return;

    const bounds = card.getBoundingClientRect();

    const mouseX = event.clientX - bounds.left;
    const mouseY = event.clientY - bounds.top;

    const rotateY =
      (mouseX / bounds.width - 0.5) * 4;

    const rotateX =
      (mouseY / bounds.height - 0.5) * -4;

    card.style.setProperty(
      "--resume-x",
      `${rotateX}deg`
    );

    card.style.setProperty(
      "--resume-y",
      `${rotateY}deg`
    );
  };

  const resetResumePosition = () => {
    const card = resumeCardRef.current;

    if (!card) return;

    card.style.setProperty("--resume-x", "0deg");
    card.style.setProperty("--resume-y", "0deg");
  };

  return (
    <section className="process" id="resume">

      <span
        id="process"
        className="process-anchor"
        aria-hidden="true"
      ></span>

      <div className="process-inner">

        <header className="process-header">

          <div className="process-eyebrow">
            <Sparkles size={14} />
            Craft &amp; Credentials
          </div>

          <div className="process-heading-row">

            <div>
              <p className="process-index">
                04 / EXPERIENCE
              </p>

              <h2>
                The value behind
                <span> the work.</span>
              </h2>
            </div>

            <p>
              Thoughtful systems require more than
              technical setup. They need strategy,
              careful execution, visual clarity, and
              an understanding of how every
              touchpoint connects.
            </p>

          </div>

        </header>

        <div className="credentials-layout">

          {/* LEFT SIDE */}
          <div
            className="credentials-list"
            role="tablist"
            aria-label="Professional qualities"
          >
            {credentials.map((item, index) => {
              const isActive =
                activeItem === index;

              return (
                <button
                  key={item.number}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`credential-item ${
                    isActive ? "active" : ""
                  }`}
                  onMouseEnter={() =>
                    setActiveItem(index)
                  }
                  onClick={() =>
                    setActiveItem(index)
                  }
                >
                  <span className="credential-number">
                    {item.number}
                  </span>

                  <span className="credential-copy">
                    <strong>{item.title}</strong>
                    <small>{item.text}</small>
                  </span>

                  <span className="credential-check">
                    <Check size={16} />
                  </span>
                </button>
              );
            })}
          </div>

          {/* RIGHT RESUME */}
          <div className="process-resume-showcase">

            <div
              className="process-resume-glow"
              aria-hidden="true"
            ></div>

            <div className="process-resume-label">
              <span>
                Tap or hover to view resume
              </span>

              <ArrowDownToLine size={15} />
            </div>

            <div
              ref={resumeCardRef}
              className="process-resume-card"
              onMouseMove={handleResumeMove}
              onMouseLeave={resetResumePosition}
            >
              <div className="process-resume-frame">

                <div className="process-resume-topbar">

                  <div className="process-resume-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <div className="process-resume-file">
                    <FileText size={13} />
                    <span>Precious Badilla</span>
                  </div>

                  <small>PDF</small>

                </div>

                <div className="process-resume-document">

                  <iframe
                    src={`${resumePdf}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                    title="Precious Badilla resume preview"
                    className="process-resume-iframe"
                    tabIndex="-1"
                  ></iframe>

                  <div
                    className="process-resume-shade"
                    aria-hidden="true"
                  ></div>

                  <button
                    type="button"
                    className="process-resume-open"
                    onClick={() =>
                      setResumeOpen(true)
                    }
                    aria-label="Open full resume document"
                  >
                    <span className="process-resume-open-icon">
                      <Expand size={20} />
                    </span>

                    <span className="process-resume-open-text">
                      <small>Resume Preview</small>
                      <strong>
                        Open Full Document
                      </strong>
                    </span>

                    <ArrowUpRight size={18} />
                  </button>

                </div>

              </div>
            </div>

            <div className="process-resume-actions">

              <button
                type="button"
                onClick={() =>
                  setResumeOpen(true)
                }
              >
                View Full Resume
                <ArrowUpRight size={16} />
              </button>

              <a
                href={resumePdf}
                download="Precious-Badilla-Resume.pdf"
              >
                <ArrowDownToLine size={16} />
                Download PDF
              </a>

            </div>

            <div className="process-resume-meta">
              <span>GoHighLevel</span>
              <i></i>
              <span>Funnels</span>
              <i></i>
              <span>Automation</span>
            </div>

          </div>

        </div>

      </div>

            {/* FULLSCREEN RESUME VIEWER */}
      {resumeOpen &&
        createPortal(
          <div
            className="resume-fullscreen-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Precious Badilla full resume"
            onClick={() => setResumeOpen(false)}
          >
            <button
              type="button"
              className="resume-fullscreen-close"
              onClick={() => setResumeOpen(false)}
              aria-label="Close full resume"
            >
              <X size={34} strokeWidth={2} />
            </button>

            <div
              className="resume-fullscreen-viewer"
              onClick={(event) => event.stopPropagation()}
            >
              <iframe
                src={`${resumePdf}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                title="Precious Badilla Resume"
              ></iframe>
            </div>
          </div>,
          document.body
        )
      }

    </section>
  );
}

export default Process;