import { useEffect } from "react";
import "./HeroAtmosphere.css";

const foregroundDust = [
  [8, 18, 3, -1.2, 9.5],
  [17, 70, 2, -4.1, 11.5],
  [29, 35, 4, -2.7, 12.5],
  [42, 82, 2, -6.2, 10.5],
  [56, 24, 3, -3.4, 13.5],
  [68, 63, 2, -7.1, 11.8],
  [79, 17, 4, -5.2, 14.2],
  [90, 74, 3, -2.1, 12.2]
];

function SiteAtmosphere() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    if (reduceMotion || !finePointer) return undefined;

    let frameId = 0;
    let nextX = 0;
    let nextY = 0;

    const applyParallax = () => {
      frameId = 0;

      root.style.setProperty("--wave-x", `${nextX * -18}px`);
      root.style.setProperty("--wave-y", `${nextY * -10}px`);
      root.style.setProperty("--stars-x", `${nextX * -8}px`);
      root.style.setProperty("--stars-y", `${nextY * -5}px`);
      root.style.setProperty("--front-x", `${nextX * 13}px`);
      root.style.setProperty("--front-y", `${nextY * 9}px`);
      root.style.setProperty("--hero-copy-x", `${nextX * 1.8}px`);
      root.style.setProperty("--hero-copy-y", `${nextY * 1.2}px`);
      root.style.setProperty("--hero-visual-x", `${nextX * 4.5}px`);
      root.style.setProperty("--hero-visual-y", `${nextY * 3.2}px`);
    };

    const handlePointerMove = (event) => {
      nextX = event.clientX / window.innerWidth - 0.5;
      nextY = event.clientY / window.innerHeight - 0.5;

      if (!frameId) {
        frameId = window.requestAnimationFrame(applyParallax);
      }
    };

    const resetParallax = () => {
      nextX = 0;
      nextY = 0;

      if (!frameId) {
        frameId = window.requestAnimationFrame(applyParallax);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true
    });
    window.addEventListener("blur", resetParallax);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", resetParallax);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      [
        "--wave-x",
        "--wave-y",
        "--stars-x",
        "--stars-y",
        "--front-x",
        "--front-y",
        "--hero-copy-x",
        "--hero-copy-y",
        "--hero-visual-x",
        "--hero-visual-y"
      ].forEach((property) => root.style.removeProperty(property));
    };
  }, []);

  return (
    <div className="site-atmosphere" aria-hidden="true">
      <div className="atmosphere-base"></div>

      <div className="atmosphere-spotlight atmosphere-spotlight-copy"></div>
      <div className="atmosphere-spotlight atmosphere-spotlight-portrait"></div>

      <div className="hero-aurora hero-aurora-left"></div>
      <div className="hero-aurora hero-aurora-right"></div>

      <div className="silk-ribbon silk-ribbon-one"></div>
      <div className="silk-ribbon silk-ribbon-two"></div>
      <div className="silk-ribbon silk-ribbon-three"></div>

      <svg
        className="hero-wave hero-wave-main"
        viewBox="0 0 1600 720"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="heroWaveGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7a123d" stopOpacity="0" />
            <stop offset="18%" stopColor="#c83c72" stopOpacity=".28" />
            <stop offset="48%" stopColor="#ff8ab4" stopOpacity=".72" />
            <stop offset="74%" stopColor="#d94a82" stopOpacity=".38" />
            <stop offset="100%" stopColor="#7a123d" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g className="hero-wave-lines">
          <path d="M-150 505 C180 230 430 205 690 395 C920 565 1190 555 1440 330 C1560 220 1680 205 1770 270" />
          <path d="M-150 525 C175 265 425 238 685 420 C915 582 1180 575 1430 355 C1555 248 1680 235 1770 295" />
          <path d="M-150 545 C165 300 415 272 675 445 C905 600 1170 595 1420 382 C1548 276 1670 265 1770 322" />
          <path d="M-150 565 C155 335 405 305 665 470 C895 618 1160 615 1410 408 C1540 305 1660 295 1770 350" />
          <path d="M-150 585 C145 370 395 338 655 495 C885 636 1150 635 1400 435 C1530 334 1650 325 1770 378" />
        </g>
      </svg>

      <svg
        className="hero-wave hero-wave-faint"
        viewBox="0 0 1600 720"
        preserveAspectRatio="none"
      >
        <g className="hero-wave-lines">
          <path d="M-100 170 C245 40 505 105 720 250 C930 390 1175 385 1420 190 C1550 85 1675 80 1780 145" />
          <path d="M-100 190 C235 70 495 135 710 275 C920 410 1165 408 1410 215 C1540 112 1665 108 1780 170" />
          <path d="M-100 210 C225 100 485 165 700 300 C910 430 1155 430 1400 240 C1530 140 1655 135 1780 195" />
        </g>
      </svg>

      <div className="star-dust star-dust-one"></div>
      <div className="star-dust star-dust-two"></div>

      <div className="atmosphere-glint glint-one"></div>
      <div className="atmosphere-glint glint-two"></div>
      <div className="atmosphere-glint glint-three"></div>
      <div className="atmosphere-glint glint-four"></div>

      <div className="foreground-dust">
        {foregroundDust.map(([x, y, size, delay, duration], index) => (
          <span
            key={index}
            style={{
              "--dust-x": `${x}%`,
              "--dust-y": `${y}%`,
              "--dust-size": `${size}px`,
              "--dust-delay": `${delay}s`,
              "--dust-duration": `${duration}s`
            }}
          ></span>
        ))}
      </div>

      <div className="atmosphere-noise"></div>
      <div className="atmosphere-vignette"></div>
    </div>
  );
}

export default SiteAtmosphere;