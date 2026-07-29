import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Calendar,
  Mail,
  MessageCircle,
  Send,
  Sparkles,
  X
} from "lucide-react";

import "./FloatingChat.css";

const EMAIL_ADDRESS = "preciousbadilla3@gmail.com";

/*
  Paste your GoHighLevel calendar URL here later.

  Until then, booking buttons will open a prepared email.
*/
const BOOKING_URL = "PASTE_YOUR_GHL_BOOKING_LINK_HERE";

const initialMessages = [
  {
    id: 1,
    role: "assistant",
    text:
      "Hi! I’m Precious’ portfolio assistant. I can help you explore her services, discuss a project, or arrange a discovery call."
  }
];

const quickReplies = [
  "What services do you offer?",
  "I need a funnel",
  "How much does it cost?"
];

function createAutomaticReply(message) {
  const normalizedMessage = message.toLowerCase().trim();

  if (
    normalizedMessage.includes("hello") ||
    normalizedMessage.includes("hi ") ||
    normalizedMessage === "hi" ||
    normalizedMessage.includes("hey")
  ) {
    return {
      text:
        "Hi! Welcome to Precious’ portfolio. Are you interested in a funnel, CRM system, automation, AI agent, or email campaign?"
    };
  }

  if (
    normalizedMessage.includes("service") ||
    normalizedMessage.includes("offer") ||
    normalizedMessage.includes("what do you do")
  ) {
    return {
      text:
        "Precious specializes in GoHighLevel CRM systems, conversion-focused funnels, workflow automations, AI agents, and email marketing campaigns.",
      action: {
        label: "Explore Services",
        href: "#services"
      }
    };
  }

  if (
    normalizedMessage.includes("funnel") ||
    normalizedMessage.includes("landing page") ||
    normalizedMessage.includes("website")
  ) {
    return {
      text:
        "Precious creates polished funnels for lead generation, webinars, local businesses, service offers, and appointment bookings. What type of business is the funnel for?",
      action: {
        label: "View Funnel Work",
        href: "#portfolio"
      }
    };
  }

  if (
    normalizedMessage.includes("automation") ||
    normalizedMessage.includes("workflow") ||
    normalizedMessage.includes("follow-up") ||
    normalizedMessage.includes("follow up")
  ) {
    return {
      text:
        "She can build automated lead follow-ups, appointment reminders, missed-call text backs, onboarding workflows, email sequences, and internal notifications.",
      action: {
        label: "See Automations",
        href: "#portfolio"
      }
    };
  }

  if (
    normalizedMessage.includes("crm") ||
    normalizedMessage.includes("pipeline") ||
    normalizedMessage.includes("lead management")
  ) {
    return {
      text:
        "Precious can organize your leads through custom pipelines, opportunity stages, calendars, contact management, tagging, and automated follow-up systems."
    };
  }

  if (
    normalizedMessage.includes("ai") ||
    normalizedMessage.includes("chatbot") ||
    normalizedMessage.includes("agent")
  ) {
    return {
      text:
        "AI agents can assist with inquiries, qualify leads, answer common questions, and guide visitors toward booking or contacting your business."
    };
  }

  if (
    normalizedMessage.includes("price") ||
    normalizedMessage.includes("pricing") ||
    normalizedMessage.includes("cost") ||
    normalizedMessage.includes("rate") ||
    normalizedMessage.includes("how much")
  ) {
    return {
      text:
        "Project pricing depends on the number of pages, workflows, integrations, and required features. A short discovery call is the best way to receive an accurate quote.",
      action: {
        label: "Book Discovery Call",
        href: "#booking"
      }
    };
  }

  if (
    normalizedMessage.includes("book") ||
    normalizedMessage.includes("call") ||
    normalizedMessage.includes("meeting") ||
    normalizedMessage.includes("schedule")
  ) {
    return {
      text:
        "Absolutely. You can arrange a complimentary discovery call to discuss your goals, current challenges, and ideal system.",
      action: {
        label: "Book Discovery Call",
        href: "#booking"
      }
    };
  }

  if (
    normalizedMessage.includes("email") ||
    normalizedMessage.includes("contact") ||
    normalizedMessage.includes("message precious")
  ) {
    return {
      text:
        "You can contact Precious directly by email. Include a short description of your business and the project you have in mind.",
      action: {
        label: "Email Precious",
        href: `mailto:${EMAIL_ADDRESS}`
      }
    };
  }

  if (
    normalizedMessage.includes("resume") ||
    normalizedMessage.includes("experience") ||
    normalizedMessage.includes("background")
  ) {
    return {
      text:
        "You can review Precious’ skills, professional strengths, and downloadable resume in the Craft & Credentials section.",
      action: {
        label: "View Resume",
        href: "#resume"
      }
    };
  }

  if (
    normalizedMessage.includes("portfolio") ||
    normalizedMessage.includes("work") ||
    normalizedMessage.includes("project")
  ) {
    return {
      text:
        "The Crimson Archive contains examples of funnels, automations, and email marketing projects.",
      action: {
        label: "Open Portfolio",
        href: "#portfolio"
      }
    };
  }

  if (
    normalizedMessage.includes("thank") ||
    normalizedMessage.includes("thanks")
  ) {
    return {
      text:
        "You’re very welcome! I’m here whenever you’re ready to explore a service or discuss a project."
    };
  }

  return {
    text:
      "Thanks for sharing that. Precious would be happy to learn more about your project. You can book a discovery call or email her directly with the details.",
    action: {
      label: "Contact Precious",
      href: `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
        "Portfolio Project Inquiry"
      )}&body=${encodeURIComponent(
        `Hi Precious,\n\nI would like to discuss this project:\n\n${message}\n`
      )}`
    }
  };
}

