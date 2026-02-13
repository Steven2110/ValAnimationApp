import React, { useMemo, useEffect } from 'react';

export default function LoveParticle({ id, onDone }) {
  const config = useMemo(() => {
    const x = Math.random() * 100;
    const size = 15 + Math.random() * 15;
    const duration = 25 + Math.random() * 35; // 25-60s gentle float
    const swayAmount = -40 + Math.random() * 80;
    const swayDuration = 3 + Math.random() * 3;

    return { x, size, duration, swayAmount, swayDuration };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => onDone(id), config.duration * 1000);
    return () => clearTimeout(timer);
  }, [id, onDone, config.duration]);

  return (
    <div
      className="particle-float"
      style={{
        left: `${config.x}%`,
        '--float-duration': `${config.duration}s`,
      }}
    >
      <span
        className="particle-emoji"
        style={{
          fontSize: `${config.size}px`,
          '--sway-amount': `${config.swayAmount}px`,
          '--sway-duration': `${config.swayDuration}s`,
        }}
      >
        ❤️
      </span>
    </div>
  );
}
