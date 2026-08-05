import { useRef, useState } from "react";
import {
  ArrowUpRight,
  MapPin,
  Play,
  Sparkles
} from "lucide-react";

import "./About.css";
import preciousPhoto from "../assets/precious.jpg";

function About() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoUnavailable, setVideoUnavailable] = useState(false);

  const toggleVideo = async () => {
    const video = videoRef.current;

    if (!video || videoUnavailable) return;

    try {
      if (video.paused) {
        await video.play();
      } else {
        video.pause();
      }
    } catch (error) {
      console.error("The video could not be played:", error);
    }
  };

  return (
    <section className="about" id="about">

      {/* Background atmosphere */}
      <div className="about-background" aria-hidden="true">
        <div className="about-aurora about-aurora-one"></div>
        <div className="about-aurora about-aurora-two"></div>

        <div className="about-silk about-silk-one"></div>
        <div className="about-silk about-silk-two"></div>

        <div className="about-stars"></div>
        <div className="about-noise"></div>
        <div className="about-vignette"></div>
      </div>

      <div className="about-inner">

        {/* Left content */}
        <div className="about-copy">

          <div className="about-eyebrow">
            <Sparkles size={14} />
            Behind the Systems
          </div>

          <p className="about-index">02 / ABOUT ME</p>

          <h2 className="about-title">
            Strategy, creativity,
            <span> and systems with intention.</span>
          </h2>

          <div className="about-line"></div>

          <p className="about-lead">
            I’m Precious, a GoHighLevel specialist focused on creating
            polished digital systems that feel clear, intentional, and
            effortless to use.
          </p>

          <p className="about-description">
            I combine thoughtful design with practical CRM structure,
            conversion-focused funnels, and automated client journeys.
            My goal is not simply to make something functional—it is to
            create an experience that feels considered from the first
            click to the final follow-up.
          </p>

          <div className="about-location">
            <MapPin size={16} />
            <span>Palawan, Philippines · Available remotely</span>
          </div>

          <a href="#portfolio" className="about-link">
            Explore selected work
            <ArrowUpRight size={17} />
          </a>

        </div>

        {/* Right video */}
        <div className="about-video-column">

          <div className="about-video-glow"></div>

          <div className="about-video-card">

            <div className="about-video-topbar">
              <div className="about-video-status">
                <span className="about-record-dot"></span>
                Meet Precious
              </div>

              <span className="about-video-number">
                INTRO / 01
              </span>
            </div>

            <div className="about-video-frame">

              <video
                ref={videoRef}
                className="about-video"
                src="/precious-intro.mp4"
                poster={preciousPhoto}
                preload="metadata"
                playsInline
                controls={!videoUnavailable}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onError={() => setVideoUnavailable(true)}
              >
                Your browser does not support video playback.
              </video>

              {!isPlaying && !videoUnavailable && (
                <button
                  type="button"
                  className="about-play-button"
                  onClick={toggleVideo}
                  aria-label="Play introduction video"
                >
                  <Play size={27} fill="currentColor" />
                </button>
              )}

              {videoUnavailable && (
                <div className="about-video-fallback" role="status">
                  <span>Introduction video coming soon</span>
                  <small>The portfolio remains fully available below.</small>
                </div>
              )}

              <div className="about-video-shine"></div>

              <div className="about-video-caption">
                <div>
                  <span>Watch my story</span>
                  <small>A brief introduction</small>
                </div>

                {!videoUnavailable && (
                  <button
                    type="button"
                    onClick={toggleVideo}
                    aria-label="Play introduction video"
                  >
                    <Play size={15} fill="currentColor" />
                  </button>
                )}
              </div>

            </div>

          </div>

          <div className="about-floating-note about-note-one">
            GHL · Funnels · Automation
          </div>

          <div className="about-floating-note about-note-two">
            Built with intention.
          </div>

        </div>

      </div>

      {/* Continuous moving divider */}
<div
  className="flow-marquee"
  aria-label="Systems with intention, funnels with flow, and automations with purpose"
>
  <div className="flow-marquee-track">

    <div className="flow-marquee-group" aria-hidden="true">
      <span className="flow-marquee-item">
        Systems With Intention
      </span>

      <i></i>

      <span className="flow-marquee-item">
        Funnels With Flow
      </span>

      <i></i>

      <span className="flow-marquee-item">
        Automations With Purpose
      </span>

      <i></i>

      <span className="flow-marquee-item">
        Experiences That Convert
      </span>

      <i></i>
    </div>

    <div className="flow-marquee-group" aria-hidden="true">
      <span className="flow-marquee-item">
        Systems With Intention
      </span>

      <i></i>

      <span className="flow-marquee-item">
        Funnels With Flow
      </span>

      <i></i>

      <span className="flow-marquee-item">
        Automations With Purpose
      </span>

      <i></i>

      <span className="flow-marquee-item">
        Experiences That Convert
      </span>

      <i></i>
    </div>

  </div>
</div>

    </section>
  );
}

export default About;