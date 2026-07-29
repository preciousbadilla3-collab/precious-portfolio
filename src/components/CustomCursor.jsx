import { useEffect, useRef } from "react";
import "./CustomCursor.css";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "[role='button']",
  ".hero-copy-card",
  ".floating-card",
  ".portrait",
  ".about-video-card",
  ".system-tab",
  ".system-stage",
  ".archive-card",
  ".archive-arrow",
  ".credential-item",
  ".resume-card",
  ".contact-channel",
  ".contact-session",
  ".contact-book-button",
  ".footer-socials a",
  ".chat-toggle",
  ".chat-window"
].join(",");

function CustomCursor() {
  const sparkleLayerRef = useRef(null);

  useEffect(() => {
    const supportsCustomCursor = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    if (!supportsCustomCursor) {
      return undefined;
    }

    const sparkleLayer = sparkleLayerRef.current;

    if (!sparkleLayer) {
      return undefined;
    }

    document.body.classList.add("custom-cursor-enabled");

    let currentTarget = null;

    const createSparkles = (x, y, amount = 4) => {
      for (let index = 0; index < amount; index += 1) {
        const sparkle = document.createElement("span");

        sparkle.className = "cursor-burst-spark";

        const angle =
          (Math.PI * 2 * index) / amount +
          Math.random() * 0.45;

        const distance = 16 + Math.random() * 20;

        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;

        sparkle.style.setProperty(
          "--spark-x",
          `${Math.cos(angle) * distance}px`
        );

        sparkle.style.setProperty(
          "--spark-y",
          `${Math.sin(angle) * distance}px`
        );

        sparkle.style.setProperty(
          "--spark-delay",
          `${index * 30}ms`
        );

        sparkleLayer.appendChild(sparkle);

        window.setTimeout(() => {
          sparkle.remove();
        }, 650);
      }
    };

    const removeCurrentTarget = () => {
      if (!currentTarget) return;

      currentTarget.classList.remove("cursor-lit");
      currentTarget = null;
    };

    const handlePointerOver = (event) => {
      const target =
        event.target instanceof Element
          ? event.target
          : null;

      const nextTarget = target
        ? target.closest(INTERACTIVE_SELECTOR)
        : null;

      if (nextTarget === currentTarget) return;

      removeCurrentTarget();

      if (nextTarget) {
        currentTarget = nextTarget;
        currentTarget.classList.add("cursor-lit");

        createSparkles(event.clientX, event.clientY);
      }
    };

    const handlePointerDown = (event) => {
      createSparkles(
        event.clientX,
        event.clientY,
        6
      );
    };

    const handleMouseLeave = () => {
      removeCurrentTarget();
    };

    document.addEventListener(
      "pointerover",
      handlePointerOver
    );

    document.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    document.documentElement.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    return () => {
      document.body.classList.remove(
        "custom-cursor-enabled"
      );

      removeCurrentTarget();

      document.removeEventListener(
        "pointerover",
        handlePointerOver
      );

      document.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, []);

  return (
    <div
      ref={sparkleLayerRef}
      className="cursor-burst-layer"
      aria-hidden="true"
    ></div>
  );
}

export default CustomCursor;