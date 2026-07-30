import { useEffect, useRef } from "react";
import "./HeroAtmosphere.css";

const TAU = Math.PI * 2;

function SiteAtmosphere() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true
    });

    if (!context) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const coarsePointer = window.matchMedia(
      "(pointer: coarse), (hover: none)"
    ).matches;

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let animationFrame = 0;
    let lastFrameTime = 0;
    let isPageVisible = !document.hidden;

    const frameInterval = coarsePointer ? 1000 / 24 : 1000 / 40;

    const resizeCanvas = () => {
      const visualViewport = window.visualViewport;

      width = Math.max(
        Math.round(
          visualViewport?.width ||
            document.documentElement.clientWidth ||
            window.innerWidth
        ),
        1
      );

      height = Math.max(
        Math.round(visualViewport?.height || window.innerHeight),
        1
      );
      pixelRatio = Math.min(window.devicePixelRatio || 1, coarsePointer ? 1 : 1.35);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const getPoint = (column, row, columns, rows, time, layer) => {
      const xProgress = column / Math.max(columns - 1, 1);
      const yProgress = row / Math.max(rows - 1, 1);

      const layerShift = layer === 0 ? 0 : Math.PI * 0.85;
      const baseY =
        height * (layer === 0 ? 0.3 : 0.54) +
        yProgress * height * (layer === 0 ? 0.42 : 0.31);

      const envelope = Math.sin(xProgress * Math.PI);
      const waveOne = Math.sin(
        column * 0.34 + row * 0.42 + time * 0.00042 + layerShift
      );
      const waveTwo = Math.cos(
        column * 0.16 - row * 0.28 - time * 0.00024 + layerShift
      );

      const amplitude = height * (coarsePointer ? 0.035 : 0.052);
      const driftX = Math.sin(row * 0.45 + time * 0.00016 + layerShift) * 16;

      return {
        x: xProgress * width + driftX,
        y:
          baseY +
          waveOne * amplitude * envelope +
          waveTwo * amplitude * 0.42,
        alpha: 0.2 + envelope * 0.7
      };
    };

    const drawDot = (x, y, radius, color, alpha) => {
      context.globalAlpha = alpha * 0.24;
      context.fillStyle = color;
      context.beginPath();
      context.arc(x, y, radius * 2.15, 0, TAU);
      context.fill();

      context.globalAlpha = alpha;
      context.beginPath();
      context.arc(x, y, radius, 0, TAU);
      context.fill();
    };

    const drawMesh = (time, layer) => {
      const columns = coarsePointer ? 24 : Math.min(46, Math.ceil(width / 35));
      const rows = coarsePointer ? 12 : 18;
      const points = Array.from({ length: rows }, () => Array(columns));

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          points[row][column] = getPoint(
            column,
            row,
            columns,
            rows,
            time,
            layer
          );
        }
      }

      const lineAlpha = layer === 0 ? 0.09 : 0.045;
      context.lineWidth = 0.65;

      for (let row = 0; row < rows; row += 1) {
        context.beginPath();

        points[row].forEach((point, index) => {
          if (index === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        });

        context.strokeStyle = `rgba(243, 82, 145, ${lineAlpha})`;
        context.stroke();
      }

      for (let column = 0; column < columns; column += 2) {
        context.beginPath();

        for (let row = 0; row < rows; row += 1) {
          const point = points[row][column];
          if (row === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        }

        context.strokeStyle = `rgba(255, 157, 194, ${lineAlpha * 0.62})`;
        context.stroke();
      }

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const point = points[row][column];
          const progress = column / Math.max(columns - 1, 1);
          const color =
            progress < 0.42
              ? "#c63c73"
              : progress < 0.78
                ? "#f36a9f"
                : "#ffb06f";

          const radius = layer === 0 ? 1.05 : 0.78;
          const layerOpacity = layer === 0 ? 0.58 : 0.23;
          const rowFade = 1 - Math.abs(row / (rows - 1) - 0.5) * 0.8;

          drawDot(
            point.x,
            point.y,
            radius,
            color,
            point.alpha * layerOpacity * rowFade
          );
        }
      }
    };

    const drawGlints = (time) => {
      const glints = [
        [0.16, 0.25, 0],
        [0.52, 0.43, 1.8],
        [0.83, 0.64, 3.5],
        [0.7, 0.18, 5.2]
      ];

      glints.forEach(([xRatio, yRatio, phase]) => {
        const pulse = 0.55 + Math.sin(time * 0.001 + phase) * 0.28;
        const x = width * xRatio;
        const y = height * yRatio;

        context.globalAlpha = pulse * 0.34;
        context.strokeStyle = "#ffc2d9";
        context.lineWidth = 0.8;
        context.beginPath();
        context.moveTo(x - 5, y);
        context.lineTo(x + 5, y);
        context.moveTo(x, y - 5);
        context.lineTo(x, y + 5);
        context.stroke();

        context.globalAlpha = pulse * 0.75;
        context.fillStyle = "#fff5fa";
        context.beginPath();
        context.arc(x, y, 1.15, 0, TAU);
        context.fill();
      });
    };

    const render = (time = 0) => {
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";

      drawMesh(time, 1);
      drawMesh(time, 0);
      drawGlints(time);

      context.globalAlpha = 1;
    };

    const animate = (time) => {
      animationFrame = 0;

      if (!isPageVisible) return;

      if (time - lastFrameTime >= frameInterval) {
        lastFrameTime = time;
        render(time);
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (reduceMotion || animationFrame || !isPageVisible) return;
      animationFrame = window.requestAnimationFrame(animate);
    };

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;

      if (isPageVisible) {
        render(performance.now());
        startAnimation();
      } else if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const handleResize = () => {
      resizeCanvas();
      render(performance.now());
    };

    resizeCanvas();
    render(0);

    if (!reduceMotion) startAnimation();

    window.addEventListener("resize", handleResize, { passive: true });
    window.visualViewport?.addEventListener(
      "resize",
      handleResize,
      { passive: true }
    );
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener(
        "resize",
        handleResize
      );
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className="site-atmosphere" aria-hidden="true">
      <div className="atmosphere-color-field" />
      <canvas ref={canvasRef} className="atmosphere-canvas" />
      <div className="atmosphere-soft-light" />
      <div className="atmosphere-vignette" />
    </div>
  );
}

export default SiteAtmosphere;
