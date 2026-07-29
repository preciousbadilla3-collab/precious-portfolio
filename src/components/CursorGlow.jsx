import { useEffect, useRef } from "react";
import "./CursorGlow.css";

function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    const moveGlow = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };


    const animate = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      glow.style.transform = 
        `translate3d(${currentX}px, ${currentY}px, 0)`;

      requestAnimationFrame(animate);
    };


    window.addEventListener("mousemove", moveGlow);
    animate();


    return () => {
      window.removeEventListener("mousemove", moveGlow);
    };

  }, []);


  return <div ref={glowRef} className="cursor-glow"></div>;
}

export default CursorGlow;