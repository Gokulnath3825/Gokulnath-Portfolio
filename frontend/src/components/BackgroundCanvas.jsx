import React, { useEffect, useRef } from 'react';

export default function BackgroundCanvas({ isWarping = false }) {
  const canvasRef = useRef(null);
  const isWarpingRef = useRef(isWarping);

  // Sync the isWarping prop with a ref to avoid recreating the canvas on change
  useEffect(() => {
    isWarpingRef.current = isWarping;
  }, [isWarping]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let centerX = width / 2;
    let centerY = height / 2;

    const mouse = {
      x: null,
      y: null
    };

    // Store active ripple waves
    const ripples = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      centerX = width / 2;
      centerY = height / 2;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleMouseClick = (e) => {
      // Don't spawn ripples during warp speed
      if (isWarpingRef.current) return;
      
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.35,
        speed: 6.5,
        opacity: 0.8
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleMouseClick);

    // Particle definition
    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        if (init) {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
        } else {
          // Reset near center for continuous warp flow
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 20 + 5;
          this.x = centerX + Math.cos(angle) * radius;
          this.y = centerY + Math.sin(angle) * radius;
        }

        this.px = this.x; // Previous X for warp lines
        this.py = this.y; // Previous Y for warp lines
        
        // Increased base particle sizes (1.8px - 4px) for much better visibility
        this.size = Math.random() * 2.2 + 1.8; 
        this.speedX = Math.random() * 0.4 - 0.2; // Ambient drift
        this.speedY = Math.random() * 0.4 - 0.2;
        this.warpSpeed = Math.random() * 2 + 1; // Base speed for warp
        
        // Increased base opacity (0.3 - 0.7) for clear visibility
        this.opacity = Math.random() * 0.4 + 0.3;
        
        // Cyberpunk colors: Electric Blue (193), Neon Purple (266)
        const colors = [193, 266];
        this.hue = colors[Math.floor(Math.random() * colors.length)] + (Math.random() * 15 - 7);
      }

      update() {
        const isWarpMode = isWarpingRef.current;

        if (isWarpMode) {
          // Warp Speed Outward Physics
          const dx = this.x - centerX;
          const dy = this.y - centerY;
          let dist = Math.sqrt(dx * dx + dy * dy);
          if (dist === 0) dist = 1;

          // Save current position as previous
          this.px = this.x;
          this.py = this.y;

          // Move along radial direction
          const vx = (dx / dist) * this.warpSpeed;
          const vy = (dy / dist) * this.warpSpeed;

          this.x += vx;
          this.y += vy;

          // Rapid acceleration
          this.warpSpeed += 0.45;
          this.opacity = Math.min(1, this.opacity + 0.05);

          // Reset if offscreen
          if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
            this.reset(false);
          }
        } else {
          // 1. Ambient Float & Mouse Attraction Physics
          if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180) {
              // Gently pull particles toward cursor
              const force = (180 - dist) / 180;
              this.x += (dx / dist) * force * 0.5;
              this.y += (dy / dist) * force * 0.5;
            }
          }

          // 2. Shockwave Ripple Physics (propel particles outward)
          ripples.forEach((r) => {
            const dx = this.x - r.x;
            const dy = this.y - r.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const diff = Math.abs(dist - r.radius);
            
            // If particle is hitting the wave front
            if (diff < 20 && dist > 1) {
              const force = (20 - diff) / 20; // stronger closer to wave center
              const pushX = (dx / dist) * force * 6.5;
              const pushY = (dy / dist) * force * 6.5;
              this.x += pushX;
              this.y += pushY;
            }
          });

          this.x += this.speedX;
          this.y += this.speedY;

          // Wrap boundaries
          if (this.x < 0) this.x = width;
          if (this.x > width) this.x = 0;
          if (this.y < 0) this.y = height;
          if (this.y > height) this.y = 0;

          // Smooth out opacity
          if (this.opacity < 0.15) this.opacity = 0.15;
        }
      }

      draw(isLight) {
        const isWarpMode = isWarpingRef.current;

        if (isWarpMode) {
          // Draw warp streaks: in light mode make them slightly darker (45% lightness) for visibility
          ctx.strokeStyle = `hsla(${this.hue}, 95%, ${isLight ? '45%' : '60%'}, ${this.opacity * 0.85})`;
          ctx.lineWidth = this.size * 0.8;
          ctx.beginPath();
          ctx.moveTo(this.px, this.py);
          ctx.lineTo(this.x, this.y);
          ctx.stroke();
        } else {
          // Draw ambient glow dots:
          // In light mode, draw deep sky blue particles with high visibility opacity.
          // In dark mode, draw electric blue particles.
          const opacityVal = isLight ? Math.min(1, this.opacity * 1.3) : this.opacity;
          ctx.fillStyle = isLight 
            ? `rgba(14, 165, 233, ${opacityVal})` 
            : `rgba(0, 200, 255, ${opacityVal})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Set particle density depending on width
    const particleCount = Math.min(80, Math.floor((width * height) / 15000));
    const particles = Array.from({ length: particleCount }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const isWarpMode = isWarpingRef.current;
      
      // Check if light theme is active
      const isLight = document.body.classList.contains('light-theme');

      // Update and draw active shockwaves
      if (!isWarpMode) {
        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i];
          r.radius += r.speed;
          r.opacity -= r.speed / r.maxRadius; // Fades out as it expands
          
          if (r.radius >= r.maxRadius || r.opacity <= 0) {
            ripples.splice(i, 1);
            continue;
          }
          
          // Draw faint glowing ring
          ctx.strokeStyle = isLight
            ? `rgba(14, 165, 233, ${r.opacity * 0.3})`
            : `rgba(0, 200, 255, ${r.opacity * 0.25})`;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw(isLight);
      });

      // Constellation connection lines (only in normal float mode)
      if (!isWarpMode) {
        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];

          // Draw lines connecting particles to mouse cursor
          if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - p1.x;
            const dy = mouse.y - p1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
              const alpha = (1 - dist / 150) * (isLight ? 0.45 : 0.35);
              ctx.strokeStyle = isLight
                ? `rgba(124, 58, 237, ${alpha})` // Deep purple in light mode
                : `rgba(138, 46, 255, ${alpha})`; // Cyberpunk neon purple in dark mode
              ctx.lineWidth = isLight ? 1.4 : 1.0;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.stroke();
            }
          }

          // Draw lines connecting particles to each other
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 95) {
              const alpha = (1 - dist / 95) * (isLight ? 0.32 : 0.25);
              ctx.strokeStyle = isLight
                ? `rgba(14, 165, 233, ${alpha})` // Deep sky blue in light mode
                : `rgba(0, 200, 255, ${alpha})`; // Cyberpunk electric blue in dark mode
              ctx.lineWidth = isLight ? 0.8 : 0.6;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleMouseClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
}
