import {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

import { ArrowRight } from "lucide-react";
import "./Intro.css";

/*
  Keep false while testing so the intro
  plays every time the page refreshes.

  Change to true when the portfolio is finished.
*/
const PLAY_ONCE_PER_SESSION = false;

const SESSION_KEY =
  "precious-nebula-intro-seen";

/*
  3.3 seconds of animation
  + 0.7 seconds of exit
  = approximately 4 seconds total.
*/
const INTRO_DURATION = 7450;
const EXIT_DURATION = 850;

const PARTICLES = Array.from(
  { length: 28 },
  (_, index) => {
    const angle =
      (Math.PI * 2 * index) / 28 +
      ((index % 4) - 1.5) * 0.06;

    const distance =
      170 + (index % 7) * 42;

    return {
      x: `${Math.cos(angle) * distance}px`,
      y: `${Math.sin(angle) * distance}px`,
      size: `${2 + (index % 4)}px`,
      delay: `${(index % 6) * 32}ms`,
      duration: `${760 + (index % 5) * 85}ms`
    };
  }
);

function Intro({ finishIntro }) {
  const mainTimerRef = useRef(null);
  const exitTimerRef = useRef(null);

  const exitStartedRef = useRef(false);
  const finishedRef = useRef(false);

  const [isExiting, setIsExiting] =
    useState(false);

  const completeIntro = useCallback(() => {
    if (finishedRef.current) return;

    finishedRef.current = true;

    if (PLAY_ONCE_PER_SESSION) {
      try {
        sessionStorage.setItem(
          SESSION_KEY,
          "true"
        );
      } catch {
        // The intro still works without storage.
      }
    }

    finishIntro();
  }, [finishIntro]);

  const beginExit = useCallback(() => {
    if (exitStartedRef.current) return;

    exitStartedRef.current = true;

    window.clearTimeout(
      mainTimerRef.current
    );

    setIsExiting(true);

    exitTimerRef.current =
      window.setTimeout(
        completeIntro,
        EXIT_DURATION
      );
  }, [completeIntro]);

  useEffect(() => {
    if (PLAY_ONCE_PER_SESSION) {
      try {
        const introSeen =
          sessionStorage.getItem(
            SESSION_KEY
          );

        if (introSeen === "true") {
          completeIntro();
          return undefined;
        }
      } catch {
        // Continue playing normally.
      }
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    mainTimerRef.current =
      window.setTimeout(
        beginExit,
        reducedMotion
          ? 1300
          : INTRO_DURATION
      );

    return () => {
      window.clearTimeout(
        mainTimerRef.current
      );

      window.clearTimeout(
        exitTimerRef.current
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [beginExit, completeIntro]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        beginExit();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [beginExit]);

  return (
    <section
      className={`nebula-intro ${
        isExiting ? "is-exiting" : ""
      }`}
      aria-label="Precious portfolio introduction"
    >
      {/* Background */}

      <div
        className="nebula-background"
        aria-hidden="true"
      >
        <div className="nebula-haze haze-left"></div>
        <div className="nebula-haze haze-right"></div>
        <div className="nebula-haze haze-center"></div>

        <div className="nebula-starfield"></div>
        <div className="nebula-vignette"></div>
        <div className="nebula-grain"></div>
      </div>

      {/* Red energy ribbons */}

      <svg
        className="nebula-ribbons"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="ribbonGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#4f001b"
              stopOpacity="0"
            />

            <stop
              offset="27%"
              stopColor="#9e123f"
              stopOpacity=".8"
            />

            <stop
              offset="60%"
              stopColor="#f12663"
              stopOpacity="1"
            />

            <stop
              offset="100%"
              stopColor="#760326"
              stopOpacity="0"
            />
          </linearGradient>

          <filter
            id="ribbonBlur"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur
              stdDeviation="8"
            />
          </filter>

          <filter
            id="ribbonGlow"
            x="-70%"
            y="-70%"
            width="240%"
            height="240%"
          >
            <feGaussianBlur
              stdDeviation="3.2"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode
                in="SourceGraphic"
              />
            </feMerge>
          </filter>
        </defs>

        {/* Upper-left ribbon */}

        <g className="ribbon-group ribbon-group-one">
          <path
            className="ribbon-blur"
            pathLength="1"
            d="
              M -170 40
              C 170 5, 115 220, 430 280
              C 670 330, 760 220, 970 285
              C 1170 350, 1240 570, 1540 660
            "
          />

          <path
            className="ribbon-main"
            pathLength="1"
            d="
              M -170 40
              C 170 5, 115 220, 430 280
              C 670 330, 760 220, 970 285
              C 1170 350, 1240 570, 1540 660
            "
          />

          <path
            className="ribbon-highlight"
            pathLength="1"
            d="
              M -170 57
              C 170 22, 115 237, 430 297
              C 670 347, 760 237, 970 302
              C 1170 367, 1240 587, 1540 677
            "
          />
        </g>

        {/* Second upper sweep */}

        <g className="ribbon-group ribbon-group-two">
          <path
            className="ribbon-blur"
            pathLength="1"
            d="
              M -160 115
              C 170 72, 165 285, 465 335
              C 720 378, 810 265, 1020 345
              C 1190 410, 1280 640, 1530 730
            "
          />

          <path
            className="ribbon-main"
            pathLength="1"
            d="
              M -160 115
              C 170 72, 165 285, 465 335
              C 720 378, 810 265, 1020 345
              C 1190 410, 1280 640, 1530 730
            "
          />

          <path
            className="ribbon-highlight"
            pathLength="1"
            d="
              M -160 130
              C 170 87, 165 300, 465 350
              C 720 393, 810 280, 1020 360
              C 1190 425, 1280 655, 1530 745
            "
          />
        </g>

        {/* Bottom-left rising ribbon */}

        <g className="ribbon-group ribbon-group-three">
          <path
            className="ribbon-blur"
            pathLength="1"
            d="
              M -100 920
              C 150 650, 310 720, 470 520
              C 610 345, 700 240, 920 135
              C 1120 40, 1290 65, 1540 -80
            "
          />

          <path
            className="ribbon-main"
            pathLength="1"
            d="
              M -100 920
              C 150 650, 310 720, 470 520
              C 610 345, 700 240, 920 135
              C 1120 40, 1290 65, 1540 -80
            "
          />

          <path
            className="ribbon-highlight"
            pathLength="1"
            d="
              M -84 930
              C 166 660, 326 730, 486 530
              C 626 355, 716 250, 936 145
              C 1136 50, 1306 75, 1556 -70
            "
          />
        </g>
      </svg>

      {/* Light travelling through ribbons */}

      <div
        className="nebula-light-sweep"
        aria-hidden="true"
      ></div>

      {/* Brand entrance */}

      <div className="nebula-stage">
        <div className="nebula-arrival">
          <span></span>
          <p>Introducing</p>
          <span></span>
        </div>

        <div className="nebula-brand">

          <div className="nebula-word-mask">
            <h1>
              precious<span>.</span>
            </h1>
          </div>

          <div className="nebula-brand-line">
            <span></span>
          </div>

          <div className="nebula-portfolio-mask">
            <h2>PORTFOLIO</h2>
          </div>

          <div className="nebula-role-mask">
            <p>GOHIGHLEVEL SPECIALIST</p>
          </div>

        </div>
      </div>

      {/* Central gathering point */}

      <div
        className="nebula-core"
        aria-hidden="true"
      >
        <span className="nebula-core-ring"></span>
        <span className="nebula-core-light"></span>
      </div>

      {/* Nebula explosion */}

      <div
        className="nebula-explosion"
        aria-hidden="true"
      >
        <div className="nebula-burst"></div>
        <div className="nebula-burst-ring"></div>

        <div className="nebula-particles">
          {PARTICLES.map(
            (particle, index) => (
              <span
                key={index}
                style={{
                  "--particle-x":
                    particle.x,
                  "--particle-y":
                    particle.y,
                  "--particle-size":
                    particle.size,
                  "--particle-delay":
                    particle.delay,
                  "--particle-duration":
                    particle.duration
                }}
              ></span>
            )
          )}
        </div>
      </div>

      {/* Small corner details */}

      <div className="nebula-meta nebula-meta-left">
        PB / 2026
      </div>

      <div className="nebula-meta nebula-meta-right">
        PALAWAN · PH
      </div>

      <button
        type="button"
        className="nebula-skip"
        onClick={beginExit}
      >
        Skip
        <ArrowRight size={14} />
      </button>
    </section>
  );
}

export default Intro;