function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const savedMessages = sessionStorage.getItem(
        "precious-portfolio-chat"
      );

      return savedMessages
        ? JSON.parse(savedMessages)
        : initialMessages;
    } catch {
      return initialMessages;
    }
  });

  const messagesEndRef = useRef(null);
  const messagesRef = useRef(null);
  const replyTimerRef = useRef(null);

  const hasBookingLink = BOOKING_URL.startsWith("http");

  const bookingEmailSubject = encodeURIComponent(
    "Discovery Call Request"
  );

  const bookingEmailBody = encodeURIComponent(
    `Hi Precious,

I would like to arrange a discovery call.

Business or project:
Service I am interested in:
Preferred date and time:

Thank you!`
  );

  const bookingHref = hasBookingLink
    ? BOOKING_URL
    : `mailto:${EMAIL_ADDRESS}?subject=${bookingEmailSubject}&body=${bookingEmailBody}`;

  useEffect(() => {
    try {
      sessionStorage.setItem(
        "precious-portfolio-chat",
        JSON.stringify(messages)
      );
    } catch {
      // The chat still works when browser storage is unavailable.
    }
  }, [messages]);

  useEffect(() => {
    const mobileChat = window.matchMedia("(max-width: 680px)").matches;

    if (!open || !mobileChat) return undefined;

    document.documentElement.classList.add("mobile-chat-open");

    return () => {
      document.documentElement.classList.remove("mobile-chat-open");
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const messageContainer = messagesRef.current;

    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, typing, open]);

  useEffect(() => {
    return () => {
      if (replyTimerRef.current) {
        window.clearTimeout(replyTimerRef.current);
      }
    };
  }, []);

  const sendMessage = (customMessage) => {
    const messageText =
      typeof customMessage === "string"
        ? customMessage.trim()
        : text.trim();

    if (!messageText || typing) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: messageText
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage
    ]);

    setText("");
    setTyping(true);

    const replyDelay = 700 + Math.random() * 500;

    replyTimerRef.current = window.setTimeout(() => {
      const automaticReply =
        createAutomaticReply(messageText);

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: automaticReply.text,
          action: automaticReply.action
        }
      ]);

      setTyping(false);
    }, replyDelay);
  };

  const handleMessageAction = (action) => {
    if (action.href === "#booking") {
      window.location.href = bookingHref;
      return;
    }

    if (action.href.startsWith("#")) {
      const destination = document.querySelector(
        action.href
      );

      destination?.scrollIntoView({
        behavior: "smooth"
      });

      setOpen(false);
      return;
    }

    window.location.href = action.href;
  };

  const clearConversation = () => {
    setMessages(initialMessages);
    setTyping(false);

    if (replyTimerRef.current) {
      window.clearTimeout(replyTimerRef.current);
    }
  };

  return (
    <>
      <button
        type="button"
        className={`chat-toggle ${open ? "active" : ""}`}
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
      >
        <span className="chat-toggle-shine"></span>

        {open ? (
          <X size={20} />
        ) : (
          <MessageCircle size={20} />
        )}
      </button>

      <aside
        className={`chat-window ${open ? "show" : ""}`}
        aria-hidden={!open}
      >
        <header className="chat-header">

          <div className="chat-profile">

            <div className="chat-avatar">
              PB

              <span className="chat-online-indicator"></span>
            </div>

            <div className="chat-profile-copy">
              <h3>Precious Assistant</h3>

              <span>
                <i></i>
                Online · Replies instantly
              </span>
            </div>

          </div>

          <div className="chat-header-actions">
            <button
              type="button"
              className="chat-clear-button"
              onClick={clearConversation}
            >
              Clear
            </button>

            <button
              type="button"
              className="chat-mobile-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

        </header>

        <div className="chat-body">

          <div className="chat-intro-label">
            <Sparkles size={12} />
            Portfolio Concierge
          </div>

          <div className="chat-messages" ref={messagesRef}>

            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message-row ${message.role}`}
              >
                {message.role === "assistant" && (
                  <div className="message-avatar">
                    PB
                  </div>
                )}

                <div className="chat-message-content">

                  <div className="chat-message-bubble">
                    {message.text}
                  </div>

                  {message.action && (
                    <button
                      type="button"
                      className="chat-message-action"
                      onClick={() =>
                        handleMessageAction(message.action)
                      }
                    >
                      {message.action.label}
                      <ArrowUpRight size={14} />
                    </button>
                  )}

                </div>

              </div>
            ))}

            {typing && (
              <div className="chat-message-row assistant">

                <div className="message-avatar">
                  PB
                </div>

                <div className="chat-typing-bubble">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

              </div>
            )}

            <div ref={messagesEndRef}></div>

          </div>

          <div className="chat-quick-replies">

            {quickReplies.map((reply) => (
              <button
                key={reply}
                type="button"
                onClick={() => sendMessage(reply)}
                disabled={typing}
              >
                {reply}
              </button>
            ))}

          </div>

          <div className="chat-action-row">

            <a
              href={bookingHref}
              target={hasBookingLink ? "_blank" : undefined}
              rel={hasBookingLink ? "noreferrer" : undefined}
            >
              <Calendar size={15} />
              Book a Call
            </a>

            <a href={`mailto:${EMAIL_ADDRESS}`}>
              <Mail size={15} />
              Email
            </a>

          </div>

        </div>

        <footer className="chat-footer">

          <div className="chat-input-wrapper">

            <input
              type="text"
              placeholder="Ask about a project..."
              value={text}
              onChange={(event) =>
                setText(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              disabled={typing}
            />

          </div>

          <button
            type="button"
            className="chat-send-button"
            onClick={() => sendMessage()}
            disabled={!text.trim() || typing}
            aria-label="Send message"
          >
            <Send size={17} />
          </button>

        </footer>

        <div className="chat-privacy-note">
          Automated portfolio assistant · No personal data required
        </div>

      </aside>
    </>
  );
}

export default FloatingChat;