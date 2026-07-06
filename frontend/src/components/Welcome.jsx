import React, { useState, useEffect, useRef } from 'react';
import BackgroundCanvas from './BackgroundCanvas';

const GREETINGS = [
  { text: "Hello", lang: "English Salutation" },
  { text: "Welcome", lang: "Universal Welcome" },
  { text: "Greetings", lang: "Polite Greeting" },
  { text: "Hey There", lang: "Friendly Greeting" }
];

export default function Welcome({ onEnter }) {
  const [exit, setExit] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [fadeState, setFadeState] = useState('fade-in');
  
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  });
  
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  // Cycle through greetings with a fade animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('fade-out');
      setTimeout(() => {
        setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
        setFadeState('fade-in');
      }, 300); // Wait for fade-out to complete
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // 3D Parallax Tilt & Magnetic Button Calculations
  const handleMouseMove = (e) => {
    if (exit) return;
    const { innerWidth: width, innerHeight: height } = window;
    
    // 1. Viewport relative 3D Parallax Card Tilt
    const x = e.clientX - width / 2;
    const y = e.clientY - height / 2;
    const rotateX = -(y / (height / 2)) * 12;
    const rotateY = (x / (width / 2)) * 12;

    setTiltStyle({
      transform: `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
    });

    // 2. Magnetic Button pull calculations
    const btn = buttonRef.current;
    if (btn) {
      const btnRect = btn.getBoundingClientRect();
      const btnCenterX = btnRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top + btnRect.height / 2;

      const distX = e.clientX - btnCenterX;
      const distY = e.clientY - btnCenterY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      const activeRadius = 90; // Trigger threshold
      if (distance < activeRadius) {
        const strength = 0.32; // Drag strength
        setBtnOffset({
          x: distX * strength,
          y: distY * strength
        });
      } else {
        setBtnOffset({ x: 0, y: 0 });
      }
    }
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
    });
    setBtnOffset({ x: 0, y: 0 });
  };

  // Card Spotlight Tracker
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleEnter = () => {
    setIsWarping(true);
    setExit(true);
    // Expand card transition
    setTiltStyle({
      transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(0.85, 0.85, 0.85) translateZ(-100px)',
      opacity: 0,
      transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease'
    });

    setTimeout(() => {
      onEnter();
    }, 1000); // 1-second hyperdrive warp animation duration
  };

  return (
    <div 
      className={`welcome-screen ${exit ? 'exit' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Starfield / Constellation background */}
      <BackgroundCanvas isWarping={isWarping} />
      
      {/* Glowing floating orbs in background */}
      <div className="welcome-bg-orb welcome-orb-1"></div>
      <div className="welcome-bg-orb welcome-orb-2"></div>
      
      {/* 3D Parallax Glassmorphic Greeting Card with Spotlight effect */}
      <div 
        className="welcome-card" 
        style={tiltStyle}
        onMouseMove={handleCardMouseMove}
      >
        <div className="welcome-badge">
          <span>{GREETINGS[greetingIndex].lang}</span>
        </div>
        
        <h1 className="welcome-title">
          <span className={`greeting-word ${fadeState}`}>
            {GREETINGS[greetingIndex].text}
          </span>
          <br />
          I'm <span className="name-highlight">Gokulnath</span>
        </h1>
        
        <p className="welcome-sub">
          Pursuing a B.E in Computer Science & Engineering. Step inside to explore my projects, skills, and MySQL-connected workspace.
        </p>
        
        {/* Magnetic explore button */}
        <button 
          ref={buttonRef}
          className="enter-btn" 
          onClick={handleEnter}
          style={{
            transform: `translate3d(${btnOffset.x}px, ${btnOffset.y}px, 65px)`,
            transition: btnOffset.x === 0 && btnOffset.y === 0 ? 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
          }}
        >
          Explore Portfolio
          <span className="btn-arrow">➣</span>
        </button>
      </div>
    </div>
  );
}
